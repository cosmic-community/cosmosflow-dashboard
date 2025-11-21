const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(process.cwd(), '.next');
const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(htmlContent) {
  // Check if script is already injected
  if (htmlContent.includes('dashboard-console-capture.js')) {
    return htmlContent;
  }
  
  // Inject before closing head tag
  return htmlContent.replace('</head>', `${SCRIPT_TAG}</head>`);
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = injectScript(content);
      fs.writeFileSync(filePath, content);
      console.log(`Injected script into: ${filePath}`);
    }
  });
}

console.log('Starting console capture script injection...');
processDirectory(BUILD_DIR);
console.log('Console capture script injection complete!');