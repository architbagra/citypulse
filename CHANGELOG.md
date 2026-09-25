# Changelog

All notable changes to the **CityPulse** project are documented in this file.

## [1.0.0] - 2026-09-25

### Added
- **Full Repository Audit & Architecture Standardization**: Conducted complete audit across frontend, backend, intelligence engine, and documentation.
- **In-Memory Dual Storage Engine (`backend/app/database/mongodb.py`)**: Implemented automatic failover to an in-memory repository if MongoDB is unavailable, ensuring zero runtime crashes.
- **Grounded LLM AI Explanation Service (`backend/app/services/llm_explainer.py`)**: Added `/api/explain` endpoint utilizing Gemini 1.5 Flash when `LLM_API_KEY` is present, with an evidence-grounded rule-based fallback when offline.
- **Comprehensive API Suite (`backend/app/api/`)**: Added `/api/health`, `/api/city/state`, `/api/sources`, `/api/explain`, `/api/events`, `/api/zones`, `/api/feeds`, `/api/replay`, `/api/relationships/causes`.
- **System Documentation**:
  - `docs/AUDIT_REPORT.md`: Comprehensive audit report detailing state, issues, and resolution.
  - `docs/MISSING.md`: Operational fallbacks and environment variable requirement guide.
  - `docs/development/setup.md`: Step-by-step setup instructions from a clean machine.
  - `docs/architecture/system-architecture.md`: Architecture diagrams and data flow specifications.
  - `docs/api/api-contract.md`: REST API contract specification.
  - `docs/data/data-model.md`: Canonical schemas for Observations and Civic Events.
  - `CONTRIBUTING.md`: 4-developer Git workflow, branch policy, and commit standards.

### Changed
- **Pytest Testing Suite (`backend/tests/test_api.py`)**: Refactored test fixture using `ASGITransport` and in-memory test database, achieving 100% test pass rate (9/9 tests).
- **Vite Configuration (`vite.config.ts`)**: Replaced deprecated `__dirname` with `node:url` `fileURLToPath` for safe ES module path aliasing.
- **Root README (`README.md`)**: Replaced AI Studio placeholder template with complete hackathon product documentation.
- **Package Manifest (`package.json`)**: Renamed project to `citypulse-frontend` and updated scripts.

### Fixed
- Fixed MongoDB connection hang when running without Docker/MongoDB.
- Fixed Pytest `ModuleNotFoundError` when executing test suite.
- Fixed `datetime.utcnow()` deprecation warnings by adopting timezone-aware `datetime.now(timezone.utc)`.
