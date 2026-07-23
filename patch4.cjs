const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/                           <\/div>\n                          <\/motion\.div>\n                        \)\n                      \)\}\n                    <\/AnimatePresence>/, 
`                           </div>
                          </motion.div>
                      )}
                    </AnimatePresence>`);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed end tags");
