import random

def fetch_traffic_data():
    """Simulates fetching real-time speed from Loop D-12"""
    return {
        "sensor_id": "LOOP-D-12",
        "speed_km_h": round(random.uniform(2.0, 45.0), 2),
        "status": "LIVE"
    }
