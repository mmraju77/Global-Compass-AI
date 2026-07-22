const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetBtn = `<button 
                                  onClick={() => {
                                    if (partner.name.includes('Bupa')) {
                                      setSelectedInsuranceProvider('Bupa');
                                    } else if (partner.name.includes('Allianz')) {
                                      setSelectedInsuranceProvider('Allianz');
                                    } else if (partner.name.includes('Swiss Re')) {
                                      setSelectedInsuranceProvider('SwissRe');
                                    } else if (partner.name.includes('AIA')) {
                                      setSelectedInsuranceProvider('AIA');
                                    } else if (partner.name.includes('Chubb')) {
                                      setSelectedInsuranceProvider('Chubb');
                                    } else if (partner.name.includes('AXA')) {
                                      setSelectedInsuranceProvider('AXA');
                                    } else {
                                      setSelectedInsuranceProvider('Cigna');
                                    }
                                    setIsInsuranceModalOpen(true);
                                  }}
                                  className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Request Custom Quote
                                </button>`;

const newBtn = `<button 
                                  onClick={() => {
                                    if (partner.name.includes('Bupa')) {
                                      navigate('/insurance/bupa');
                                    } else if (partner.name.includes('Allianz')) {
                                      navigate('/insurance/allianz');
                                    } else if (partner.name.includes('Swiss Re')) {
                                      navigate('/insurance/swissre');
                                    } else if (partner.name.includes('AIA')) {
                                      navigate('/insurance/aia');
                                    } else if (partner.name.includes('Chubb')) {
                                      navigate('/insurance/chubb');
                                    } else if (partner.name.includes('AXA')) {
                                      navigate('/insurance/axa');
                                    } else {
                                      navigate('/insurance/cigna');
                                    }
                                  }}
                                  className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Request Custom Quote
                                </button>`;

code = code.replace(targetBtn, newBtn);
fs.writeFileSync('src/App.tsx', code);
console.log("Navigation buttons patched");
