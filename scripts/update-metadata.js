const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

function updateMetadata(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      updateMetadata(fullPath);
    } else if (file === 'page.js' || file === 'layout.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('export const metadata = {')) {
        // Calculate the route based on the directory path relative to /app
        let route = fullPath
          .replace(appDir, '')
          .replace(/[\\/](page|layout)\.js$/, '')
          .replace(/\\/g, '/');
        
        if (route === '') route = '/';
        
        // If it doesn't already have alternates.canonical
        if (!content.includes('alternates: {')) {
          content = content.replace(
            /export const metadata = \{([\s\S]*?)\};/,
            (match, p1) => {
              // Add alternates before the closing brace
              return `export const metadata = {${p1}  alternates: {\n    canonical: '${route}',\n  },\n};`;
            }
          );
          fs.writeFileSync(fullPath, content);
          console.log(`Updated ${fullPath} with canonical: ${route}`);
        }
      }
    }
  }
}

updateMetadata(appDir);
