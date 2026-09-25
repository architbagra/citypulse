# CityPulse — Common Civic Data Model

## Canonical Observation Schema

Every raw telemetry record from external data sources (Weather, Traffic, Incidents, Transit) is normalized into this common schema:

```json
{
  "id": "OBS-20240925-001",
  "source": "weather | traffic | incidents | transit",
  "timestamp": "2026-09-25T05:00:00Z",
  "zone_id": "sector-a",
  "latitude": 26.9142,
  "longitude": 75.8080,
  "event_type": "precipitation_surge | velocity_collapse | citizen_dispatch | transit_delay",
  "metric": "precipitation_rate | vehicle_speed | call_volume | bus_velocity",
  "value": 48.2,
  "unit": "mm/h | km/h | calls/hr",
  "severity": "NOMINAL | ELEVATED | CRITICAL",
  "metadata": {
    "sensor_code": "AWS-04",
    "trust_score": 0.98,
    "baseline_value": 15.0
  }
}
```

---

## Canonical Civic Event Schema

When the spatial-temporal correlation engine locks overlapping anomalies within a geographic sector, it instantiates a `CivicEvent`:

```json
{
  "id": "JPR-2024-0819-B",
  "zoneId": "sector-a",
  "zoneName": "Zone A — Ashok Nagar & M.I. Road Arterial Corridor",
  "title": "CRITICAL CONCORDANCE: POSSIBLE WEATHER-RELATED ARTERIAL DISRUPTION",
  "summary": "Zone A — Ashok Nagar & M.I. Road Corridor exhibiting acute spatial-temporal confluence across 4 independent telemetry feeds.",
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
      "description": "IMD AWS-04 recorded rapid deluge spike to 48.2 mm/hr directly over catchment basin.",
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
```
