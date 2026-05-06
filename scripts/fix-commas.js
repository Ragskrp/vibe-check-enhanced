const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

function fixCommas(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixCommas(fullPath);
    } else if (file === 'layout.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix missing comma between a string/array end and an identifier in metadata
      // e.g. '...' \n openGraph -> '...',\n openGraph
      content = content.replace(/('|")(\s+)(openGraph|description|keywords|authors|creator|twitter|robots|manifest|url|title):/g, '$1,$2$3:');
      
      // Also check if an array ends ] \n openGraph
      content = content.replace(/\](\s+)(openGraph|description|keywords|authors|creator|twitter|robots|manifest|url|title):/g, '],$1$2:');
      
      // Also check if an object ends } \n openGraph
      content = content.replace(/\}(\s+)(openGraph|description|keywords|authors|creator|twitter|robots|manifest|url|title):/g, '},$1$2:');

      fs.writeFileSync(fullPath, content);
    }
  }
}

fixCommas(appDir);
console.log('Fixed commas');
