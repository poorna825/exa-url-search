# Backend README

## Development

### Running Locally
```bash
python -m app.main
```

### Running with Auto-reload
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Running Tests
```bash
pytest tests/ -v --cov=app
```

### Code Formatting
```bash
black app/ tests/
isort app/ tests/
flake8 app/
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py       # Package initialization
│   ├── main.py          # FastAPI application entry
│   ├── config.py        # Configuration management
│   ├── models.py        # Pydantic models
│   ├── routes/          # API endpoints
│   │   ├── __init__.py
│   │   └── search.py    # Search endpoints
│   └── services/        # Business logic
│       ├── __init__.py
│       ├── search_service.py    # Exa search
│       └── summary_service.py   # HF summarization
└── tests/               # Test suite
    ├── __init__.py
    ├── test_main.py
    └── test_config.py
```

## Environment Variables

See `.env.example` for all available configuration options.

## API Documentation

When running locally, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Deployment

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for deployment instructions.
