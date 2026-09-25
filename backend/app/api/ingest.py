from fastapi import APIRouter
from app.database.mongodb import get_database
from app.services.llm_explainer import generate_grounded_explanation
from intelligence.adapters.weather_api import fetch_weather_data
from intelligence.adapters.traffic_api import fetch_traffic_data
from intelligence.adapters.citizen_reports import fetch_citizen_reports
from intelligence.adapters.transit_api import fetch_transit_data
from intelligence.core.normalizer import normalize_telemetry
from intelligence.core.correlation import analyze_and_correlate
from intelligence.core.feed_health import FeedHealthMonitor
from datetime import datetime, timezone

router = APIRouter()

@router.post("/ingest/trigger")
async def trigger_ingest():
    """
    Triggers an instant live intelligence cycle:
    Ingests feeds, normalizes telemetry, runs anomaly & correlation analysis,
    stores results, and returns status.
    """
    db = get_database()
    monitor = FeedHealthMonitor(db)

    # 1. Fetch raw feeds
    weather = fetch_weather_data()
    traffic = fetch_traffic_data()
    citizens = fetch_citizen_reports()
    transit = fetch_transit_data()

    # 2. Evaluate feed health
    monitor.evaluate_feed("JCTSL_BUS_API", transit.get("status"), transit.get("error"))

    # 3. Normalize
    normalized = normalize_telemetry(weather, traffic, citizens, transit)

    # 4. Correlation & Anomaly detection
    event = analyze_and_correlate(normalized)

    if event:
        # Save event
        await db.events.insert_one(event)
        
        # Update sector-a zone state dynamically
        precip = normalized["signals"]["precipitation"]["value"]
        speed = normalized["signals"]["traffic_speed"]["value"]
        calls = normalized["signals"]["citizen_calls"]["value"]
        concordance = event["concordanceScore"]
        
        await db.zones.update_one(
            {"id": "sector-a"},
            {"$set": {
                "precipitation": precip,
                "trafficSpeed": speed,
                "dispatchCalls": calls,
                "concordance": concordance,
                "status": event["severity"]
            }}
        )

    return {
        "status": "COMPLETED",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "normalizedSignals": normalized["signals"],
        "detectedEvent": event
    }
