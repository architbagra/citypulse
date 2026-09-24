# Changelog - Backend API (Member 2)

All notable changes made to the backend by Member 2 (guptaanuj10) on the `feature/backend` branch.

## [Unreleased] - Civic Intelligence Engine (Member 3)
### Added
- **Intelligence Engine:** Created standalone Python worker in `intelligence/` directory.
- **Data Adapters:** Implemented synthetic real-time data adapters for weather (`weather_api.py`), traffic (`traffic_api.py`), and citizen complaints (`citizen_reports.py`).
- **Core Correlation:** Wrote the anomaly detection logic (`core/correlation.py`) to synthesize spatial/temporal data and generate `CivicEvent` anomalies dynamically based on threshold breaches.
- **Database Insertion:** Configured the engine loop (`main.py`) to connect to MongoDB and push live anomalies directly into the `events` collection.
- **Orchestration:** Added the intelligence worker to `docker-compose.yml`.

## [Unreleased] - Integration & DevOps (Member 4)
### Added
- **Dockerization:** Added `backend/Dockerfile` and root `Dockerfile` (React) for containerization.
- **Docker Compose:** Added `docker-compose.yml` to orchestrate both services together.
- **Testing Suite:** Set up Pytest with `httpx` and `asgi-lifespan` in `backend/tests/test_api.py` to validate API endpoints.
- **CI Pipeline:** Added GitHub Actions workflow `.github/workflows/ci.yml` for automated frontend builds and backend tests.
- **Frontend/Backend Compatibility:** 
  - Configured Vite proxy in `vite.config.ts` to seamlessly route frontend `/api` calls to the FastAPI backend, resolving CORS overhead.
  - Created a robust frontend API client (`src/api/client.ts`) for Member 1 to easily replace mock data with live database calls.
- **Final Demo Flow:** Wrote `start-demo.ps1` to automatically validate system requirements, build, and orchestrate the full stack via Docker Compose for flawless demonstrations.

## [Unreleased] - Initial Backend Setup (Member 2)

### Added
- **Backend Architecture:** Created the standard Python FastAPI directory structure under `backend/app/` (`api/`, `models/`, `services/`, `database/`).
- **Dependencies:** Added `requirements.txt` containing `fastapi`, `uvicorn`, `python-dotenv`, `motor`, and `pydantic[email]`.
- **Environment Configuration:** 
  - Added `.env.example` with placeholder MongoDB Atlas connection strings.
  - Setup local `.env` file support via `python-dotenv`.
- **Database Integration:** 
  - Created `app/database/mongodb.py` utilizing `motor` to establish an asynchronous connection with MongoDB Atlas.
  - Added a lifespan context manager in `app/main.py` to seamlessly handle MongoDB connections on server startup and shutdown.
- **Data Models (Pydantic):** Mapped the frontend TypeScript shared interfaces (`src/types/index.ts`) directly to Python data models:
  - `CivicEvent` (`app/models/civic_event.py`) - **Updated with full nested sub-schemas** (`StreamTelemetry`, `DiagnosticStep`, `BayesianHypothesis`).
  - `SectorZone` (`app/models/zones.py`)
  - `CivicFeed` (`app/models/feeds.py`)
  - `ReplayMilestone` (`app/models/replay.py`)
- **API Endpoints:** Implemented the core REST API routes. These endpoints automatically seed the MongoDB Atlas collections with the initial mock data if the database is empty, and then return the data directly from MongoDB:
  - `GET /api/events` & `POST /api/events` (Seeds `PRIMARY_ACTIVE_EVENT`)
  - `GET /api/zones`
  - `GET /api/feeds` & `GET /api/feeds/degradation`
  - `GET /api/replay`
  - `GET /api/relationships/causes`
  - `GET /api/relationships/empirical`
  - `GET /api/relationships/historical`
  - `GET /api/relationships/recovery`
- **CORS Setup:** Configured CORS middleware in `app/main.py` to allow cross-origin requests from the React frontend.
- **Git Ignore:** Appended Python-specific ignores (`__pycache__/`, `*.pyc`, `.env`) to the root `.gitignore` file.
