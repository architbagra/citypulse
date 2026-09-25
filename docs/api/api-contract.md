# CityPulse — API Contract Documentation

Base URL: `http://localhost:8000/api`

---

## Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/city/state` | Unified city state overview |
| `GET` | `/api/events` | Active civic events |
| `GET` | `/api/events/{id}` | Specific civic event details |
| `GET` | `/api/zones` | Sector zone statuses & boundaries |
| `GET` | `/api/feeds` | Ingestion feed statuses & health metrics |
| `GET` | `/api/feeds/degradation` | Graceful degradation protocol steps |
| `GET` | `/api/replay` | Historical replay milestones |
| `POST`| `/api/replay/start` | Start deterministic simulation replay |
| `POST`| `/api/explain` | Grounded AI/LLM event explanation |
| `GET` | `/api/relationships/causes` | Signal coupling correlation metrics |
| `GET` | `/api/relationships/empirical` | Ground truth vs synthetic inference table |
| `GET` | `/api/relationships/historical` | Historical Jaipur monsoon analogs |
| `GET` | `/api/relationships/recovery` | Hydrodynamic clearance trajectory curve |

---

## Endpoint Details

### 1. `GET /api/health`
**Purpose**: System readiness and database connectivity status.

**Response `200 OK`**:
```json
{
  "status": "healthy",
  "database": "connected (In-Memory Fallback Active)",
  "timestamp": "2026-09-25T05:00:00Z"
}
```

---

### 2. `GET /api/events`
**Purpose**: List all active civic events detected by the intelligence engine.

**Response `200 OK`**:
```json
[
  {
    "id": "JPR-2024-0819-B",
    "title": "CRITICAL CONCORDANCE: POSSIBLE WEATHER-RELATED ARTERIAL DISRUPTION",
    "summary": "Zone A — Ashok Nagar & M.I. Road Corridor exhibiting acute spatial-temporal confluence.",
    "zoneId": "sector-a",
    "zoneName": "Zone A — Ashok Nagar & M.I. Road Arterial Corridor",
    "severity": "CRITICAL",
    "declaredAt": "14:00:00 IST",
    "durationMinutes": 35,
    "concordanceScore": 89.4,
    "persistenceMinutes": 35,
    "streams": [
      {
        "id": "stream-precip",
        "name": "Precipitation Surge",
        "sensorCode": "AWS-04",
        "value": "48.2 mm/h",
        "delta": "+220%",
        "isSpike": true,
        "deltaType": "increase",
        "subtext": "vs. Diurnal Seasonal Baseline",
        "baseline": "15.0 mm/h",
        "status": "ELEVATED",
        "confidence": 0.98
      }
    ],
    "diagnosticChain": [
      {
        "step": 1,
        "timeOffset": "13:42 IST",
        "title": "Hyper-Localized Cloudburst Influx",
        "description": "IMD AWS-04 recorded rapid deluge spike to 48.2 mm/hr.",
        "metric": "48.2 mm/hr (+220%)",
        "source": "IMD AWS-04 Mesonet",
        "confidence": 0.98,
        "status": "VERIFIED"
      }
    ],
    "hypotheses": [
      {
        "id": "hypo-a",
        "title": "Gravitational Runoff Exceedance",
        "probability": 48,
        "factors": [
          "Rainfall rate (48.2 mm/hr) exceeds natural percolation by 3.2x"
        ],
        "status": "PRIMARY"
      }
    ]
  }
]
```

---

### 3. `POST /api/explain`
**Purpose**: Synthesize a grounded, plain-language LLM explanation based strictly on provided structured evidence.

**Request Body**:
```json
{
  "eventId": "JPR-2024-0819-B",
  "zoneId": "sector-a",
  "evidence": {
    "precipitation_mm_h": 48.2,
    "traffic_speed_km_h": 6.4,
    "citizen_calls": 38,
    "time_window": "13:30-14:00 IST"
  }
}
```

**Response `200 OK`**:
```json
{
  "eventId": "JPR-2024-0819-B",
  "zoneId": "sector-a",
  "explanation": "These signals show a possible weather-related disruption in Zone A. Between 13:30 and 14:00 IST, precipitation reached 48.2 mm/h (+220% vs baseline), traffic velocity dropped to 6.4 km/h (-61%), and citizen calls increased to 38 (+310%). The high spatial-temporal overlap (89.4% concordance) supports elevated inundation risk.",
  "confidence": 0.94,
  "groundedInEvidence": true,
  "source": "Grounded LLM Explainer Engine"
}
```

---

### 4. `GET /api/zones`
**Purpose**: Retrieve all Jaipur sector zones, status scores, and map coordinates.

**Response `200 OK`**:
```json
[
  {
    "id": "sector-a",
    "code": "SEC-A",
    "name": "Zone A — Ashok Nagar & M.I. Road Arterial Corridor",
    "subhead": "Central Business District & Heritage Outflow",
    "status": "CRITICAL",
    "concordance": 89.4,
    "precipitation": 48.2,
    "trafficSpeed": 6.4,
    "dispatchCalls": 38,
    "center": [26.9142, 75.8080],
    "bounds": [[26.9100, 75.8020], [26.9200, 75.8150]],
    "activeAnomalies": [
      "Inundation Plume along M.I. Road axis"
    ],
    "drainageCapacity": 18.5
  }
]
```
