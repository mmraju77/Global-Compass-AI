const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetQuoteBtn = `<button 
                                  onClick={() => {
                                    if (partner.name.includes('Bupa')) {
                                      setSelectedInsuranceProvider('Bupa');
                                    } else {
                                      setSelectedInsuranceProvider('Cigna');
                                    }
                                    setIsInsuranceModalOpen(true);
                                  }}
                                  className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Request Custom Quote
                                </button>`;

const newQuoteBtn = `<button 
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

code = code.replaceAll(targetQuoteBtn, newQuoteBtn);

const targetSubmitLogic = `                    // Affiliate Auto-Redirect
                    if (selectedInsuranceProvider === 'Bupa') {
                      window.open('https://www.bupaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else {
                      window.open('https://www.cignaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    }`;

const newSubmitLogic = `                    // Affiliate Auto-Redirect
                    if (selectedInsuranceProvider === 'Bupa') {
                      window.open('https://www.bupaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else if (selectedInsuranceProvider === 'Allianz') {
                      window.open('https://www.allianz.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else if (selectedInsuranceProvider === 'SwissRe') {
                      window.open('https://www.swissre.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else if (selectedInsuranceProvider === 'AIA') {
                      window.open('https://www.aia.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else if (selectedInsuranceProvider === 'Chubb') {
                      window.open('https://www.chubb.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else if (selectedInsuranceProvider === 'AXA') {
                      window.open('https://www.axa.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else {
                      window.open('https://www.cignaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    }`;

code = code.replace(targetSubmitLogic, newSubmitLogic);

fs.writeFileSync('src/App.tsx', code);
console.log("Providers patched successfully");
