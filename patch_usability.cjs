const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add antialiased and tracking-wide to outer containers
code = code.replace(
  '<div className="relative min-h-screen overflow-x-hidden selection:bg-brand-gold/20">',
  '<div className="relative min-h-screen overflow-x-hidden selection:bg-brand-gold/20 antialiased tracking-wide bg-[#0a0a0a] text-slate-200 font-sans">'
);

code = code.replace(
  '<div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-brand-gold/20 flex flex-col items-center justify-center p-4">',
  '<div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-brand-gold/20 flex flex-col items-center justify-center p-4 antialiased tracking-wide text-slate-200 font-sans">'
);

// 2. Eliminate all text-xs and ultra-small texts
code = code.replace(/text-xs/g, 'text-sm');
code = code.replace(/text-\[10px\]/g, 'text-sm');
code = code.replace(/text-\[11px\]/g, 'text-sm');
code = code.replace(/text-\[12px\]/g, 'text-sm');
code = code.replace(/text-\[9px\]/g, 'text-sm');
code = code.replace(/text-\[8px\]/g, 'text-sm');

// 3. Update color hierarchy (standardizing grays to slates)
// We'll replace text-gray-400 -> text-slate-400 (Tertiary)
// text-gray-300 -> text-slate-300 (Secondary)
code = code.replace(/text-gray-400/g, 'text-slate-400');
code = code.replace(/text-gray-300/g, 'text-slate-300');
code = code.replace(/text-zinc-500/g, 'text-slate-400');
code = code.replace(/text-zinc-400/g, 'text-slate-400');
code = code.replace(/text-slate-500/g, 'text-slate-400');

fs.writeFileSync('src/App.tsx', code);
console.log("Typography and Colors Patched");
