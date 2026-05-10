import os
import re
import json
import feedparser
import google.generativeai as genai
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

# Initialize Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

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
    
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        # Clean up possible markdown code blocks
        if text.startswith("```json"):
            text = text[7:-3].strip()
        return json.loads(text)
    except Exception as e:
        print(f"Error generating content for {title}: {e}")
        return None

def create_article_page(slug, data):
    # Pre-escape single quotes for metadata to avoid SyntaxError in f-strings
    excerpt_escaped = data['excerpt'].replace("'", "\\'")
    title_escaped = data['title'].replace("'", "\\'")
    content_html = data['content_html']
    
    # Use existing template structure
    template = f"""import Link from 'next/link';
import {{ ArrowLeft, Zap }} from 'lucide-react';

export const metadata = {{
  title: '{title_escaped} | Tech Pulse',
  description: '{excerpt_escaped}',
  openGraph: {{
    title: '{title_escaped}',
    description: '{excerpt_escaped}',
    type: 'article',
    url: '/tech-news/{slug}',
  }},
  alternates: {{
    canonical: '/tech-news/{slug}',
  }},
}};

export default function GeneratedArticlePage() {{
  return (
    <div className="page-container animate-fade-in">
      <nav style={{{{ marginBottom: 40 }}}}>
        <Link href="/tech-news" className="nav-link" style={{{{ display: 'inline-flex', alignItems: 'center', gap: 8 }}}}>
          <ArrowLeft size={16} /> Back to Tech Pulse
        </Link>
      </nav>

      <article style={{{{ maxWidth: 800, margin: '0 auto' }}}}>
        <header style={{{{ marginBottom: 56 }}}}>
          <div style={{{{ display: 'flex', alignItems: 'center', gap: 12, color: '#00d4ff', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13 }}}}>
            <Zap size={16} /> {data['category']}
          </div>
          <h1 className="hero-title" style={{{{ fontSize: 'calc(32px + 2vw)', lineHeight: 1.1, marginBottom: 24 }}}}>
            {data['title']}
          </h1>
          <p className="hero-desc" style={{{{ fontSize: 20, color: '#aaa', lineHeight: 1.6 }}}}>
            {data['excerpt']}
          </p>
        </header>

        <img 
          src={`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&q={data['image']}`} 
          alt="{data['title']}" 
          style={{{{ width: '100%', borderRadius: 24, marginBottom: 40, border: '1px solid rgba(255,255,255,0.1)' }}}}>
        </img>

        <section className="blog-content" style={{{{ fontSize: 18, lineHeight: 1.8, color: '#ddd' }}}}
          dangerouslySetInnerHTML={{{{ __html: `{content_html}` }}}}
        />

        <footer style={{{{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}}}>
          <div style={{{{ marginBottom: 24 }}}}>
            <h4 style={{{{ color: '#fff', fontSize: 14, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}}}>Sources & Citations</h4>
            <div style={{{{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#888' }}}}>
              {", ".join([f"<span>{s}</span>" for s in data['sources']])}
            </div>
          </div>
          <div style={{{{ display: 'flex', alignItems: 'center', gap: 16 }}}}>
             <div style={{{{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #b14aed)' }}}} />
             <div>
               <div style={{{{ fontWeight: 700, color: '#fff' }}}}>VIBEMENOW Editorial</div>
               <div style={{{{ color: '#888', fontSize: 13 }}}}>AI News Desk • {datetime.now().strftime('%B %d, %Y')}</div>
             </div>
          </div>
        </footer>
      </article>

      <style>{{`
        .blog-content p {{ margin-bottom: 24px; }}
        .blog-content h2 {{ color: #fff; font-size: 28px; margin-top: 48px; margin-bottom: 20px; }}
        .blog-content ul {{ padding-left: 20px; margin-bottom: 24px; list-style-type: disc; }}
        .blog-content li {{ margin-bottom: 12px; }}
      `}}</style>
    </div>
  );
}}
"""
    os.makedirs(f"{ARTICLES_DIR}/{slug}", exist_ok=True)
    with open(f"{ARTICLES_DIR}/{slug}/page.js", 'w', encoding='utf-8') as f:
        f.write(template)

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
  }},
"""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Insert at the beginning of ARTICLES array
    insertion_point = content.find("export const ARTICLES = [")
    if insertion_point != -1:
        array_start = content.find("[", insertion_point) + 1
        new_content = content[:array_start] + "\n" + new_article + content[array_start:]
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    if not GEMINI_API_KEY:
        print("GEMINI_API_KEY not found in environment variables.")
        return

    existing_slugs = get_existing_slugs()
    processed_count = 0

    for feed_url in RSS_FEEDS:
        if processed_count >= MAX_ARTICLES_PER_RUN:
            break
            
        print(f"Fetching feed: {feed_url}")
        feed = feedparser.parse(feed_url)
        
        for entry in feed.entries:
            if processed_count >= MAX_ARTICLES_PER_RUN:
                break
                
            title = entry.title
            slug = slugify(title)
            
            if slug in existing_slugs:
                continue
                
            print(f"Generating article for: {title}")
            summary = entry.get("summary", title)
            article_data = generate_article_content(title, summary, entry.link)
            
            if article_data:
                create_article_page(slug, article_data)
                update_data_file(slug, article_data)
                existing_slugs.add(slug)
                processed_count += 1
                print(f"Successfully created: {slug}")

if __name__ == "__main__":
    main()
