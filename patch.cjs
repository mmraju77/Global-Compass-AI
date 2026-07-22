const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `<button className="w-full bg-transparent border-2 border-brand-gold/50 hover:bg-brand-gold/10 py-4 rounded-xl text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all">
                                  Schedule Initial Consultation
                                </button>`;

const replacement = `<button 
                                  onClick={() => alert("Request Received. Our AI Concierge is currently analyzing your profile and eligibility parameters. An automated comprehensive report will be generated shortly.")}
                                  className="w-full bg-transparent border-2 border-brand-gold/50 hover:bg-brand-gold/10 py-4 rounded-xl text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all"
                                >
                                  Schedule Initial Consultation
                                </button>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success!");
} else {
  console.log("Target not found!");
}
