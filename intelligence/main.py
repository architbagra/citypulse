import time
from datetime import datetime
from adapters.weather_api import fetch_weather_data
from adapters.traffic_api import fetch_traffic_data
from adapters.citizen_reports import fetch_citizen_reports
from core.correlation import analyze_and_correlate
from database.mongo_client import get_db

def run_engine_cycle():
    print(f"[{datetime.utcnow().isoformat()}] Starting intelligence cycle...")
    
    # 1. Data Ingestion & Adapters
    weather = fetch_weather_data()
    traffic = fetch_traffic_data()
    citizens = fetch_citizen_reports()
    
    print(f"  -> Data: Rain={weather['precipitation_mm_h']}mm/h, Speed={traffic['speed_km_h']}km/h, Calls={citizens['complaint_count']}")
    
    # 2. Anomaly Detection & Correlation
    event = analyze_and_correlate(weather, traffic, citizens)
    
    # 3. Database Insertion
    if event:
        print(f"  -> 🚨 ANOMALY DETECTED: {event['severity']}! Inserting CivicEvent into MongoDB.")
        db = get_db()
        db.events.insert_one(event)
    else:
        print("  -> System Nominal. No correlation triggers met.")

if __name__ == "__main__":
    print("🚀 CityPulse Civic Intelligence Engine Started!")
    while True:
        try:
            run_engine_cycle()
        except Exception as e:
            print(f"❌ Engine Error: {e}")
            
        # Run every 10 seconds for demo purposes
        time.sleep(10)
