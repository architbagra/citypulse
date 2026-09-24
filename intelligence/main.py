import time
from datetime import datetime
from adapters.weather_api import fetch_weather_data
from adapters.traffic_api import fetch_traffic_data
from adapters.citizen_reports import fetch_citizen_reports
from adapters.transit_api import fetch_transit_data
from core.normalizer import normalize_telemetry
from core.correlation import analyze_and_correlate
from core.feed_health import FeedHealthMonitor
from database.mongo_client import get_db

def run_engine_cycle(health_monitor):
    print(f"[{datetime.utcnow().isoformat()}] Starting intelligence cycle...")
    
    # 1. Data Ingestion & Adapters
    weather = fetch_weather_data()
    traffic = fetch_traffic_data()
    citizens = fetch_citizen_reports()
    transit = fetch_transit_data()
    
    # 2. Feed Health Evaluation
    health_monitor.evaluate_feed("JCTSL_BUS_API", transit.get("status"), transit.get("error"))
    
    # 3. Data Normalization
    normalized = normalize_telemetry(weather, traffic, citizens, transit)
    
    # 4. Anomaly Detection & Correlation
    event = analyze_and_correlate(normalized)
    
    # 5. Database Insertion
    if event:
        print(f"  -> 🚨 ANOMALY DETECTED: {event['severity']}! Inserting CivicEvent into MongoDB.")
        db = get_db()
        db.events.insert_one(event)
    else:
        print("  -> System Nominal. No correlation triggers met.")

if __name__ == "__main__":
    print("🚀 CityPulse Civic Intelligence Engine Started!")
    db = get_db()
    health_monitor = FeedHealthMonitor(db)
    
    while True:
        try:
            run_engine_cycle(health_monitor)
        except Exception as e:
            print(f"❌ Engine Error: {e}")
            
        # Run every 10 seconds for demo purposes
        time.sleep(10)
