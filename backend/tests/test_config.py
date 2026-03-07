"""
Tests for configuration
"""
import pytest
from app.config import Settings


def test_settings_defaults():
    """Test that settings have reasonable defaults"""
    settings = Settings()
    assert settings.HOST == "0.0.0.0"
    assert settings.PORT == 8000
    assert settings.DEFAULT_NUM_RESULTS == 5
    assert settings.MAX_NUM_RESULTS == 20


def test_settings_validation_missing_api_keys():
    """Test that validation fails when API keys are missing"""
    settings = Settings()
    settings.EXA_API_KEY = ""
    settings.OPENAI_API_KEY = ""
    
    with pytest.raises(ValueError, match="EXA_API_KEY"):
        settings.validate()
