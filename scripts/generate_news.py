import os
import re
import json
import feedparser
from google import genai
from datetime import datetime
from slugify import slugify
import requests

# --- CONFIGURATION ---
RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://feeds.wired.com/wired/index",
    "https://www.engadget.com/rss.xml"
]
DATA_FILE = "app/tech-news/techNewsData.js"
ARTICLES_DIR = "app/tech-news"
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MAX_ARTICLES_PER_RUN = 5

# Initialize modern Google GenAI Client
client = genai.Client(api_key=GEMINI_API_KEY)

def list_available_models():
    print("--- AVAILABLE MODELS FOR THIS API KEY ---")
    try:
        # Modern SDK uses different method to list models
        for m in client.models.list():
            print(f"Model: {m.name}")
    except Exception as e:
        print(f"ERROR listing models: {e}")
    print("-----------------------------------------")

# List models at startup for diagnostics
list_available_models()

def get_existing_slugs():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
        # Find all slugs using regex
        slugs = re.findall(r"slug:\s*'([^']+)'", content)
        return set(slugs)

def generate_article_content(title, summary, source_url):
    prompt = f"""
    You are a tech journalist for 'VIBEMENOW', a cool, youth-focused tech blog.
    Write a 500-word blog post based on this news:
    Title: {title}
    Summary: {summary}
    Source: {source_url}

    Guidelines:
    - Tone: Engaging, slightly informal but expert, clear, and punchy. Use words like "wild", "huge", "beast", "scary but cool".
    - Structure: 
        - Intro paragraph (hook the reader).
        - 2-3 detailed body paragraphs with analysis (why this matters for the youth/future).
        - A 'Key Trends' bullet point list (3-4 points).
    - Format: Return a JSON object with these fields:
        title (catchy headline),
        excerpt (2-sentence summary),
        category (one of: AI, Hardware, Robotics, Startups, Cybersecurity, Digital Culture),
        readTime (e.g. '5 min read'),
        image (a relevant Unsplash keyword),
        content_html (the body text using <p>, <h2>, <ul>, <li> tags),
        sources (list of 2-3 source names)
    
    IMPORTANT: Return ONLY the JSON object. No extra text.
    """
    
    # Modern SDK model selection
    models_to_try = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite']
    
    for model_name in models_to_try:
        try:
            print(f"Attempting generation with {model_name}...")
            response = client.models.generate_content(
                model=model_name,
                contents=prompt
            )
            text = response.text.strip()
            
            # Clean up markdown code blocks if AI included them
            if text.startswith("```json"):
                text = text[7:-3].strip()
            elif text.startswith("```") and text.endswith("```"):
                lines = text.split('\n')
                if len(lines) > 2:
                    text = '\n'.join(lines[1:-1]).strip()
                    
            return json.loads(text)
        except Exception as e:
            print(f"Error generating with {model_name}: {e}")
            continue
                
    return None

