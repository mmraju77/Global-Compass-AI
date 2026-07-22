const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
  '<title>Global Compass AI | Premium AI Fintech Solutions</title>',
  '<title>Global Compass AI | Turnkey Immigration & Premium Wealth Protection</title>'
);

code = code.replace(
  '<meta name="description" content="Global Compass AI - Leading AI-driven fintech solutions and digital architecture by M M RAJU." />',
  '<meta name="description" content="AI-driven concierge for high-net-worth individuals. Seamless global immigration, premium health coverage, and exclusive offshore placements." />\n    <meta name="keywords" content="global immigration, expat health insurance, wealth protection, Cigna expat, Bupa global, high net worth relocation" />'
);

code = code.replace(
  '<meta property="og:title" content="Global Compass AI | Premium AI Fintech Solutions" />',
  '<meta property="og:title" content="Global Compass AI | Turnkey Immigration & Premium Wealth Protection" />'
);

code = code.replace(
  '<meta property="og:description" content="Leading AI-driven fintech solutions and digital architecture by M M RAJU." />',
  '<meta property="og:description" content="AI-driven concierge for high-net-worth individuals." />'
);

fs.writeFileSync('index.html', code);
console.log("index.html patched");
