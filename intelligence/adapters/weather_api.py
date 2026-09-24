import random

def fetch_weather_data():
    """Simulates fetching real-time weather from IMD AWS-04"""
    return {
        "sensor_id": "AWS-04",
        "precipitation_mm_h": round(random.uniform(0.0, 55.0), 2),
        "status": "LIVE"
    }
