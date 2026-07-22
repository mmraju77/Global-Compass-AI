const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');
const matches = code.match(/text-[a-zA-Z0-9\[\]-]+/g);
const counts = {};
if (matches) {
  matches.forEach(m => {
    counts[m] = (counts[m] || 0) + 1;
  });
  const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
  console.log(sorted.slice(0, 30));
}
