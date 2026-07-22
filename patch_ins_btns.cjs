const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetMatchBtn = `                    <button 
                      onClick={matchInsuranceProviders}
                      disabled={isAssessingIns}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isAssessingIns ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Curating Elite Partners...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          <span>Match Premium Providers</span>
                        </>
                      )}
                    </button>`;

const newMatchBtn = `                    <button 
                      onClick={() => {
                        setIsMatchingInsurance(true);
                        setTimeout(() => {
                          setIsMatchingInsurance(false);
                          matchInsuranceProviders();
                        }, 1500);
                      }}
                      disabled={isAssessingIns || isMatchingInsurance}
                      className={\`w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2 \${isMatchingInsurance ? 'animate-pulse' : ''}\`}
                    >
                      {isMatchingInsurance ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>ANALYZING GLOBAL PROVIDERS...</span>
                        </>
                      ) : isAssessingIns ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Curating Elite Partners...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          <span>Match Premium Providers</span>
                        </>
                      )}
                    </button>`;

code = code.replace(targetMatchBtn, newMatchBtn);

const targetQuoteBtn = `<button className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all">
                                  Request Custom Quote
                                </button>`;

const newQuoteBtn = `<button 
                                  onClick={() => setIsConciergeModalOpen(true)}
                                  className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Request Custom Quote
                                </button>`;

code = code.replaceAll(targetQuoteBtn, newQuoteBtn);

fs.writeFileSync('src/App.tsx', code);
console.log("Buttons patched");
