const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '  return (\n    <BrowserRouter>\n    <div className="relative min-h-screen overflow-x-hidden selection:bg-brand-gold/20">',
  '  return (\n    <div className="relative min-h-screen overflow-x-hidden selection:bg-brand-gold/20">'
);

code = code.replace(
  '    </div>\n    </BrowserRouter>\n  );\n}\n\nfunction CompassIcon({ className }: { className?: string }) {',
  '    </div>\n  );\n}\n\nfunction CompassIcon({ className }: { className?: string }) {'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Removed BrowserRouter from HomeDashboard");
