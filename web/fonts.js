const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src', (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/<h1\s+className="([^"]*)"/g, (match, classes) => {
      if (!classes.includes('font-serif')) {
        return '<h1 className="font-serif ' + classes + '"';
      }
      return match;
    });

    content = content.replace(/<h2\s+className="([^"]*)"/g, (match, classes) => {
      if (!classes.includes('font-serif')) {
        return '<h2 className="font-serif ' + classes + '"';
      }
      return match;
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated: ' + filePath);
    }
  }
});
