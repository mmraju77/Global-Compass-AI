const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '<Route path="/" element={<HomeDashboard />} />',
  '<Route path="/*" element={<HomeDashboard />} />'
);

fs.writeFileSync('src/App.tsx', code);
