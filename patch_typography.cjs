const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Footer targeted replacements first
code = code.replace(
  'text-white text-[10px] font-bold uppercase tracking-[0.4em]">Strict Global Regulatory',
  'text-white text-sm font-bold uppercase tracking-[0.4em]">Strict Global Regulatory'
);

code = code.replace(
  '<div className="grid md:grid-cols-2 gap-12 text-[10px] text-slate-500 leading-relaxed uppercase tracking-[0.06em] font-medium">',
  '<div className="grid md:grid-cols-2 gap-12 text-sm text-gray-400 leading-loose uppercase tracking-[0.06em] font-medium">'
);

// 2. Global Typography Upgrades
// Replace text-sm -> text-base
code = code.replace(/text-sm/g, 'text-base');
// Replace text-xs -> text-sm
code = code.replace(/text-xs/g, 'text-sm');
// Replace text-[10px] -> text-sm
code = code.replace(/text-\[10px\]/g, 'text-sm');
// Replace text-[9px] -> text-sm
code = code.replace(/text-\[9px\]/g, 'text-sm');
// Replace text-[8px] -> text-xs
code = code.replace(/text-\[8px\]/g, 'text-sm');

// 3. Brighten Text Colors (Contrast)
code = code.replace(/text-gray-500/g, 'text-gray-400');
code = code.replace(/text-gray-600/g, 'text-gray-300');
code = code.replace(/text-slate-500/g, 'text-gray-400');
code = code.replace(/text-slate-600/g, 'text-gray-300');
code = code.replace(/text-neutral-500/g, 'text-gray-400');
code = code.replace(/text-neutral-600/g, 'text-gray-300');
code = code.replace(/text-zinc-500/g, 'text-gray-400');
code = code.replace(/text-zinc-600/g, 'text-gray-300');

// 4. Brighten Accent Colors
code = code.replace(/text-amber-700/g, 'text-amber-500');
code = code.replace(/text-yellow-700/g, 'text-yellow-500');

fs.writeFileSync('src/App.tsx', code);
console.log("Typography patched successfully");
