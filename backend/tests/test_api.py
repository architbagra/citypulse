import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from asgi_lifespan import LifespanManager

@pytest.fixture
async def async_client():
    async with LifespanManager(app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            yield client

@pytest.mark.asyncio
async def test_root(async_client):
    response = await async_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to CityPulse Backend API"}

@pytest.mark.asyncio
async def test_health(async_client):
    response = await async_client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

@pytest.mark.asyncio
async def test_city_state(async_client):
    response = await async_client.get("/api/city/state")
    assert response.status_code == 200
    assert response.json()["city"] == "Jaipur"

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

@pytest.mark.asyncio
async def test_explain(async_client):
    response = await async_client.post("/api/explain", json={"eventId": "JPR-2024-0819-B"})
    assert response.status_code == 200
    assert "explanation" in response.json()
    assert response.json()["groundedInEvidence"] is True
