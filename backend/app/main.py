"""
EXA URL Search - Main FastAPI Application
"""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import search_router
from .models import HealthResponse
from . import __version__

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Validate configuration on startup
try:
    settings.validate()
except ValueError as e:
    logger.error(f"Configuration error: {e}")
    raise

# Initialize FastAPI app
app = FastAPI(
    title="EXA URL Search API",
    description="Search TikTok URLs with AI-powered summaries",
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(search_router)


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["health"],
    summary="Health Check",
    description="Check if the API is running and healthy"
)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        version=__version__
    )


@app.get("/", tags=["root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "EXA URL Search API",
        "version": __version__,
        "docs": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting server on {settings.HOST}:{settings.PORT}")
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )