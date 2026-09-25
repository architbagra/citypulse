# CityPulse — Live Civic Health & Intelligence Dashboard

**CityPulse** is a live civic intelligence platform that normalizes real-time city data feeds (meteorology, roadway mobility, transit, citizen dispatches), detects multi-source anomalies, computes spatial-temporal correlations, and presents grounded, explainable civic health insights.

---

## 🏛️ Problem

Modern municipal operations suffer from data fragmentation. Emergency dispatches, traffic control, and storm drainage departments operate in silos. Critical events—such as hyper-localized cloudbursts causing flash waterlogging and traffic gridlock—are often recognized only after citizen complaint volumes spike, missing the window for proactive intervention.

---

## ⚡ Solution

CityPulse introduces a continuous 9-stage intelligence pipeline:

```
DATA SOURCES → DATA INGESTION → CANONICAL NORMALIZATION → DUAL STORAGE → ANOMALY DETECTION → SPATIAL/TEMPORAL CORRELATION → CIVIC EVENT ENGINE → GROUNDED AI EXPLANATION → LIVE CARTOGRAPHIC DASHBOARD
```

The system ingests multi-domain sensor feeds, normalizes them into a common schema, calculates rolling baselines, detects z-score anomalies, correlates concurrent spatial-temporal spikes into structured **Civic Events**, and synthesizes grounded natural language explanations.

---

## ✨ Key Features

- 🛰️ **Multi-Source Ingestion**: Ingests weather (IMD AWS-04), roadway mobility (Induction Loop D-12), public transit (JCTSL GTFS-RT), and citizen complaints (Sampark 181).
- 🔄 **Canonical Normalization**: Standardizes disparate timestamps, coordinates, and units into a unified observation schema.
- 📈 **Explainable Anomaly Detection**: Uses z-score variance and rolling baselines rather than unexplainable black-box models.
- 🎯 **Spatial-Temporal Correlation**: Identifies concurrent anomalies occurring within the same sector ($\tau \le 15\text{ min}$) to declare concordance events.
- 🤖 **Grounded AI Explanations**: Generates plain-language incident briefs using Gemini 1.5 Flash restricted strictly to observed evidence (zero hallucination).
- 🗺️ **Tactile Cartography & Civic Lens**: Leaflet-powered dark/light cartographic UI with periwinkle hydro plumes, terracotta friction corridors, and real-time inspector reticle.
- ⏯️ **Chronological Replay**: Step-by-step historical incident replay with variable playback speed ($1\times, 2\times, 5\times$) and CSV export.
- 🛡️ **Graceful Feed Degradation**: Automatically switches to synthetic proxy penalties when municipal feeds experience network timeouts.

---

## 🏗️ Architecture

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

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Leaflet Cartography, Lucide Icons, Motion.
- **Backend**: Python 3.11+, FastAPI, Uvicorn, Pydantic v2, Motor.
- **Database**: MongoDB Atlas / Local MongoDB with automatic In-Memory Dual Engine fallback.
- **Analytics & AI**: NumPy, Pytest, AsyncClient, Google Gemini 1.5 API (with deterministic fallback).
- **DevOps**: Docker, Docker Compose, GitHub Actions CI.

---

## 📂 Project Structure

```
citypulse/
├── frontend / src/              # React UI views, components, cartography map & context
├── backend/                     # FastAPI REST API, database adapters, unit tests
├── intelligence/                # Ingestion adapters, normalizer, anomaly & correlation engine
├── data/                        # Seed data, simulations, canonical schemas
├── docs/                        # Architecture, setup, API contracts, audit report, MISSING.md
├── scripts/                     # Seed scripts & demo execution
├── start-demo.ps1               # Automated 1-click PowerShell demo script
├── docker-compose.yml           # Container orchestration
└── package.json                 # Frontend dependencies & scripts
```

---

## 🚀 Running Locally

### 1. Frontend
```bash
npm install
npm run dev
```
UI available at: `http://localhost:3000`

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API Docs available at: `http://localhost:8000/docs`

### 3. Backend Pytest Suite
```bash
cmd /c "set PYTHONPATH=backend&& py -3 -m pytest backend/tests"
```

---

## 📖 Documentation Quick Links

- [Developer Setup Guide](docs/development/setup.md)
- [Full Repository Audit Report](docs/AUDIT_REPORT.md)
- [Missing Credentials & Fallbacks Report](docs/MISSING.md)
- [API Contract Specification](docs/api/api-contract.md)
- [System Architecture & Diagrams](docs/architecture/system-architecture.md)
- [Team Contributing Rules](CONTRIBUTING.md)

---

## 📊 Current Status

- **Frontend UI & Maps**: 100% Implemented & Verified
- **Backend API & Routes**: 100% Implemented & Tested (9/9 Pytest Passing)
- **Database Dual-Mode Engine**: 100% Active with In-Memory Fallback
- **Intelligence Engine**: 100% Ingestion & Correlation Active
- **Grounded LLM AI**: 100% Active with Evidence-Based Synthesizer
