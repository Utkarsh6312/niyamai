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
    let originalContent = content;

    // Identify standard cards: they usually have "bg-card border border-border rounded-[lg|xl|2xl] shadow-[sm|md]"
    // Or sometimes just "border border-border rounded-lg bg-secondary/30" or similar.
    // The user wants brutalist appearance for blocks/cards/containers.

    // Let's do a smart regex replacement for standard card class clusters:
    // Regex matches "bg-card border border-border" followed by spacing and then "rounded-..."
    content = content.replace(
      /bg-card border border-border([^"']*?)rounded-(?:lg|xl|2xl)([^"']*?)shadow-(?:sm|md|lg)/g,
      'bg-card border-[3px] border-black rounded-[2px] shadow-none$1$2'
    );
    
    // Also cover variations where shadow is before rounded
    content = content.replace(
      /bg-card border border-border([^"']*?)shadow-(?:sm|md|lg)([^"']*?)rounded-(?:lg|xl|2xl)/g,
      'bg-card border-[3px] border-black shadow-none$1rounded-[2px]$2'
    );

    // What if the card doesn't have bg-card?
    // E.g., action-center has: className="flex-1 border border-border rounded-lg p-3 bg-secondary/30"
    content = content.replace(
      /border border-border([^"']*?)rounded-(?:lg|xl|2xl)([^"']*?)bg-secondary\/30/g,
      'border-[3px] border-black rounded-[2px] shadow-none$1$2bg-secondary/30'
    );
    
    // Impact analysis inner cards:
    content = content.replace(
      /bg-card border border-border rounded-lg/g,
      'bg-card border-[3px] border-black rounded-[2px] shadow-none'
    );
    content = content.replace(
      /bg-card border border-border p-5 rounded-lg flex gap-4 shadow-sm/g,
      'bg-card border-[3px] border-black p-5 rounded-[2px] shadow-none flex gap-4'
    );

    // Some places use `border border-border p-4 rounded-lg flex flex-col shadow-sm`
    content = content.replace(
      /border border-border p-4 rounded-lg flex flex-col shadow-sm/g,
      'border-[3px] border-black p-4 rounded-[2px] flex flex-col shadow-none'
    );

    // Also impact analysis donut / bar chart cards:
    content = content.replace(
      /bg-card border border-border p-6 shadow-sm/g,
      'bg-card border-[3px] border-black p-6 rounded-[2px] shadow-none'
    );
    
    // Also policy-mapping cards
    content = content.replace(
      /bg-card border border-border rounded-xl/g,
      'bg-card border-[3px] border-black rounded-[2px] shadow-none'
    );

    // Let's also do regulatory trace inner cards:
    content = content.replace(
      /bg-card border border-border rounded-md/g,
      'bg-card border-[3px] border-black rounded-[2px] shadow-none'
    );

    // Let's avoid hitting dropdowns and inputs. Dropdowns have "appearance-none bg-card border border-border rounded-md pl-9 pr-8"
    // Wait, the above `rounded-md` replace might hit dropdowns! Let's revert the generic rounded-md replace
    content = content.replace(/appearance-none bg-card border-\[3px\] border-black rounded-\[2px\] shadow-none/g, 'appearance-none bg-card border border-border rounded-md');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log('Updated: ' + filePath);
    }
  }
});
