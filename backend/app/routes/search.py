"""
Search endpoints
"""
import logging
from typing import Optional, List
from fastapi import APIRouter, Query, HTTPException
from ..models import SearchResponse, SearchResult, ConsensusInsight, ErrorResponse
from ..services import SearchService, SummaryService
from ..services.consensus_service import ConsensusService
from ..config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["search"])

# Initialize services
search_service = SearchService()
summary_service = SummaryService()
consensus_service = ConsensusService()


@router.get(
    "/domains",
    response_model=dict,
    summary="Get Supported Domains",
    description="Get list of all supported domains for searching"
)
async def get_supported_domains():
    """
    Get all supported domains
    
    Returns a dictionary of domain keys and their URLs
    """
    return {
        "domains": settings.SUPPORTED_DOMAINS,
        "count": len(settings.SUPPORTED_DOMAINS)
    }


@router.get(
    "/search",
    response_model=SearchResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    },
    summary="Search Multiple Domains",
    description="Search for content across multiple domains (TikTok, YouTube, Twitter, Reddit, etc.) and get AI-generated summaries"
)
async def search_content(
    query: str = Query(..., min_length=1, max_length=500, description="Search query"),
    num_results: int = Query(
        default=settings.DEFAULT_NUM_RESULTS,
        ge=1,
        le=settings.MAX_NUM_RESULTS,
        description="Number of results to return"
    ),
    domains: Optional[str] = Query(
        None,
        description="Comma-separated list of domains to search (e.g., 'tiktok,youtube,twitter'). If not specified, searches TikTok only.",
        example="tiktok,youtube"
    )
):
    """
    Search content across multiple domains
    
    - **query**: Search term or phrase
    - **num_results**: Number of results to return (1-20)
    - **domains**: Comma-separated domain keys (tiktok, youtube, twitter, reddit, medium, dev, github, stackoverflow)
    
    Examples:
    - `/api/search?query=cooking&domains=tiktok,youtube`
    - `/api/search?query=python+tutorial&domains=youtube,dev,stackoverflow&num_results=10`
    
    Returns search results with AI-generated summaries
    """
    try:
        # Validate query
        query = query.strip()
        if not query:
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Parse domains
        domain_list = None
        if domains:
            domain_list = [d.strip().lower() for d in domains.split(',') if d.strip()]
            # Validate domains
            invalid_domains = [d for d in domain_list if d not in settings.SUPPORTED_DOMAINS]
            if invalid_domains:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Invalid domains: {', '.join(invalid_domains)}. Supported: {', '.join(settings.SUPPORTED_DOMAINS.keys())}"
                )
        
        logger.info(f"Processing search request: query='{query}', num_results={num_results}, domains={domain_list}")
        
        # Perform search
        search_results = await search_service.search(query, num_results, domain_list)
        
        # Generate summaries for each result
        results_with_summary = []
        for item in search_results:
            summary = summary_service.summarize_text(item["text"])
            results_with_summary.append(
                SearchResult(
                    title=item["title"],
                    url=item["url"],
                    snippet=item["text"][:500] if item["text"] else "[No Content]",
                    summary=summary,
                    domain=item.get("domain", "unknown")
                )
            )
        
        logger.info(f"Successfully processed {len(results_with_summary)} results")
        
        # Generate cross-platform consensus insights
        consensus = None
        if results_with_summary:
            try:
                consensus_data = consensus_service.generate_consensus(
                    results_with_summary,
                    query=query
                )
                consensus = ConsensusInsight(**consensus_data)
                logger.info("Consensus insights generated successfully")
            except Exception as e:
                logger.error(f"Failed to generate consensus: {str(e)}")
                # Continue without consensus rather than failing the whole request
        
        return SearchResponse(
            results=results_with_summary,
            query=query,
            count=len(results_with_summary),
            domains=domain_list,
            consensus=consensus
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Search request failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")
