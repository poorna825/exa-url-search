"""Quick environment test script"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=" * 60)
print("ENVIRONMENT CONFIGURATION CHECK")
print("=" * 60)

exa_key = os.getenv("EXA_API_KEY", "")
openai_key = os.getenv("OPENAI_API_KEY", "")

if exa_key and len(exa_key) > 10:
    print(f"✓ EXA_API_KEY loaded: {exa_key[:15]}... (length: {len(exa_key)})")
else:
    print("✗ EXA_API_KEY not loaded or invalid")

if openai_key and len(openai_key) > 10:
    print(f"✓ OPENAI_API_KEY loaded: {openai_key[:15]}... (length: {len(openai_key)})")
else:
    print("✗ OPENAI_API_KEY not loaded or invalid")

print(f"✓ HOST: {os.getenv('HOST', '0.0.0.0')}")
print(f"✓ PORT: {os.getenv('PORT', '8000')}")
print(f"✓ CORS_ORIGINS: {os.getenv('CORS_ORIGINS', 'Not set')}")
print("=" * 60)

# Test configuration loading
try:
    from app.config import settings
    settings.validate()
    print("✓ Configuration validated successfully!")
    print("=" * 60)
except Exception as e:
    print(f"✗ Configuration validation failed: {e}")
    print("=" * 60)
