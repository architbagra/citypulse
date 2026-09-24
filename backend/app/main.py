from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database.mongodb import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(title="CityPulse Backend API", lifespan=lifespan)


# Setup CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to CityPulse Backend API"}

from app.api.events import router as events_router
from app.api.zones import router as zones_router
from app.api.feeds import router as feeds_router
from app.api.replay import router as replay_router
from app.api.relationships import router as relationships_router

app.include_router(events_router, prefix="/api", tags=["events"])
app.include_router(zones_router, prefix="/api", tags=["zones"])
app.include_router(feeds_router, prefix="/api", tags=["feeds"])
app.include_router(replay_router, prefix="/api", tags=["replay"])
app.include_router(relationships_router, prefix="/api", tags=["relationships"])


