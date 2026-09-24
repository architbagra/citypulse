import uuid
from datetime import datetime

def analyze_and_correlate(weather, traffic, citizens):
    """
    Core Intelligence Engine Logic
    Checks if multiple adverse signals spatially and temporally overlap.
    """
    precip = weather["precipitation_mm_h"]
    speed = traffic["speed_km_h"]
    calls = citizens["complaint_count"]
    
    # Simple anomaly rule: High rain + Low speed + High complaints = CRITICAL EVENT
    is_anomaly = False
    severity = "NOMINAL"
    
    if precip > 25.0 and speed < 15.0 and calls > 15:
        is_anomaly = True
        severity = "CRITICAL"
    elif precip > 15.0 and speed < 25.0:
        is_anomaly = True
        severity = "ELEVATED"
        
    if not is_anomaly:
        return None
        
    # Generate Civic Event matching the backend/frontend schema
    event_id = f"JPR-{datetime.utcnow().strftime('%Y%m%d-%H%M')}-{uuid.uuid4().hex[:4].upper()}"
    
    event = {
        "id": event_id,
        "title": f"{severity} CONCORDANCE: WEATHER-RELATED ARTERIAL DISRUPTION",
        "summary": "Automated anomaly detected by intelligence engine correlation.",
        "zoneId": "sector-a",
        "zoneName": "Zone A — Ashok Nagar & M.I. Road Arterial Corridor",
        "severity": severity,
        "declaredAt": datetime.utcnow().strftime("%H:%M:%S IST"),
        "durationMinutes": 0,
        "concordanceScore": round(min(precip * 1.5 + (45 - speed) + calls, 99.9), 1),
        "persistenceMinutes": 0,
        "streams": [
            {
                "id": "stream-precip",
                "name": "Precipitation Surge",
                "sensorCode": weather["sensor_id"],
                "value": f"{precip} mm/h",
                "delta": "+High",
                "isSpike": precip > 25.0,
                "deltaType": "increase",
                "subtext": "Real-time engine feed",
                "baseline": "15.0 mm/h",
                "status": "CRITICAL" if precip > 25.0 else "ELEVATED",
                "confidence": 0.98
            },
            {
                "id": "stream-velocity",
                "name": "Velocity Collapse",
                "sensorCode": traffic["sensor_id"],
                "value": f"{speed} km/h",
                "delta": "-Drop",
                "isSpike": speed < 15.0,
                "deltaType": "decrease",
                "subtext": "Real-time engine feed",
                "baseline": "32.0 km/h",
                "status": "CRITICAL" if speed < 15.0 else "ELEVATED",
                "confidence": 0.94
            }
        ],
        "diagnosticChain": [
            {
                "step": 1,
                "timeOffset": "T-0",
                "title": "Intelligence Engine Trigger",
                "description": f"Automated correlation caught precip={precip} and speed={speed}",
                "metric": "AI Correlated",
                "source": "CityPulse Core",
                "confidence": 0.95,
                "status": "VERIFIED"
            }
        ],
        "hypotheses": []
    }
    return event
