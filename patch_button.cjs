const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetButton = `<button 
                                  onClick={() => alert("Request Received. Our AI Concierge is currently analyzing your profile and eligibility parameters. An automated comprehensive report will be generated shortly.")}
                                  className="w-full bg-transparent border-2 border-brand-gold/50 hover:bg-brand-gold/10 py-4 rounded-xl text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Schedule Initial Consultation
                                </button>`;

const newButton = `<button 
                                  onClick={() => setIsConciergeModalOpen(true)}
                                  className="w-full bg-transparent border-2 border-brand-gold/50 hover:bg-brand-gold/10 py-4 rounded-xl text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Schedule Initial Consultation
                                </button>`;

if (code.includes(targetButton)) {
  code = code.replace(targetButton, newButton);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Button patched");
} else {
  console.log("Target button not found");
}
