const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/                          <\/motion\.div>\n                      \)\}/g, `                          </motion.div>\n                        )\n                      )}`);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed parens");
