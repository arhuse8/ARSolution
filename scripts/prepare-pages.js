import fs from 'fs';
import path from 'path';

// 1. Ensure dist directory exists
if (!fs.existsSync('dist')) {
  console.error('dist directory does not exist! Run vite build first.');
  process.exit(1);
}

// 2. Read dist/index.html and strip out root-to-docs redirect markers so docs/ bundle never self-redirects
let distHtml = fs.readFileSync('dist/index.html', 'utf8');
distHtml = distHtml.replace(/<!-- REDIRECT_TO_DOCS_START -->[\s\S]*?<!-- REDIRECT_TO_DOCS_END -->/g, '');
fs.writeFileSync('dist/index.html', distHtml);

// 3. Populate docs/ folder for GitHub Pages "Deploy from a branch -> /docs" option
fs.rmSync('docs', { recursive: true, force: true });
fs.cpSync('dist', 'docs', { recursive: true });

// 4. Populate root assets/ folder so if GitHub Pages is set to "Deploy from a branch -> / (root)", assets resolve immediately
fs.rmSync('assets', { recursive: true, force: true });
fs.cpSync('dist/assets', 'assets', { recursive: true });

// 5. Place .nojekyll in all relevant locations to disable GitHub Pages Jekyll processing
fs.writeFileSync('dist/.nojekyll', '');
fs.writeFileSync('docs/.nojekyll', '');
fs.writeFileSync('.nojekyll', '');

console.log('✅ GitHub Pages static distribution prepared:');
console.log('  - dist/ (for GitHub Actions)');
console.log('  - docs/ (for GitHub Pages /docs folder deployment)');
console.log('  - assets/ (for GitHub Pages root folder deployment)');
