"""
Internet Consensus v2 (Cross-Platform Intelligence) Service
Analyzes search results to generate cross-platform consensus insights
"""
import logging
import json
import re
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from collections import defaultdict
from openai import OpenAI, OpenAIError
from ..config import settings

logger = logging.getLogger(__name__)


class ConsensusService:
    """Service for generating cross-platform consensus insights"""
    
    def __init__(self):
        """Initialize OpenAI client and in-memory cache"""
        try:
            self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
            self.cache: Dict[str, Dict[str, Any]] = {}
            self.cache_ttl = timedelta(minutes=10)
            logger.info("ConsensusService initialized")
        except Exception as e:
            logger.error(f"Failed to initialize ConsensusService: {str(e)}")
            raise
    
    def group_results_by_domain(self, results: List[Any]) -> Dict[str, List[Any]]:
        """
        Group search results by domain/platform
        
        Args:
            results: List of SearchResult objects
            
        Returns:
            Dictionary with domain as key and list of results as value
        """
        grouped = defaultdict(list)
        for result in results:
            domain = result.domain if hasattr(result, 'domain') else 'unknown'
            grouped[domain].append(result)
        return dict(grouped)
    
    def extract_local_keywords(self, text: str, top_n: int = 5) -> List[str]:
        """
        Extract basic keywords from text using simple frequency analysis
        
        Args:
            text: Input text
            top_n: Number of top keywords to return
            
        Returns:
            List of keywords
        """
        if not text:
            return []
        
        # Remove common words
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
            'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
            'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few',
            'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
            'own', 'same', 'so', 'than', 'too', 'very', 'from', 'up', 'about'
        }
        
        # Extract words (2+ chars, alphanumeric)
        words = re.findall(r'\b[a-zA-Z]{2,}\b', text.lower())
        
        # Count frequency, excluding stop words
        word_freq = defaultdict(int)
        for word in words:
            if word not in stop_words and len(word) > 2:
                word_freq[word] += 1
        
        # Sort by frequency and return top N
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [word for word, _ in sorted_words[:top_n]]
    
    def prepare_prompt_data(self, grouped_results: Dict[str, List[Any]]) -> str:
        """
        Prepare compact prompt data from grouped results
        
        Constraints:
        - Max 6 domains
        - Max 2 summaries per domain
        - Truncate each summary to 120 chars
        - Target total prompt size ~1200 chars
        
        Args:
            grouped_results: Results grouped by domain
            
        Returns:
            Formatted string for OpenAI prompt
        """
        prompt_parts = []
        
        # Limit to 6 domains
        limited_domains = list(grouped_results.items())[:6]
        
        for domain, results in limited_domains:
            # Take first 2 results
            limited_results = results[:2]
            
            # Collect and truncate summaries
            summaries = []
            for result in limited_results:
                summary = result.summary if hasattr(result, 'summary') else ''
                if summary and not summary.startswith('['):
                    # Truncate to 120 chars
                    truncated = summary[:120].strip()
                    if len(summary) > 120:
                        truncated += '...'
                    summaries.append(truncated)
            
            if summaries:
                # Format: "Platform: summary1 | summary2"
                domain_name = domain.capitalize()
                combined = ' | '.join(summaries)
                prompt_parts.append(f"{domain_name}: {combined}")
        
        return '\n'.join(prompt_parts)
    
    def _get_fallback_consensus(self) -> Dict[str, Any]:
        """
        Return fallback consensus when OpenAI fails
        
        Returns:
            Basic consensus structure
        """
        return {
            "platform_insights": {},
            "agreements": [],
            "disagreements": [],
            "top_entities": [],
            "overall_consensus": "Consensus analysis unavailable."
        }
    
    def _check_cache(self, query: str) -> Optional[Dict[str, Any]]:
        """
        Check if consensus exists in cache and is still valid
        
        Args:
            query: Search query string
            
        Returns:
            Cached consensus or None
        """
        if query in self.cache:
            cached_entry = self.cache[query]
            if datetime.now() - cached_entry['timestamp'] < self.cache_ttl:
                logger.info(f"Cache hit for query: {query}")
                return cached_entry['data']
            else:
                # Remove expired entry
                del self.cache[query]
                logger.info(f"Cache expired for query: {query}")
        return None
    
    def _update_cache(self, query: str, consensus: Dict[str, Any]) -> None:
        """
        Update cache with new consensus data
        
        Args:
            query: Search query string
            consensus: Consensus data to cache
        """
        self.cache[query] = {
            'data': consensus,
            'timestamp': datetime.now()
        }
        logger.info(f"Cache updated for query: {query}")
    
    def generate_consensus(self, results: List[Any], query: str = "") -> Dict[str, Any]:
        """
        Generate cross-platform consensus insights from search results
        
        Args:
            results: List of SearchResult objects with summaries
            query: Original search query (for caching)
            
        Returns:
            Dictionary with consensus insights
        """
        # Check cache first
        if query:
            cached = self._check_cache(query)
            if cached:
                return cached
        
        try:
            start_time = datetime.now()
            logger.info(f"Generating consensus for {len(results)} results")
            
            # Group results by domain
            grouped_results = self.group_results_by_domain(results)
            
            if not grouped_results:
                logger.warning("No results to analyze")
                return self._get_fallback_consensus()
            
            # Prepare compact prompt data
            prompt_data = self.prepare_prompt_data(grouped_results)
            
            if not prompt_data:
                logger.warning("No valid summaries to analyze")
                return self._get_fallback_consensus()
            
            # Construct system and user prompts
            system_prompt = (
                "You are an expert at analyzing cross-platform discussions. "
                "Extract insights about what different platforms say, common themes, "
                "disagreements, and key entities mentioned."
            )
            
            user_prompt = (
                f"Analyze these platform summaries and extract insights:\n\n{prompt_data}\n\n"
                "Return JSON with:\n"
                "- platform_insights: object mapping each platform to a brief insight (1 sentence)\n"
                "- agreements: array of common themes across platforms (max 3)\n"
                "- disagreements: array of differing viewpoints (max 3)\n"
                "- top_entities: array of tools/frameworks/concepts mentioned (max 5)\n"
                "- overall_consensus: summary sentence of the overall consensus"
            )
            
            # Log prompt size
            total_prompt_size = len(system_prompt) + len(user_prompt)
            logger.info(f"Prompt size: {total_prompt_size} chars")
            
            # Call OpenAI with JSON response mode
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                response_format={"type": "json_object"},
                max_tokens=500,
                temperature=0.3,
                timeout=30
            )
            
            # Parse JSON response
            consensus_text = response.choices[0].message.content.strip()
            consensus = json.loads(consensus_text)
            
            # Validate structure
            required_keys = [
                "platform_insights", "agreements", "disagreements",
                "top_entities", "overall_consensus"
            ]
            for key in required_keys:
                if key not in consensus:
                    consensus[key] = [] if key != "overall_consensus" else ""
                    if key == "platform_insights":
                        consensus[key] = {}
            
            elapsed = (datetime.now() - start_time).total_seconds()
            logger.info(f"Consensus generated in {elapsed:.2f}s")
            
            # Update cache
            if query:
                self._update_cache(query, consensus)
            
            return consensus
            
        except OpenAIError as e:
            logger.error(f"OpenAI API error during consensus generation: {str(e)}")
            return self._get_fallback_consensus()
        
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse OpenAI JSON response: {str(e)}")
            return self._get_fallback_consensus()
        
        except Exception as e:
            logger.error(f"Unexpected error during consensus generation: {str(e)}")
            return self._get_fallback_consensus()
