const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'onClick={fetchRemoteJobs}',
  'onClick={() => setIsJobModalOpen(true)}'
);

code = code.replace(
  /className="w-full mt-3 bg-transparent border border-brand-gold\/30 hover:bg-brand-gold\/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-\[0\.1em\] text-sm transition-all">\s*Apply via Headhunter\s*<\/button>/g,
  'className="w-full mt-3 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-sm transition-all" onClick={() => setIsJobModalOpen(true)}>\n                                  Apply via Headhunter\n                                </button>'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched Job Buttons fixed");
