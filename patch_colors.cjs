const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. antialiased -> subpixel-antialiased
code = code.replace(/antialiased/g, 'subpixel-antialiased');
// wait, if I run it again it might become subpixel-subpixel-antialiased
code = code.replace(/subpixel-subpixel-antialiased/g, 'subpixel-antialiased');

// 2. Remove font-light, font-thin
code = code.replace(/font-light/g, 'font-medium');
code = code.replace(/font-thin/g, 'font-normal');

// 3. Highlight Metrics to text-emerald-400
// AI Score: text-brand-gold text-3xl font-black">{aiResult.score}%
code = code.replace(
  'text-brand-gold text-3xl font-black">{aiResult.score}%',
  'text-emerald-400 text-3xl font-black">{aiResult.score}%'
);
// Table Growth: text-amber-600 font-mono font-bold opacity-80">{row.annual_growth}
code = code.replace(
  'text-amber-600 font-mono font-bold opacity-80">{row.annual_growth}',
  'text-emerald-400 font-mono font-bold">{row.annual_growth}'
);
// 99.9% uptime metric
code = code.replace(
  'text-3xl font-display font-bold text-white tracking-tight">99.9%',
  'text-3xl font-display font-bold text-emerald-400 tracking-tight">99.9%'
);

// 4. Update dull colors
// Tertiary (Labels & Subtext currently using text-slate-400, text-gray-400 etc) -> text-indigo-100 or text-slate-300
// But we want to differentiate Secondary and Tertiary.
// Let's just do a blanket upgrade for existing slate-400 to slate-300, and slate-300 to slate-100.
// Wait, the prompt asks for specific things:
// Secondary Descriptions & Inputs: text-blue-50 or text-slate-100
// Tertiary Labels & Subtext: text-slate-300 or text-indigo-100
// Let's find labels: <label className="... text-slate-400 ...">
code = code.replace(/<label([^>]*)text-slate-400/g, '<label$1text-indigo-100');
code = code.replace(/<label([^>]*)text-gray-400/g, '<label$1text-indigo-100');
code = code.replace(/<span([^>]*)text-slate-400/g, '<span$1text-indigo-100');
code = code.replace(/<span([^>]*)text-gray-400/g, '<span$1text-indigo-100');

// Inputs:
code = code.replace(/<input([^>]*)text-slate-400/g, '<input$1text-slate-100');
code = code.replace(/<textarea([^>]*)text-slate-400/g, '<textarea$1text-slate-100');
code = code.replace(/<select([^>]*)text-slate-400/g, '<select$1text-slate-100');

// Paragraphs (Secondary Descriptions):
code = code.replace(/<p([^>]*)text-slate-400/g, '<p$1text-slate-100');
code = code.replace(/<p([^>]*)text-gray-400/g, '<p$1text-slate-100');

// Remaining text-slate-400/text-gray-400 to text-slate-300
code = code.replace(/text-slate-400/g, 'text-slate-300');
code = code.replace(/text-gray-400/g, 'text-slate-300');

// Let's remove opacity on text. We'll just remove opacity-\d+ from any class string that contains text-
code = code.replace(/className="([^"]*?text-[^"]*?)\bopacity-\d+\b([^"]*)"/g, 'className="$1$2"');
// Do it multiple times in case there are multiple opacity classes (unlikely) or just leave it.

fs.writeFileSync('src/App.tsx', code);
console.log("Colors patched");
