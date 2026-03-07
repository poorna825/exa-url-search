"""Quick server API test"""
import requests
import json

print("=" * 70)
print("TESTING BACKEND SERVER APIs")
print("=" * 70)
print()

base_url = "http://localhost:8000"

# Test 1: Root endpoint
print("1. Testing root endpoint...")
try:
    response = requests.get(f"{base_url}/")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print("   ✓ Root endpoint working")
except Exception as e:
    print(f"   ✗ Root endpoint failed: {e}")
print()

# Test 2: Health endpoint
print("2. Testing health endpoint...")
try:
    response = requests.get(f"{base_url}/health")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {response.json()}")
    print("   ✓ Health endpoint working")
except Exception as e:
    print(f"   ✗ Health endpoint failed: {e}")
print()

# Test 3: Get supported domains
print("3. Testing supported domains...")
try:
    response = requests.get(f"{base_url}/api/domains")
    print(f"   Status: {response.status_code}")
    result = response.json()
    print(f"   Domains: {list(result['domains'].keys())}")
    print(f"   Total: {result['count']}")
    print("   ✓ Domains endpoint working")
except Exception as e:
    print(f"   ✗ Domains endpoint failed: {e}")
print()

# Test 4: Search TikTok
print("4. Testing search endpoint (TikTok)...")
try:
    response = requests.get(
        f"{base_url}/api/search",
        params={
            'query': 'cooking',
            'domains': 'tiktok',
            'num_results': 2
        },
        timeout=30
    )
    print(f"   Status: {response.status_code}")
    result = response.json()
    print(f"   Query: {result.get('query')}")
    print(f"   Platform: {result.get('platform')}")
    print(f"   Total Results: {result.get('totalResults')}")
    print("   Results:")
    for r in result.get('results', []):
        print(f"     • {r.get('title', 'N/A')[:50]}...")
        print(f"       URL: {r.get('url', 'N/A')}")
        print(f"       Summary: {r.get('summary', 'N/A')[:80]}...")
        print()
    print("   ✓ Search endpoint working")
except Exception as e:
    print(f"   ✗ Search endpoint failed: {e}")
print()

# Test 5: Multi-domain search
print("5. Testing multi-domain search...")
try:
    response = requests.get(
        f"{base_url}/api/search",
        params={
            'query': 'python tutorial',
            'domains': 'youtube,dev',
            'num_results': 2
        },
        timeout=30
    )
    print(f"   Status: {response.status_code}")
    result = response.json()
    print(f"   Query: {result.get('query')}")
    print(f"   Domains searched: {result.get('platform')}")
    print(f"   Total Results: {result.get('totalResults')}")
    print("   Results:")
    for r in result.get('results', []):
        print(f"     • [{r.get('platform')}] {r.get('title', 'N/A')[:50]}...")
    print("   ✓ Multi-domain search working")
except Exception as e:
    print(f"   ✗ Multi-domain search failed: {e}")

print()
print("=" * 70)
print("TESTS COMPLETE")
print("=" * 70)
