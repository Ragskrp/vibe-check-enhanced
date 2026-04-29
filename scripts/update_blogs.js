const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const authorBlock = `
        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #00d4ff, #ff2d78)', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '16px' }}>Raghavendra Reddy</div>
            <div style={{ color: '#aaa', fontSize: '13px' }}>Founder, VIBEMENOW • Published: April 2026 • Last reviewed: April 2026</div>
            <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>Web developer and game design enthusiast with a focus on educational browser experiences.</div>
          </div>
        </div>
`;

const sourcesBlock = `
        <div style={{ marginTop: '64px', padding: '32px', borderRadius: '24px', background: 'rgba(0, 212, 255, 0.04)', border: '1px solid rgba(0, 212, 255, 0.1)' }}>
          <h3 style={{ color: '#00d4ff', fontSize: '20px', marginBottom: '16px' }}>Sources & Further Reading</h3>
          <ul style={{ paddingLeft: '20px', color: '#ccc', lineHeight: '1.8' }}>
            <li><a href="https://scholar.google.com/scholar?q=Mihaly+Csikszentmihalyi+Flow" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94', textDecoration: 'underline' }}>Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience.</a></li>
            <li><a href="https://www.nature.com/articles/nature12486" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94', textDecoration: 'underline' }}>Anguera, J. A., et al. (2013). Video game training enhances cognitive control in older adults (NeuroRacer). Nature.</a></li>
            <li><a href="https://pubmed.ncbi.nlm.nih.gov/12761568/" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff94', textDecoration: 'underline' }}>Green, C. S., & Bavelier, D. (2003). Action video game modifies visual selective attention. Nature.</a></li>
          </ul>
        </div>
`;

walkDir(path.join(__dirname, '..', 'app', 'blog'), (filePath) => {
  if (filePath.endsWith('page.js') && !filePath.includes('components') && filePath !== path.join(__dirname, '..', 'app', 'blog', 'page.js') && filePath !== path.join(__dirname, '..', 'app', 'blog', 'layout.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already modified
    if (content.includes('Raghavendra Reddy')) return;

    // Inject Author Block after </header>
    if (content.includes('</header>')) {
      content = content.replace('</header>', '</header>\n' + authorBlock);
    }

    // Inject Sources Block before <footer> or </article> or </section>
    if (content.includes('<footer')) {
      content = content.replace('<footer', sourcesBlock + '\n        <footer');
    } else if (content.includes('</article>')) {
      content = content.replace('</article>', sourcesBlock + '\n      </article>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
});
