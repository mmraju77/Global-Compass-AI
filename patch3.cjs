const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\!immiResult\s*&&\s*\!isAssessingImmi\s*\?\s*\([\s\S]*?<\/[dD]iv>\s*\)\s*:\s*isAssessingImmi\s*\?\s*\(/;
code = code.replace(regex, '{isAssessingImmi ? (');

fs.writeFileSync('src/App.tsx', code);
console.log("Regex replaced");
