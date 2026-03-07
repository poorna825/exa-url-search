"""
Application configuration using environment variables
"""
import os
import certifi
from typing import List
from dotenv import load_dotenv

# Set SSL certificate file for all HTTPS connections
os.environ['SSL_CERT_FILE'] = certifi.where()
os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()

load_dotenv()


class Settings:
    """Application settings and configuration"""
    
    # API Keys
    EXA_API_KEY: str = os.getenv("EXA_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Server Configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = os.getenv(
        "CORS_ORIGINS", 
        "http://localhost:5173,http://localhost:3000"
    ).split(",")
    
    # Search Configuration
    DEFAULT_NUM_RESULTS: int = int(os.getenv("DEFAULT_NUM_RESULTS", "5"))
    MAX_NUM_RESULTS: int = int(os.getenv("MAX_NUM_RESULTS", "20"))
    
    # Supported Domains
    SUPPORTED_DOMAINS: dict = {
        "tiktok": "https://www.tiktok.com",
        "youtube": "https://www.youtube.com",
        "twitter": "https://twitter.com",
        "reddit": "https://www.reddit.com",
        "medium": "https://medium.com",
        "dev": "https://dev.to",
        "github": "https://github.com",
        "stackoverflow": "https://stackoverflow.com"
    }
    
    # OpenAI Configuration
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
    OPENAI_MAX_TOKENS: int = int(os.getenv("OPENAI_MAX_TOKENS", "200"))
    OPENAI_TEMPERATURE: float = float(os.getenv("OPENAI_TEMPERATURE", "0.3"))
    
    # Timeout Configuration (in seconds)
    SEARCH_TIMEOUT: int = int(os.getenv("SEARCH_TIMEOUT", "30"))
    SUMMARY_TIMEOUT: int = int(os.getenv("SUMMARY_TIMEOUT", "30"))
    
    def validate(self) -> None:
        """Validate required configuration"""
        if not self.EXA_API_KEY:
            raise ValueError("EXA_API_KEY environment variable is required")
        if not self.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY environment variable is required")


settings = Settings()
