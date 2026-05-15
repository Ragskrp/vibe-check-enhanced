const fs = require('fs');
const path = require('path');

const NEWS_DIR = path.join(__dirname, '..', 'app', 'tech-news');
const DATA_FILE = path.join(__dirname, '..', 'app', 'tech-news', 'techNewsData.js');

// 1. Fix individual article pages
const folders = fs.readdirSync(NEWS_DIR).filter(f => fs.statSync(path.join(NEWS_DIR, f)).isDirectory());

folders.forEach(folder => {
    const pagePath = path.join(NEWS_DIR, folder, 'page.js');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        
        // Find the hardcoded Unsplash ID
        const hardcodedId = 'photo-1518770660439-4636190af475';
        if (content.includes(hardcodedId)) {
            console.log(`Fixing image in: ${folder}`);
            
            // Extract the keyword if possible, otherwise use a default
            const match = content.match(/q=([^`'"}]+)/);
            const keyword = match ? match[1] : folder.replace(/-/g, ' ');
            
            const newUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(keyword)}`;
            
            // Replace the entire src attribute pattern
            const regex = new RegExp(`https:\/\/images\.unsplash\.com\/${hardcodedId}[^"'}\`]+`, 'g');
            content = content.replace(regex, newUrl);
            
            fs.writeFileSync(pagePath, content, 'utf8');
        }
    }
});

// 2. Fix techNewsData.js
if (fs.existsSync(DATA_FILE)) {
    let dataContent = fs.readFileSync(DATA_FILE, 'utf8');
    if (dataContent.includes('source.unsplash.com/featured/?')) {
        // It might already have some good ones, but let's ensure they are clean
        // No specific fix needed if they are already using source.unsplash.com
        console.log('techNewsData.js already uses dynamic Unsplash URLs.');
    }
}

console.log('Batch image fix complete.');
