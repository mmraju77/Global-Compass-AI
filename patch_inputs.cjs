const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The instruction: "Secondary Descriptions & Inputs: Use a soft blue-tinted white (text-blue-50 or text-slate-100)"
// I'll update text-white to text-slate-100 on inputs
code = code.replace(/<input([^>]*)text-white([^>]*)>/g, '<input$1text-slate-100$2>');
code = code.replace(/<textarea([^>]*)text-white([^>]*)>/g, '<textarea$1text-slate-100$2>');
code = code.replace(/<select([^>]*)text-white([^>]*)>/g, '<select$1text-slate-100$2>');

// Let's also check for any inputs that have text-slate-300 or text-indigo-100
code = code.replace(/<input([^>]*)text-indigo-100([^>]*)>/g, '<input$1text-slate-100$2>');
code = code.replace(/<textarea([^>]*)text-indigo-100([^>]*)>/g, '<textarea$1text-slate-100$2>');
code = code.replace(/<select([^>]*)text-indigo-100([^>]*)>/g, '<select$1text-slate-100$2>');

code = code.replace(/<input([^>]*)text-slate-300([^>]*)>/g, '<input$1text-slate-100$2>');
code = code.replace(/<textarea([^>]*)text-slate-300([^>]*)>/g, '<textarea$1text-slate-100$2>');
code = code.replace(/<select([^>]*)text-slate-300([^>]*)>/g, '<select$1text-slate-100$2>');

fs.writeFileSync('src/App.tsx', code);
console.log("Inputs patched");
