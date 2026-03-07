# API Documentation

## Overview
The EXA Multi-Domain Search API provides endpoints for searching across multiple platforms (TikTok, YouTube, Twitter, Reddit, Medium, Dev.to, GitHub, StackOverflow) with AI-powered content summaries.

Base URL: `http://localhost:8000` (development)

## Authentication
Currently no authentication is required. API keys for external services (Exa, OpenAI) are configured server-side.

## Endpoints

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### Root Information
```
GET /
```

Returns basic API information and available endpoints.

### Get Supported Domains
```
GET /api/domains
```

Returns the list of all supported domains for searching.

**Success Response (200):**
```json
{
  "domains": {
    "tiktok": "https://www.tiktok.com",
    "youtube": "https://www.youtube.com",
    "twitter": "https://twitter.com",
    "reddit": "https://www.reddit.com",
    "medium": "https://medium.com",
    "dev": "https://dev.to",
    "github": "https://github.com",
    "stackoverflow": "https://stackoverflow.com"
  },
  "count": 8
}
```

### Search Multi-Domain Content
```
GET /api/search
```

Search for content across multiple domains and get AI-generated summaries.

**Query Parameters:**
- `query` (required): Search term or phrase (1-500 characters)
- `num_results` (optional): Number of results to return (1-20, default: 5)
- `domains` (optional): Comma-separated list of domain keys (default: 'tiktok')
  - Available: `tiktok`, `youtube`, `twitter`, `reddit`, `medium`, `dev`, `github`, `stackoverflow`

**Example Requests:**
```bash
# Search TikTok only (default)
curl "http://localhost:8000/api/search?query=cooking+recipes"

# Search multiple domains
curl "http://localhost:8000/api/search?query=python+tutorial&domains=youtube,dev,stackoverflow"

# Search with custom result count
curl "http://localhost:8000/api/search?query=AI+news&domains=twitter,reddit,medium&num_results=10"
```

**Success Response (200):**
```json
{
  "results": [
    {
      "title": "Python Tutorial for Beginners",
      "url": "https://www.youtube.com/watch?v=example",
      "snippet": "Complete Python tutorial covering basics to advanced...",
      "summary": "This tutorial covers Python fundamentals including variables, loops, and functions.",
      "domain": "youtube.com"
    }
  ],
  "query": "python tutorial",
  "count": 1,
  "domains": ["youtube", "dev"]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid query parameter or unsupported domain
- `422 Validation Error`: Query validation failed
- `500 Internal Server Error`: Search or summarization failed

## Rate Limits
Currently no rate limits are enforced. Consider implementing rate limiting for production.

## Interactive Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
