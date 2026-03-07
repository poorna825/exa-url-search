"""
Tests for main API endpoints
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Test root endpoint returns API information"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data
    assert data["message"] == "EXA URL Search API"


def test_health_endpoint():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


def test_search_endpoint_missing_query():
    """Test search endpoint without query parameter"""
    response = client.get("/api/search")
    assert response.status_code == 422  # Validation error


def test_search_endpoint_empty_query():
    """Test search endpoint with empty query"""
    response = client.get("/api/search?query=")
    assert response.status_code == 422  # Validation error


def test_search_endpoint_invalid_num_results():
    """Test search endpoint with invalid num_results"""
    response = client.get("/api/search?query=test&num_results=100")
    assert response.status_code == 422  # Validation error (exceeds max)


# Note: Add more comprehensive tests with mocked Exa and HF API responses
# For full test coverage, mock external API calls to avoid dependency on live services
