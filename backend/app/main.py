import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database.mongodb import connect_to_mongo, close_mongo_connection, get_database

async def background_intelligence_loop():
    while True:
        try:
            await asyncio.sleep(15)
            from intelligence.adapters.weather_api import fetch_weather_data
            from intelligence.adapters.traffic_api import fetch_traffic_data
            from intelligence.adapters.citizen_reports import fetch_citizen_reports
            from intelligence.adapters.transit_api import fetch_transit_data
            from intelligence.core.normalizer import normalize_telemetry
            from intelligence.core.correlation import analyze_and_correlate
            from intelligence.core.feed_health import FeedHealthMonitor

            db = get_database()
            monitor = FeedHealthMonitor(db)
            weather = fetch_weather_data()
            traffic = fetch_traffic_data()
            citizens = fetch_citizen_reports()
            transit = fetch_transit_data()
            monitor.evaluate_feed("JCTSL_BUS_API", transit.get("status"), transit.get("error"))
            normalized = normalize_telemetry(weather, traffic, citizens, transit)
            event = analyze_and_correlate(normalized)
            if event:
                await db.events.insert_one(event)
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
        except asyncio.CancelledError:
            break
        except Exception as e:
            print(f"Background Intelligence Task Warning: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    bg_task = asyncio.create_task(background_intelligence_loop())
    yield
    bg_task.cancel()
    await close_mongo_connection()

app = FastAPI(title="CityPulse Backend API", lifespan=lifespan)

# Setup CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to CityPulse Backend API"}

from app.api.health import router as health_router
from app.api.events import router as events_router
from app.api.zones import router as zones_router
from app.api.feeds import router as feeds_router
from app.api.replay import router as replay_router
from app.api.relationships import router as relationships_router
from app.api.explain import router as explain_router
from app.api.sources import router as sources_router
from app.api.ingest import router as ingest_router

app.include_router(health_router, prefix="/api", tags=["health"])
app.include_router(events_router, prefix="/api", tags=["events"])
app.include_router(zones_router, prefix="/api", tags=["zones"])
app.include_router(feeds_router, prefix="/api", tags=["feeds"])
app.include_router(replay_router, prefix="/api", tags=["replay"])
app.include_router(relationships_router, prefix="/api", tags=["relationships"])
app.include_router(explain_router, prefix="/api", tags=["explain"])
app.include_router(sources_router, prefix="/api", tags=["sources"])
app.include_router(ingest_router, prefix="/api", tags=["ingest"])

