"""
Pydantic models for request/response validation
"""
from typing import List, Optional
from pydantic import BaseModel, Field, validator


class SearchRequest(BaseModel):
    """Search request model"""
    query: str = Field(..., min_length=1, max_length=500, description="Search query")
    num_results: int = Field(default=5, ge=1, le=20, description="Number of results to return")
    domains: Optional[List[str]] = Field(default=None, description="List of domains to search (e.g., ['tiktok', 'youtube'])")
    
    @validator('query')
    def sanitize_query(cls, v):
        """Sanitize and validate query string"""
        # Remove excessive whitespace
        v = ' '.join(v.split())
        if not v:
            raise ValueError("Query cannot be empty or only whitespace")
        return v
    
    @validator('domains')
    def validate_domains(cls, v):
        """Validate domains list"""
        if v is not None:
            # Remove duplicates and empty strings
            v = [d.strip().lower() for d in v if d and d.strip()]
            if not v:
                return None
        return v


class SearchResult(BaseModel):
    """Individual search result model"""
    title: str = Field(..., description="Result title")
    url: str = Field(..., description="Result URL")
    snippet: str = Field(..., description="Content snippet")
    summary: str = Field(..., description="AI-generated summary")
    domain: str = Field(..., description="Source domain")


class SearchResponse(BaseModel):
    """Search response model"""
    results: List[SearchResult] = Field(default_factory=list, description="List of search results")
    query: str = Field(..., description="Original search query")
    count: int = Field(..., description="Number of results returned")
    domains: Optional[List[str]] = Field(None, description="Domains searched")


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")


class HealthResponse(BaseModel):
    """Health check response model"""
    status: str = Field(..., description="Service status")
    version: str = Field(..., description="API version")
