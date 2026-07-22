const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace any opacity-\d+ or text-opacity-\d+ in classNames that have text-
// Since my previous regex might have missed things, let's just remove all opacity-\d+ and text-opacity-\d+
// wait, we shouldn't remove opacity from backgrounds or non-text elements!
// The instructions say "Remove ALL instances of font-light, font-thin, or opacity-* classes on text elements. These cause text to look blurred and dull. Force minimum weights to font-normal or font-medium."

// Let's use a function to process each className
code = code.replace(/className="([^"]+)"/g, (match, p1) => {
  if (p1.includes('text-')) {
    // It's a text element (or at least has a text color/size)
    // Remove opacity-\d+, text-white/50 (we can't easily parse /50, but opacity- is explicitly requested)
    let newClass = p1.replace(/\bopacity-\d+\b/g, '').replace(/\btext-opacity-\d+\b/g, '');
    // Ensure minimum font-weight. If it lacks font-bold, font-semibold, font-black, font-medium, we could add font-medium, but let's not force it if it's implicitly normal. The prompt says "Force minimum weights to font-normal or font-medium". I already replaced font-light with font-medium.
    // Let's also remove any /50 or /80 from text colors to eliminate dullness? "Replace dull grays with brighter lightly tinted colors".
    newClass = newClass.replace(/\btext-white\/\d+\b/g, 'text-slate-100');
    newClass = newClass.replace(/\btext-slate-400\/\d+\b/g, 'text-slate-100');
    
    // clean up multiple spaces
    newClass = newClass.replace(/\s+/g, ' ').trim();
    return `className="${newClass}"`;
  }
  return match;
});

fs.writeFileSync('src/App.tsx', code);
console.log("Opacity removed from text elements");
