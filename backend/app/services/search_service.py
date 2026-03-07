"""
Search service using Exa API
"""
import logging
from typing import List, Dict, Any, Optional
from urllib.parse import urlparse
from exa_py import Exa
from ..config import settings

logger = logging.getLogger(__name__)


class SearchService:
    """Service for searching URLs using Exa API"""
    
    def __init__(self):
        """Initialize Exa client"""
        self.exa = Exa(api_key=settings.EXA_API_KEY)
        self.supported_domains = settings.SUPPORTED_DOMAINS
    
    async def search(
        self, 
        query: str, 
        num_results: int = 5,
        domains: Optional[List[str]] = None
    ) -> List[Dict[str, Any]]:
        """
        Search URLs using Exa API across specified domains
        
        Args:
            query: Search query string
            num_results: Number of results to return
            domains: List of domain keys to search (e.g., ['tiktok', 'youtube'])
                    If None, searches TikTok by default for backward compatibility
            
        Returns:
            List of search results with title, url, text content, and domain
            
        Raises:
            Exception: If search fails
        """
        try:
            # Default to TikTok if no domains specified (backward compatibility)
            if not domains:
                domains = ['tiktok']
            
            # Convert domain keys to URLs
            domain_urls = []
            for domain_key in domains:
                domain_key_lower = domain_key.lower()
                if domain_key_lower in self.supported_domains:
                    domain_urls.append(self.supported_domains[domain_key_lower])
                else:
                    logger.warning(f"Unsupported domain: {domain_key}")
            
            if not domain_urls:
                raise ValueError("No valid domains specified")
            
            logger.info(f"Searching for: {query} (num_results={num_results}, domains={domains})")
            
            result = self.exa.search_and_contents(
                query,
                num_results=num_results,
                include_domains=domain_urls,
            )
            
            results = []
            for item in result.results:
                # Extract domain from URL
                parsed_url = urlparse(item.url)
                domain_name = parsed_url.netloc.replace('www.', '')
                
                results.append({
                    "title": item.title or "[No Title]",
                    "url": item.url,
                    "text": item.text or "[No Content]",
                    "domain": domain_name
                })
            
            logger.info(f"Found {len(results)} results across {len(domain_urls)} domains")
            return results
            
        except Exception as e:
            logger.error(f"Search error: {str(e)}")
            raise Exception(f"Failed to search: {str(e)}")
    
    # Keep backward compatibility method
    async def search_tiktok(self, query: str, num_results: int = 5) -> List[Dict[str, Any]]:
        """
        Legacy method for TikTok-only search (backward compatibility)
        
        Args:
            query: Search query string
            num_results: Number of results to return
            
        Returns:
            List of search results
        """
        return await self.search(query, num_results, domains=['tiktok'])
