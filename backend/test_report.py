"""Comprehensive backend test report generator"""
import sys
import os
from pathlib import Path

print("=" * 70)
print("BACKEND TEST REPORT")
print("=" * 70)
print()

# 1. Configuration Test
print("1. CONFIGURATION TEST")
print("-" * 70)
try:
    from dotenv import load_dotenv
    load_dotenv()
    
    exa_key = os.getenv("EXA_API_KEY", "")
    openai_key = os.getenv("OPENAI_API_KEY", "")
    
    if exa_key and exa_key != "your_exa_api_key_here":
        print(f"   ✓ EXA_API_KEY: Configured ({len(exa_key)} chars)")
    else:
        print(f"   ⚠ EXA_API_KEY: Using placeholder or not set")
    
    if openai_key and openai_key != "your_openai_api_key_here":
        print(f"   ✓ OPENAI_API_KEY: Configured ({len(openai_key)} chars)")
    else:
        print(f"   ⚠ OPENAI_API_KEY: Using placeholder or not set")
    
    print(f"   ✓ Server: {os.getenv('HOST', '0.0.0.0')}:{os.getenv('PORT', '8000')}")
    print(f"   ✓ CORS: {os.getenv('CORS_ORIGINS', 'default')}")
    
    # Try validation
    from app.config import settings
    try:
        settings.validate()
        print("   ✓ Configuration validation: PASSED")
    except ValueError as e:
        print(f"   ✗ Configuration validation: FAILED - {e}")
        
except Exception as e:
    print(f"   ✗ Configuration test failed: {e}")
print()

# 2. Import Test
print("2. MODULE IMPORT TEST")
print("-" * 70)
modules = [
    "app.main",
    "app.config",
    "app.models",
    "app.routes.search",
    "app.services.search_service",
    "app.services.summary_service",
]

for module in modules:
    try:
        __import__(module)
        print(f"   ✓ {module}")
    except Exception as e:
        print(f"   ✗ {module}: {e}")
print()

# 3. API Endpoint Test
print("3. API ENDPOINT TEST")
print("-" * 70)
try:
    from fastapi.testclient import TestClient
    from app.main import app
    
    client = TestClient(app)
    
    # Test root
    response = client.get("/")
    if response.status_code == 200:
        print(f"   ✓ GET / - Status: {response.status_code}")
    else:
        print(f"   ✗ GET / - Status: {response.status_code}")
    
    # Test health
    response = client.get("/health")
    if response.status_code == 200:
        data = response.json()
        print(f"   ✓ GET /health - Status: {response.status_code}, Version: {data.get('version')}")
    else:
        print(f"   ✗ GET /health - Status: {response.status_code}")
    
    # Test search validation
    response = client.get("/api/search")
    if response.status_code == 422:
        print(f"   ✓ GET /api/search (no query) - Status: {response.status_code} (validation works)")
    else:
        print(f"   ⚠ GET /api/search (no query) - Status: {response.status_code}")
        
except Exception as e:
    print(f"   ✗ API endpoint test failed: {e}")
print()

# 4. Dependencies Check
print("4. DEPENDENCY CHECK")
print("-" * 70)
deps = [
    "fastapi",
    "uvicorn",
    "exa_py",
    "pydantic",
    "requests",
    "certifi",
    "pytest",
]

for dep in deps:
    try:
        __import__(dep)
        print(f"   ✓ {dep}")
    except ImportError:
        print(f"   ✗ {dep}: Not installed")
print()

print("=" * 70)
print("SUMMARY")
print("=" * 70)
print("Backend is configured and ready for testing.")
print("Run 'pytest tests/ -v' to execute the full test suite.")
print("Run 'pytest tests/ --cov=app' to see code coverage.")
print("=" * 70)
