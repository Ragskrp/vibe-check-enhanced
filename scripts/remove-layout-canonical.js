const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

function fixLayouts(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixLayouts(fullPath);
    } else if (file === 'layout.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('alternates: {') && content.includes('canonical:')) {
        // Regex to remove the alternates block containing canonical
        // We'll just remove the alternates property completely from layout files
        const newContent = content.replace(/,?[\s]*alternates:\s*\{\s*canonical:\s*['"`][^'"`]+['"`],?\s*\},?/g, '');
        fs.writeFileSync(fullPath, newContent);
        console.log(`Removed canonical from ${fullPath}`);
      }
    }
  }
}

fixLayouts(appDir);
