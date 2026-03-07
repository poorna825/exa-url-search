"""
Text summarization service using OpenAI API
"""
import logging
from typing import Optional
from openai import OpenAI, OpenAIError
from ..config import settings

logger = logging.getLogger(__name__)


class SummaryService:
    """Service for text summarization using OpenAI GPT models"""
    
    def __init__(self):
        """Initialize OpenAI client with API key from environment"""
        try:
            self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
            logger.info("SummaryService initialized with OpenAI API")
        except Exception as e:
            logger.error(f"Failed to initialize OpenAI client: {str(e)}")
            raise
    
    def summarize_text(self, text: str) -> str:
        """
        Summarize text using OpenAI's GPT model
        
        Uses the OpenAI Chat Completions API to generate concise summaries
        of input text. The summary aims to be between 50-150 words while
        preserving key information.
        
        Args:
            text: Text content to summarize
            
        Returns:
            Summarized text or error message
            
        Raises:
            Does not raise exceptions - returns error messages as strings
        """
        if not text or text == "[No Content]":
            return "[No content to summarize]"
        
        try:
            logger.info(f"Summarizing text (length: {len(text)} chars)")
            
            # Truncate text if too long (GPT-3.5 Turbo supports up to 4096 tokens)
            # Roughly 1 token ≈ 4 characters, so limit input to ~12000 chars
            max_input_chars = 12000
            if len(text) > max_input_chars:
                logger.warning(f"Text truncated from {len(text)} to {max_input_chars} chars")
                text = text[:max_input_chars] + "..."
            
            # Call OpenAI API with summarization prompt
            response = self.client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that creates concise summaries. "
                                   "Provide summaries that are clear, accurate, and between 50-150 words."
                    },
                    {
                        "role": "user",
                        "content": f"Summarize the following text:\n\n{text}"
                    }
                ],
                max_tokens=settings.OPENAI_MAX_TOKENS,
                temperature=settings.OPENAI_TEMPERATURE,
                timeout=settings.SUMMARY_TIMEOUT
            )
            
            # Extract summary from response
            summary = response.choices[0].message.content.strip()
            
            if not summary:
                logger.warning("OpenAI returned empty summary")
                return "[Unable to generate summary]"
            
            logger.info(f"Summary generated successfully (length: {len(summary)} chars)")
            return summary
                
        except OpenAIError as e:
            # Handle OpenAI-specific errors
            logger.error(f"OpenAI API error: {str(e)}")
            return f"[Summary error: OpenAI API failed - {str(e)[:50]}]"
        
        except Exception as e:
            # Handle any other unexpected errors
            logger.error(f"Unexpected error during summarization: {str(e)}")
            return f"[Summary error: {str(e)[:50]}]"
