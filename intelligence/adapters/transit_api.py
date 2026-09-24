import random

def fetch_transit_data():
    """Simulates JCTSL GTFS-Realtime Bus Telemetry"""
    # Simulate occasional 504 Gateway Timeout failures
    if random.random() < 0.2:
        return {
            "sensor_id": "JCTSL-BUS-API",
            "status": "OFFLINE",
            "error": "HTTP 504 Gateway Timeout"
        }
    
    return {
        "sensor_id": "JCTSL-BUS-API",
        "route_9a_speed_kmh": round(random.uniform(2.0, 25.0), 2),
        "status": "LIVE"
    }
