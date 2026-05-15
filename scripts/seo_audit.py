import requests
from bs4 import BeautifulSoup
import sys
import os

def audit_url(url):
    print(f"Starting SEO Audit for: {url}")
    print("-" * 50)
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching URL: {e}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 1. Title Tag
    title = soup.find('title')
    if title:
        print(f"[PASS] Title: {title.text}")
        if len(title.text) < 30 or len(title.text) > 60:
            print(f"       Warning: Title length ({len(title.text)}) is outside ideal range (30-60).")
    else:
        print("[FAIL] No title tag found.")

    # 2. Meta Description
    desc = soup.find('meta', attrs={'name': 'description'})
    if desc:
        content = desc.get('content', '')
        print(f"[PASS] Meta Description: {content[:50]}...")
        if len(content) < 120 or len(content) > 160:
            print(f"       Warning: Description length ({len(content)}) is outside ideal range (120-160).")
    else:
        print("[FAIL] No meta description found.")

    # 3. H1 Tag
    h1s = soup.find_all('h1')
    if h1s:
        print(f"[PASS] Found {len(h1s)} H1 tag(s).")
        for h1 in h1s:
            print(f"       H1: {h1.text.strip()}")
        if len(h1s) > 1:
            print("       Warning: Multiple H1 tags found. Stick to one per page.")
    else:
        print("[FAIL] No H1 tag found.")

    # 4. Robots.txt
    robots_url = url.rstrip('/') + '/robots.txt'
    try:
        robots_res = requests.get(robots_url, timeout=5)
        if robots_res.status_code == 200:
            print("[PASS] robots.txt found.")
        else:
            print(f"[FAIL] robots.txt returned status {robots_res.status_code}.")
    except:
        print("[FAIL] Could not fetch robots.txt.")

    # 5. Sitemap
    sitemap_url = url.rstrip('/') + '/sitemap.xml'
    try:
        sitemap_res = requests.get(sitemap_url, timeout=5)
        if sitemap_res.status_code == 200:
            print("[PASS] sitemap.xml found.")
        else:
            print(f"[FAIL] sitemap.xml returned status {sitemap_res.status_code}.")
    except:
        print("[FAIL] Could not fetch sitemap.xml.")

    # 6. Schema Markup
    json_ld = soup.find_all('script', type='application/ld+json')
    if json_ld:
        print(f"[PASS] Found {len(json_ld)} JSON-LD structured data block(s).")
    else:
        print("[FAIL] No JSON-LD schema found.")

    print("-" * 50)
    print("Audit Complete.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python seo_audit.py <url>")
    else:
        audit_url(sys.argv[1])
