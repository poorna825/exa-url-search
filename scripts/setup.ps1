#!/usr/bin/env pwsh
# Setup script for Windows/PowerShell

Write-Host "=== EXA URL Search - Project Setup ===" -ForegroundColor Cyan

# Check Python
Write-Host "`nChecking Python..." -ForegroundColor Yellow
python --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Python not found. Please install Python 3.9+" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "`nChecking Node.js..." -ForegroundColor Yellow
node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host "`n=== Setting up Backend ===" -ForegroundColor Cyan
Set-Location backend

if (!(Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Please edit backend/.env and add your API keys!" -ForegroundColor Green
}

Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

Set-Location ..

# Setup Frontend
Write-Host "`n=== Setting up Frontend ===" -ForegroundColor Cyan
Set-Location frontend

if (!(Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Please edit frontend/.env if needed!" -ForegroundColor Green
}

Write-Host "Installing Node dependencies..." -ForegroundColor Yellow
npm install

Set-Location ..

Write-Host "`n=== Setup Complete! ===" -ForegroundColor Green
Write-Host "`nNext steps:"
Write-Host "1. Edit backend/.env and add your API keys (EXA_API_KEY, OPENAI_API_KEY)"
Write-Host "2. Run backend: cd backend; python -m app.main"
Write-Host "3. Run frontend: cd frontend; npm run dev"
Write-Host "`nFor more information, see README.md"
