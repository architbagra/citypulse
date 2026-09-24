from datetime import datetime

def normalize_telemetry(weather_raw, traffic_raw, citizen_raw, transit_raw):
    """
    Data Normalization
    Standardizes timestamps, units, and nested JSON structures from disparate adapters
    into a common canonical schema for the correlation engine.
    """
    timestamp = datetime.utcnow().isoformat()
    
    normalized = {
        "timestamp": timestamp,
        "signals": {}
    }
    
    # Weather
    normalized["signals"]["precipitation"] = {
        "value": weather_raw.get("precipitation_mm_h", 0.0),
        "unit": "mm/h",
        "health": weather_raw.get("status", "UNKNOWN")
    }
    
    # Traffic
    normalized["signals"]["traffic_speed"] = {
        "value": traffic_raw.get("speed_km_h", 32.0),
        "unit": "km/h",
        "health": traffic_raw.get("status", "UNKNOWN")
    }
    
    # Citizen
    normalized["signals"]["citizen_calls"] = {
        "value": citizen_raw.get("complaint_count", 0),
        "unit": "calls/hr",
        "health": citizen_raw.get("status", "UNKNOWN")
    }
    
    # Transit
    transit_speed = transit_raw.get("route_9a_speed_kmh")
    if transit_raw.get("status") == "OFFLINE":
        # Data failure fallback - synthetic estimate based on inductive loop traffic
        synthetic_speed = max(traffic_raw.get("speed_km_h", 32.0) - 2.5, 0.0)
        normalized["signals"]["transit_speed"] = {
            "value": round(synthetic_speed, 2),
            "unit": "km/h",
            "health": "DEGRADED (SYNTHETIC PROXY)",
            "error": transit_raw.get("error")
        }
    else:
        normalized["signals"]["transit_speed"] = {
            "value": transit_speed,
            "unit": "km/h",
            "health": "LIVE"
        }
        
    return normalized
