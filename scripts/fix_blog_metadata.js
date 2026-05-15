const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'app', 'blog');
const ARTICLES = [
  { slug: 'psychology-of-flow', title: 'In the Stream: Understanding the Psychology of Flow', desc: 'Explore the neurobiology of the "Flow" state—the optimal human experience where time vanishes and complex action becomes effortless.' },
  { slug: 'computational-thinking', title: 'Computational Thinking: Solving Problems Without a Screen', desc: 'Decomposition, pattern recognition, and abstraction—how to teach logic to kids using offline puzzles.' },
  { slug: 'the-mozart-effect', title: 'The Mozart Effect: Can Music Really Boost Brain Power?', desc: 'Investigating the science of auditory stimulation and its actual impact on spatial reasoning and focus.' },
  { slug: 'sleep-and-memory', title: 'Sleep and Memory: The Brain\'s Nighttime Maintenance', desc: 'How the hippocampus and cortex work together during REM and deep sleep to consolidate what you learned today.' },
  { slug: 'dual-coding-theory', title: 'Dual Coding Theory: Why Words and Visuals Work Better Together', desc: 'The cognitive science of combining verbal and visual information for superior long-term retention.' },
  { slug: 'cyberpsychology', title: 'Cyberpsychology: The Impact of Digital Spaces on Identity', desc: 'How social media architectures and virtual environments reshape our sense of self and community.' }
];

ARTICLES.forEach(art => {
    const pagePath = path.join(BLOG_DIR, art.slug, 'page.js');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        
        // 1. Remove 'use client'
        content = content.replace(/'use client';\n\n/, '').replace(/"use client";\n\n/, '');
        content = content.replace(/'use client';\n/, '').replace(/"use client";\n/, '');
        
        // 2. Add Metadata
        const metadata = `
export const metadata = {
  title: '${art.title} | VIBEMENOW Blog',
  description: '${art.desc}',
  alternates: {
    canonical: 'https://vibemenow.uk/blog/${art.slug}',
  },
};
`;
        
        // Inject before the first import
        content = metadata + '\n' + content;
        
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Converted to Server Component: ${art.slug}`);
    } else {
        console.warn(`File not found: ${pagePath}`);
    }
});

console.log('Blog metadata injection complete.');
