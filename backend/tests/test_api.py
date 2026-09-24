import pytest
from httpx import AsyncClient
from app.main import app
import asgi_lifespan

# Use a mock MongoDB or just test the endpoints structure
# Since the endpoints connect to MongoDB, in a real CI environment we'd use a test DB.
# For these integration tests, we'll just check that the routes are registered and return 200.
# We will use the ASGI lifespan to trigger the db connection.

@pytest.fixture
async def async_client():
    from asgi_lifespan import LifespanManager
    from httpx import ASGITransport
    async with LifespanManager(app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            yield client

@pytest.mark.asyncio
async def test_root(async_client):
    response = await async_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to CityPulse Backend API"}

@pytest.mark.asyncio
async def test_get_events(async_client):
    response = await async_client.get("/api/events")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_zones(async_client):
    response = await async_client.get("/api/zones")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_feeds(async_client):
    response = await async_client.get("/api/feeds")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_replay(async_client):
    response = await async_client.get("/api/replay")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_get_relationships(async_client):
    response = await async_client.get("/api/relationships/causes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
