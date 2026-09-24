# CityPulse Final Demo Start Script

Write-Host "========================================="
Write-Host "🚀 STARTING CITYPULSE DEMO FLOW 🚀"
Write-Host "========================================="

# Check if Docker is running
docker info > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first!" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Building and starting containers via Docker Compose..." -ForegroundColor Cyan
docker-compose up -d --build

Write-Host "✅ Backend API running at: http://localhost:8000/docs" -ForegroundColor Green
Write-Host "✅ Frontend UI running at: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "To stop the demo, run: docker-compose down" -ForegroundColor Yellow
