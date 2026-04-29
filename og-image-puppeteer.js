// og-image-puppeteer.js
// Node.js script to generate OG images using Puppeteer (headless Chrome)
// Usage: npm install puppeteer; node og-image-puppeteer.js

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const OUTPUT_DIR = path.join(__dirname, 'public', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

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

const htmlTemplate = (title, color) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      width: 1200px;
      height: 630px;
      margin: 0;
      background: #181c1f;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', 'Arial', sans-serif;
      position: relative;
    }
    .accent {
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 32px;
      background: ${color};
    }
    .title {
      color: ${color};
      font-size: 72px;
      font-weight: bold;
      text-align: center;
      text-shadow: 0 4px 32px ${color}99;
      margin-bottom: 24px;
    }
    .subtitle {
      color: #fff;
      font-size: 32px;
      font-weight: 600;
      text-align: center;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
  <div class="title">${title}</div>
  <div class="subtitle">VIBEMENOW</div>
  <div class="accent"></div>
</body>
</html>
`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  for (const p of pages) {
    const html = htmlTemplate(p.title, p.color);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const outPath = path.join(OUTPUT_DIR, p.file);
    await page.screenshot({ path: outPath });
    console.log('Created', outPath);
  }

  await browser.close();
})();
