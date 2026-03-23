const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        }
    });
    
    page.on('pageerror', error => {
        console.log('PAGE ERROR:', error.message);
    });
    
    try {
        await page.goto('http://localhost:3000/vibe-3d/suika');
        await page.waitForLoadState('networkidle', { timeout: 15000 });
        await new Promise(r => setTimeout(r, 2000));
        await page.click('body');
        await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
        console.log("Error:", e.message);
    }
    
    await browser.close();
})();
