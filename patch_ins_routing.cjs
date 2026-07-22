const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add selectedInsuranceProvider state
const targetState = `  const [isSubmittingIns, setIsSubmittingIns] = useState(false);`;
const newState = `  const [isSubmittingIns, setIsSubmittingIns] = useState(false);
  const [selectedInsuranceProvider, setSelectedInsuranceProvider] = useState('');`;

code = code.replace(targetState, newState);

// 2. Update Request Custom Quote button
const targetQuoteBtn = `<button 
                                  onClick={() => setIsInsuranceModalOpen(true)}
                                  className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Request Custom Quote
                                </button>`;

const newQuoteBtn = `<button 
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

code = code.replaceAll(targetQuoteBtn, newQuoteBtn);

// 3. Update the modal submit handler logic
const targetSubmitLogic = `                    // Affiliate Auto-Redirect
                    window.open('https://www.cignaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    
                    setInsFullName("");
                    setInsEmail("");
                    setInsAge("18-35");
                    setInsCoverage("Health & Medical");
                    setInsCountry("");
                    setIsInsuranceModalOpen(false);`;

const newSubmitLogic = `                    // Affiliate Auto-Redirect
                    if (selectedInsuranceProvider === 'Bupa') {
                      window.open('https://www.bupaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    } else {
                      window.open('https://www.cignaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    }
                    
                    setInsFullName("");
                    setInsEmail("");
                    setInsAge("18-35");
                    setInsCoverage("Health & Medical");
                    setInsCountry("");
                    setSelectedInsuranceProvider('');
                    setIsInsuranceModalOpen(false);`;

code = code.replace(targetSubmitLogic, newSubmitLogic);

fs.writeFileSync('src/App.tsx', code);
console.log("Routing patched successfully");
