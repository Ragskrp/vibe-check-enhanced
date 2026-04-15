const fs = require('fs');
const path = require('path');

const blogs = [
  'spacing-effect-memory',
  'socratic-method-discovery',
  'probabilistic-decisions',
  'philosophy-for-children',
  'metacognition-thinking',
  'logical-reasoning-logic',
  'executive-function-control',
  'cognitive-load-mastery',
  'aha-moment-science',
  'chess-visual-logic'
];

const blogPath = path.join(__dirname, 'app', 'blog');

blogs.forEach(folder => {
  const filePath = path.join(blogPath, folder, 'page.js');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import statement
    if (!content.includes('import BlogArt')) {
      content = content.replace(/(import .*? from 'lucide-react';)/, "$1\nimport BlogArt from '@/app/blog/components/BlogArt';");
    }

    // Replace the visual placeholder with <BlogArt type="folder" />
    // The placeholder is usually within <div style={{ width: '100%', height: 400 ... }}>
    const regex = /<div style={{ width: '100%', height: 400[\s\S]*?\[Visual:.*?\]<\/p>\s*<\/div>\s*<\/div>/i;
    content = content.replace(regex, `<div style={{ width: '100%', height: 400, position: 'relative' }}>\n             <BlogArt type="${folder}" />\n          </div>`);

    // Also remove the placeholder comment if present
    content = content.replace(/\{\/\* Placeholder for the generated image \*\/\}\s*/, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed ' + folder);
  }
});
