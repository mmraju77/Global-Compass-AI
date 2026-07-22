const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetBtn = `<button 
                                  onClick={() => setIsConciergeModalOpen(true)}
                                  className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Request Custom Quote
                                </button>`;

const newBtn = `<button 
                                  onClick={() => setIsInsuranceModalOpen(true)}
                                  className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Request Custom Quote
                                </button>`;

code = code.replace(targetBtn, newBtn);
fs.writeFileSync('src/App.tsx', code);
console.log("Insurance button patched");
