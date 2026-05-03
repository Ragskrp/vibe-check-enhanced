// og-image-generator.js
// Node.js script to generate OG images for VIBEMENOW pages
// Usage: node og-image-generator.js

const fs = require('fs');
const path = require('path');
const { createCanvas, registerFont } = require('canvas');

// Register a font (adjust path if needed)
// registerFont(path.join(__dirname, 'fonts', 'Inter-Bold.ttf'), { family: 'Inter' });

const OUTPUT_DIR = path.join(__dirname, 'public', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

// List of OG image specs (add more as needed)
const pages = [
  { file: 'would-you-rather.png', title: 'Would You Rather', color: '#00e5a0' },
  { file: 'poll-party.png', title: 'Poll Party', color: '#00ff94' },
  { file: 'hot-takes.png', title: 'Hot Takes', color: '#ff2d78' },
  { file: 'vocab-match.png', title: 'Vocab Match', color: '#fbbf24' },
  { file: 'about.png', title: 'About VIBEMENOW', color: '#ff2d78' },
  { file: 'editorial-policy.png', title: 'Editorial Policy', color: '#00d4ff' },
  { file: 'community-guidelines.png', title: 'Community Guidelines', color: '#ffe600' },
  { file: 'publisher-information.png', title: 'Publisher Information', color: '#00d4ff' },
  { file: 'disclaimer.png', title: 'Disclaimer', color: '#ffe600' },
  { file: 'terms.png', title: 'Terms of Service', color: '#00d4ff' },
  // Add more as needed
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function drawOgImage({ title, color }) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#181c1f';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Accent bar
  ctx.fillStyle = color;
  ctx.fillRect(0, HEIGHT - 32, WIDTH, 32);

  // Title
  ctx.font = 'bold 72px "Arial"'; // Use Inter or Space Grotesk if available
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;
  ctx.fillText(title, WIDTH / 2, HEIGHT / 2);

  // Subtitle
  ctx.font = '32px "Arial"';
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#fff';
  ctx.fillText('VIBEMENOW', WIDTH / 2, HEIGHT / 2 + 80);

  return canvas;
}

pages.forEach(page => {
  const canvas = drawOgImage(page);
  const outPath = path.join(OUTPUT_DIR, page.file);
  const out = fs.createWriteStream(outPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('Created', outPath));
});
