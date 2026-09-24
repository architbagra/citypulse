# Changelog - Backend API (Member 2)

All notable changes made to the backend by Member 2 (guptaanuj10) on the `feature/backend` branch.

## [Unreleased] - Initial Backend Setup

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
  - `CivicEvent` (`app/models/civic_event.py`)
  - `SectorZone` (`app/models/zones.py`)
  - `CivicFeed` (`app/models/feeds.py`)
  - `ReplayMilestone` (`app/models/replay.py`)
- **API Endpoints:** Implemented the core REST API routes. These endpoints automatically seed the MongoDB Atlas collections with the initial mock data if the database is empty, and then return the data directly from MongoDB:
  - `GET /api/events` & `POST /api/events`
  - `GET /api/zones`
  - `GET /api/feeds`
  - `GET /api/replay`
  - `GET /api/relationships/causes`
- **CORS Setup:** Configured CORS middleware in `app/main.py` to allow cross-origin requests from the React frontend.
- **Git Ignore:** Appended Python-specific ignores (`__pycache__/`, `*.pyc`, `.env`) to the root `.gitignore` file.
