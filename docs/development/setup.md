# Developer Setup Guide

This guide walks you through setting up and running **CityPulse** from scratch on a clean machine.

---

## 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: v18.0.0 or higher ([nodejs.org](https://nodejs.org/))
- **npm**: v9.0.0 or higher
- **Python**: 3.10, 3.11, or 3.12+ ([python.org](https://www.python.org/))
- **Docker Desktop** *(Optional, for containerized run)*: ([docker.com](https://www.docker.com/))

---

## 2. Environment Configuration

Copy the example environment files for both frontend and backend:

### Root / Frontend `.env`
```bash
cp .env.example .env
```
Contents:
```env
VITE_API_BASE_URL=http://localhost:8000
DEMO_MODE=true
```

### Backend `.env`
```bash
cp backend/.env.example backend/.env
```
Contents:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=citypulse
LLM_API_KEY=
```

*Note: If MongoDB or LLM_API_KEY are not provided, CityPulse automatically defaults to in-memory dual storage and grounded deterministic explanation templates.*

---

## 3. Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Verify TypeScript build and check for errors:
   ```bash
   npm run lint
   ```
3. Run local Vite development server:
   ```bash
   npm run dev
   ```
   The UI will be accessible at: `http://localhost:3000`

---

## 4. Backend Setup

1. Navigate to the backend directory and install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```
2. Run backend API server using Uvicorn:
   ```bash
   uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The REST API docs will be accessible at: `http://localhost:8000/docs`

---

## 5. Running Backend Unit & API Tests

To run the automated Pytest suite:
```bash
PYTHONPATH=backend pytest backend/tests
```

---

## 6. Running Demo Flow (Single-Command Docker Run)

If Docker Desktop is running on your machine:
```powershell
.\start-demo.ps1
```
Or via Docker Compose:
```bash
docker-compose up -d --build
```
Access points:
- **Frontend Dashboard**: `http://localhost:3000`
- **Backend Swagger Docs**: `http://localhost:8000/docs`

To stop:
```bash
docker-compose down
```

---

## 7. Troubleshooting

- **CORS Errors**: Ensure Vite proxy is configured in `vite.config.ts`. All `/api/*` calls from frontend automatically route to `http://localhost:8000`.
- **Port Conflicts**: If port 3000 or 8000 is occupied, change the port in `package.json` (`--port=3000`) or in Uvicorn command (`--port=8000`).
