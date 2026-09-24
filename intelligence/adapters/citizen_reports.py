import random

def fetch_citizen_reports():
    """Simulates Sampark 181 complaints in the last hour"""
    return {
        "sensor_id": "SAMPARK-181",
        "complaint_count": random.randint(0, 50),
        "status": "LIVE"
    }