def create_article_page(slug, data):
    # Pre-escape single quotes for metadata
    excerpt_escaped = data['excerpt'].replace("'", "\\'")
    title_escaped = data['title'].replace("'", "\\'")
    
    # Use a raw string for the template and replace placeholders
    # This avoids f-string escaping issues with JSX curly braces
    template = """import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';

export const metadata = {
  title: '[TITLE_ESCAPED] | Tech Pulse',
  description: '[EXCERPT_ESCAPED]',
  openGraph: {
    title: '[TITLE_ESCAPED]',
    description: '[EXCERPT_ESCAPED]',
    type: 'article',
    url: '/tech-news/[SLUG]',
  },
  alternates: {
    canonical: '/tech-news/[SLUG]',
  },
};

export default function GeneratedArticlePage() {
  return (
    <div className="page-container animate-fade-in">
      <nav style={{ marginBottom: 40 }}>
        <Link href="/tech-news" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> Back to Tech Pulse
        </Link>
      </nav>

      <article style={{ maxWidth: 800, margin: '0 auto' }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#00d4ff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}>
            <Zap size={16} /> [CATEGORY]
          </div>
          <h1 className="hero-title" style={{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}>
            [TITLE]
          </h1>
          <p className="hero-desc" style={{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}>
            [EXCERPT]
          </p>
        </header>

        <img 
          src={`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&q=[IMAGE_KEYWORD]`} 
          alt="[TITLE]" 
          style={{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)' }}
        />

        <section className="blog-content" style={{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}
          dangerouslySetInnerHTML={{ __html: `[CONTENT_HTML]` }}
        />

        <footer style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources & Citations</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}>
              [SOURCES_HTML]
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #b14aed)' }} />
             <div>
               <div style={{ fontWeight: 700, color: '#fff' }}>VIBEMENOW Editorial</div>
               <div style={{ color: '#888', fontSize: 13 }}>AI News Desk • [DATE]</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{`
        .blog-content p { margin-bottom: 24px; }
        .blog-content h2 { color: #fff; font-size: 28px; margin-top: 48px; margin-bottom: 20px; }
        .blog-content ul { padding-left: 20px; margin-bottom: 24px; list-style-type: disc; }
        .blog-content li { margin-bottom: 12px; }
      `}</style>
    </div>
  );
}
"""
    sources_html = ", ".join([f"<span>{s}</span>" for s in data['sources']])
    current_date = datetime.now().strftime('%B %d, %Y')
    
    final_content = template.replace("[TITLE_ESCAPED]", title_escaped)\
                           .replace("[EXCERPT_ESCAPED]", excerpt_escaped)\
                           .replace("[SLUG]", slug)\
                           .replace("[CATEGORY]", data['category'])\
                           .replace("[TITLE]", data['title'])\
                           .replace("[EXCERPT]", data['excerpt'])\
                           .replace("[IMAGE_KEYWORD]", data['image'])\
                           .replace("[CONTENT_HTML]", data['content_html'])\
                           .replace("[SOURCES_HTML]", sources_html)\
                           .replace("[DATE]", current_date)
    
    os.makedirs(f"{ARTICLES_DIR}/{slug}", exist_ok=True)
    with open(f"{ARTICLES_DIR}/{slug}/page.js", 'w', encoding='utf-8') as f:
        f.write(final_content)

def update_data_file(slug, data):
    title_escaped = data['title'].replace("'", "\\'")
    excerpt_escaped = data['excerpt'].replace("'", "\\'")
    
    new_article = f"""  {{
    slug: '{slug}',
    title: '{title_escaped}',
    excerpt: '{excerpt_escaped}',
    category: '{data['category']}',
    date: '{datetime.now().strftime('%B %d, %Y')}',
    readTime: '{data['readTime']}',
    image: 'https://source.unsplash.com/featured/?{data['image']}',
    featured: true,
  }},
"""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove existing featured: true flags to ensure only the latest is featured
    content = content.replace("featured: true,", "")
    content = content.replace("featured: true", "")
    
    # Insert at the beginning of ARTICLES array
    insertion_point = content.find("export const ARTICLES = [")
    if insertion_point != -1:
        array_start = content.find("[", insertion_point) + 1
        new_content = content[:array_start] + "\n" + new_article + content[array_start:]
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    print("--- Starting Tech News Generation ---")
    if not GEMINI_API_KEY:
        print("ERROR: GEMINI_API_KEY not found in environment variables.")
        return

    try:
        existing_slugs = get_existing_slugs()
        print(f"Found {len(existing_slugs)} existing articles.")
    except Exception as e:
        print(f"ERROR: Could not read existing slugs: {e}")
        return

    processed_count = 0

    for feed_url in RSS_FEEDS:
        if processed_count >= MAX_ARTICLES_PER_RUN:
            break
            
        print(f"Fetching feed: {feed_url}")
        try:
            feed = feedparser.parse(feed_url)
            print(f"Feed '{feed.feed.get('title', 'Unknown')}' has {len(feed.entries)} entries.")
        except Exception as e:
            print(f"ERROR: Failed to parse feed {feed_url}: {e}")
            continue
        
        for entry in feed.entries:
            if processed_count >= MAX_ARTICLES_PER_RUN:
                break
                
            title = entry.title
            slug = slugify(title)
            
            if slug in existing_slugs:
                print(f"Skipping (Already exists): {slug}")
                continue
                
            print(f"--- Generating: {title} ---")
            summary = entry.get("summary", title)
            article_data = generate_article_content(title, summary, entry.link)
            
            if article_data:
                try:
                    create_article_page(slug, article_data)
                    update_data_file(slug, article_data)
                    existing_slugs.add(slug)
                    processed_count += 1
                    print(f"SUCCESS: Created article and updated index for '{slug}'")
                except Exception as e:
                    print(f"ERROR: Failed to save article '{slug}': {e}")
            else:
                print(f"WARNING: Gemini failed to generate content for '{title}'")

    if processed_count == 0:
        print("Done. No new articles were found or generated today.")
    else:
        print(f"Done. Successfully generated {processed_count} new articles.")

if __name__ == "__main__":
    main()
