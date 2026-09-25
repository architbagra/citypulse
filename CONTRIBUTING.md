# Contributing Guidelines for CityPulse

Welcome to the **CityPulse** repository! To ensure smooth collaboration across our 4-person team during development and hackathons, please adhere to these guidelines.

---

## 1. Branch Strategy

Never commit directly to the `main` branch. All development work should take place on dedicated feature branches.

### Recommended Branch Naming Conventions:
- `feature/frontend-dashboard` (Member 1: UI/UX & Views)
- `feature/backend-api` (Member 2: FastAPI & Endpoints)
- `feature/intelligence-engine` (Member 3: Data Ingestion & Analytics)
- `feature/devops-docker` (Member 4: Deployment, Tests & CI/CD)
- `fix/feed-fallback`
- `docs/architecture-update`

---

## 2. Commit Message Conventions

Write clear, logical, and structured commit messages following Conventional Commits:

Examples:
- `feat: add grounded LLM explanation service`
- `feat: add MongoDB in-memory dual fallback engine`
- `fix: resolve Pytest ASGITransport connection error`
- `refactor: clean up deprecated Vite config aliasing`
- `docs: add API contract and data model specification`
- `chore: update requirements.txt dependencies`

Avoid massive single commits containing unrelated changes across modules.

---

## 3. Module Boundaries & AI Pair Coding Etiquette

- **Frontend Developers**: Avoid making uncoordinated structural changes to `backend/app/models/` or intelligence schemas.
- **Backend Developers**: Ensure API return types match `src/types/index.ts`. If modifying response fields, communicate with the frontend owner.
- **Data/Intelligence Developers**: Store normalization logic inside `intelligence/core/normalizer.py`.

---

## 4. Code Quality & Pre-PR Verification

Before creating a Pull Request or merging into `main`, execute the verification suite:

1. **Frontend Type Check**:
   ```bash
   npm run lint
   ```
2. **Frontend Production Build**:
   ```bash
   npm run build
   ```
3. **Backend Pytest Suite**:
   ```bash
   PYTHONPATH=backend pytest backend/tests
   ```

All three steps must succeed without errors.
