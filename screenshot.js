const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:3000/vibe-3d/suika', { waitUntil: 'domcontentloaded' });
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({ path: path.join(__dirname, 'suika-debug.png') });
    } catch (e) {
        console.log("Error:", e.message);
    }
    
    await browser.close();
})();
