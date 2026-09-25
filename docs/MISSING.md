# Missing / Required Setup & Operational Fallbacks

This document outlines external services, optional API keys, database requirements, and current fallbacks for CityPulse.

---

## 1. MongoDB Database Connection

- **Required Environment Variable**: `MONGODB_URL`
- **Why it is needed**: Persistent storage of civic events, feed health telemetry, zone states, and historical replay logs across service restarts.
- **Where to obtain it**: Local MongoDB server (`mongodb://localhost:27017`) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier cluster.
- **Free tier available**: Yes (MongoDB Atlas M0 Free Tier).
- **Current Fallback**: **In-Memory Dual Storage Engine (`backend/app/database/mongodb.py`)**. If MongoDB is not running or connection fails, the FastAPI backend automatically falls back to an in-memory repository seeded with canonical civic data. The application operates 100% cleanly without MongoDB installed.
- **Required Action**: None for standard demo/development. Set `MONGODB_URL` in `.env` if persistence across restarts is desired.

---

## 2. LLM / AI Grounded Explanation API Key

- **Required Environment Variable**: `LLM_API_KEY` or `GEMINI_API_KEY`
- **Why it is needed**: To call Google Gemini API for real-time natural language synthesis of already-detected civic events and diagnostic evidence.
- **Where to obtain it**: [Google AI Studio Key Manager](https://aistudio.google.com/app/apikey).
- **Free tier available**: Yes (Google Gemini API free tier allows up to 15 RPM).
- **Current Fallback**: **Deterministic Rule-Based Evidence Synthesizer (`backend/app/services/llm_explainer.py`)**. If no LLM key is provided, the intelligence engine generates structured, grounded summaries directly from observation deltas, baseline variances, and sensor trust metrics without hallucinating.
- **Required Action**: Provide `LLM_API_KEY=your_key_here` in `.env` if live LLM generation is desired.

---

## 3. Real Public Transit API (JCTSL / GTFS-RT)

- **Required Environment Variable**: `TRANSIT_API_URL` (optional)
- **Why it is needed**: Ingestion of real-time public bus velocity and route delay telemetry.
- **Where to obtain it**: Municipal GTFS-Realtime endpoint or municipal transit open data portal.
- **Free tier available**: Open public data endpoint.
- **Current Fallback**: **Deterministic Transit Telemetry Adapter (`intelligence/adapters/transit_api.py`)**. Generates calibrated transit speeds with simulated gateway degradation to test graceful failure handling.
- **Required Action**: Optional. Default setup uses the built-in adapter.

---

## 4. Real Weather Data API (IMD / Open-Meteo)

- **Required Environment Variable**: `WEATHER_API_URL` (optional)
- **Why it is needed**: Real-time precipitation rate and meteorological measurements.
- **Where to obtain it**: [Open-Meteo Free Weather API](https://open-meteo.com/) (No API key required) or India Meteorological Department AWS feed.
- **Free tier available**: Yes (Open-Meteo is free for non-commercial use).
- **Current Fallback**: **IMD AWS-04 Mesonet Adapter (`intelligence/adapters/weather_api.py`)**. Streams realistic precipitation telemetry with cloudburst spike scenarios.
- **Required Action**: Optional. Default setup operates out-of-the-box.

---

## Status Matrix Summary

| Component | Status | Required Key | Fallback Implementation |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | IMPLEMENTED | None | Full client render with Leaflet |
| **Backend REST API** | IMPLEMENTED | None | FastAPI with automatic CORS & proxy |
| **Database Engine** | IMPLEMENTED | `MONGODB_URL` (Optional) | In-Memory seeded datastore fallback |
| **Intelligence Engine**| IMPLEMENTED | None | Local normalization & z-score correlation |
| **Grounded LLM AI** | PARTIALLY (KEY OPTIONAL)| `LLM_API_KEY` (Optional) | Deterministic evidence-grounded template |
| **Demo Mode** | IMPLEMENTED | `DEMO_MODE=true` | Controlled historical simulation replay |
