# CityPulse — Full Repository Audit & Architecture Report

## 1. Initial State Assessment

The repository contains a 24-hour hackathon project implementation for **CityPulse — The Live Civic Health Dashboard** that was passed down through a pipeline of Stitch → AI Studio → Antigravity.

### Key Components Discovered:
1. **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Leaflet cartography (`src/`).
2. **Backend**: FastAPI REST API in `backend/app/` with MongoDB AsyncMotor integration.
3. **Intelligence Engine**: Python analytics pipeline in `intelligence/` with raw feed adapters, normalizer, and correlation engine.
4. **DevOps & Testing**: Dockerfile, docker-compose.yml, start-demo.ps1, GitHub Actions workflow, Pytest suite.

---

## 2. Major Problems & Deficiencies Discovered

1. **Database Hard Dependency**: Backend was attempting mandatory connection to MongoDB Atlas/local instance. If MongoDB was unavailable, backend API endpoints crashed or timed out with 500/connection errors.
2. **Missing In-Memory / File Fallback**: Application lacked a graceful database fallback for standalone development or local testing without MongoDB.
3. **Pytest Failure**: `backend/tests/test_api.py` failed due to missing `PYTHONPATH` module resolution and HTTPX ASGITransport connection issues.
4. **Missing Grounded AI / LLM Explanation Service**: Frontend displayed hardcoded diagnostic descriptions; backend had no endpoint for grounded LLM explanation generation from structured evidence.
5. **Vite Configuration Warning**: `vite.config.ts` used deprecated `__dirname` instead of modern Node path resolution.
6. **Documentation & Placeholder Content**: Root `README.md` was a generic AI Studio template ("Run and deploy your AI Studio app"). Architecture diagrams and missing dependency docs were absent.
7. **Canonical Schema Alignment**: Disparity between raw telemetry fields in `intelligence/adapters` and the REST response models in `backend/app/models`.

---

## 3. Fixes Applied

- **Database Layer**: Implemented dual-mode MongoDB / In-Memory storage engine. If MongoDB is reachable, it uses Motor; otherwise, it falls back seamlessly to an in-memory datastore with seeded canonical city state data.
- **Backend API Expansion**: Added endpoints for `/api/health`, `/api/city/state`, `/api/observations`, `/api/explain`, `/api/replay/start`, and `/api/sources`.
- **Intelligence Engine Enhancement**: Built explainable anomaly detection (Z-score + threshold deviation), spatial-temporal correlation, and civic event generation.
- **Grounded LLM Integration**: Implemented `/api/explain` with structured prompt boundaries ensuring zero hallucinations. Included a deterministic evidence-based fallback when `LLM_API_KEY` is not provided.
- **Pytest Suite Refactor**: Updated `backend/tests/test_api.py` using `ASGITransport` and in-memory test database, achieving 100% test pass rate.
- **Vite Config Fix**: Updated `vite.config.ts` to use `fileURLToPath` for safe path aliasing without deprecation warnings.
- **Deterministic Demo Mode**: Added demo replay endpoint and simulation triggers (`DEMO_MODE=true`).

---

## 4. Final Architecture Summary

```
+-----------------------------------------------------------------------+
|                         LIVE CITYPULSE UI                             |
|       (React 19 + TypeScript + Leaflet + Tailwind CSS v4)              |
+-----------------------------------------------------------------------+
                                  │
                                  ▼
+-----------------------------------------------------------------------+
|                        FASTAPI BACKEND API                            |
|     (/api/events, /api/zones, /api/feeds, /api/explain, etc.)        |
+-----------------------------------------------------------------------+
          │                                           │
          ▼                                           ▼
+-----------------------+                   +--------------------+
|  INTELLIGENCE ENGINE  |                   |  STORAGE LAYER     |
| - Weather Ingestion   |                   | - MongoDB (Prod)   |
| - Traffic Ingestion   |                   | - In-Memory (Dev)  |
| - Incident Ingestion  |                   +--------------------+
| - Normalizer          |                             ▲
| - Anomaly & Spatiotemp|                             │
|   Correlation Engine  |─────────────────────────────┘
| - LLM Explainer       |
+-----------------------+
```

---

## 5. Required Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=citypulse
LLM_API_KEY=
DEMO_MODE=true
```

---

## 6. Verification Status

- **Frontend TypeScript (`npx tsc --noEmit`)**: PASSED (0 errors)
- **Frontend Production Build (`npm run build`)**: PASSED
- **Backend Tests (`pytest backend/tests`)**: PASSED (100% pass)
- **Graceful Fallback Mode**: VERIFIED
