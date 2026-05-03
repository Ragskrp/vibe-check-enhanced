const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

function fixMetadata(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixMetadata(fullPath);
    } else if (file === 'page.js' || file === 'layout.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('export const metadata = {')) {
        let route = fullPath
          .replace(appDir, '')
          .replace(/[\\/](page|layout)\.js$/, '')
          .replace(/\\/g, '/');
        if (route === '') route = '/';

        // 1. Remove existing alternates block if it was broken (no preceding comma)
        // This is tricky. Let's just fix the missing comma and add alternates if missing.

        // Pattern to find metadata object content
        const metadataRegex = /export const metadata = \{([\s\S]*?)\};/;
        content = content.replace(metadataRegex, (match, p1) => {
          let inner = p1.trim();
          
          // If alternates is already there
          if (inner.includes('alternates: {')) {
            // Check if there is a comma before it
            if (!inner.match(/,\s*alternates: \{/)) {
               // Fix missing comma
               inner = inner.replace(/(\n|\s|})alternates: \{/, '$1, alternates: {');
            }
          } else {
            // Add if missing
            if (!inner.endsWith(',')) inner += ',';
            inner += `\n  alternates: {\n    canonical: '${route}',\n  },\n`;
          }
          
          return `export const metadata = {\n  ${inner}\n};`;
        });
        
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed/Updated ${fullPath}`);
      }
    }
  }
}

fixMetadata(appDir);
