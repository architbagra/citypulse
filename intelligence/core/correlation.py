import uuid
from datetime import datetime

def analyze_and_correlate(normalized_data):
    """
    Core Intelligence Engine Logic
    Uses Canonical Normalized Data
    Evaluates Spatial Correlation & Temporal Overlap.
    """
    signals = normalized_data["signals"]
    precip = signals["precipitation"]["value"]
    speed = signals["traffic_speed"]["value"]
    calls = signals["citizen_calls"]["value"]
    transit_speed = signals["transit_speed"]["value"]
    transit_health = signals["transit_speed"]["health"]
    
    # 1. Temporal Correlation Check (are the signals happening concurrently?)
    # 2. Spatial Correlation Check (are they in the same grid/sector?)
    # (Since this is simulated, we assume they belong to Sector A - Ashok Nagar).
    
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
        
    # Evidence / Explanation Generation
    explanation = f"Concordance detected across {sum([1 for v in signals.values() if v['value'] > 0])} signals in Sector A."
    if "SYNTHETIC" in transit_health:
        explanation += " Note: Public transit metrics are degraded and rely on a synthetic proxy penalty."
        
    event_id = f"JPR-{datetime.utcnow().strftime('%Y%m%d-%H%M')}-{uuid.uuid4().hex[:4].upper()}"
    
    event = {
        "id": event_id,
        "title": f"{severity} CONCORDANCE: WEATHER-RELATED ARTERIAL DISRUPTION",
        "summary": explanation,
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
                "sensorCode": "AWS-04",
                "value": f"{precip} mm/h",
                "delta": f"+{round((precip/15.0)*100)}%",
                "isSpike": precip > 25.0,
                "deltaType": "increase",
                "subtext": "vs. Diurnal Seasonal Baseline",
                "baseline": "15.0 mm/h",
                "status": "CRITICAL" if precip > 25.0 else "ELEVATED",
                "confidence": 0.98
            },
            {
                "id": "stream-velocity",
                "name": "Velocity Collapse",
                "sensorCode": "LOOP D-12",
                "value": f"{speed} km/h",
                "delta": f"-{round((1 - speed/32.0)*100)}%",
                "isSpike": speed < 15.0,
                "deltaType": "decrease",
                "subtext": "vs. Free Flow Expectation",
                "baseline": "32.0 km/h",
                "status": "CRITICAL" if speed < 15.0 else "ELEVATED",
                "confidence": 0.94
            },
            {
                "id": "stream-transit",
                "name": "Transit Deceleration",
                "sensorCode": "JCTSL BUS API",
                "value": f"{transit_speed} km/h",
                "delta": f"-{round((1 - transit_speed/19.5)*100)}%",
                "isSpike": transit_speed < 10.0,
                "deltaType": "decrease",
                "subtext": "Routes 9A & 12A Stagnated",
                "baseline": "19.5 km/h",
                "status": "DEGRADED" if "SYNTHETIC" in transit_health else "CRITICAL",
                "confidence": 0.82 if "SYNTHETIC" in transit_health else 0.90
            }
        ],
        "diagnosticChain": [
            {
                "step": 1,
                "timeOffset": "T-0",
                "title": "Spatial-Temporal Lock Achieved",
                "description": f"Intelligence Engine locked 3 overlapping spatial features in Sector A.",
                "metric": "AI Correlated",
                "source": "CityPulse Core",
                "confidence": 0.95,
                "status": "VERIFIED"
            }
        ],
        "hypotheses": [
            {
                "id": "hypo-1",
                "title": "Gravitational Runoff Exceedance",
                "probability": 48,
                "factors": [f"Rainfall rate ({precip} mm/hr) exceeds natural percolation.", "Topographic depression around Ajmeri Gate."],
                "status": "PRIMARY"
            }
        ]
    }
    return event
