const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');
const lines = code.split('\n');

const findLine = (str, from = 0) => lines.findIndex((l, i) => i >= from && l.includes(str));

const idxHeroStart = findLine('{/* Hero Section */}');
const idxCompareStart = findLine('<section id="compare"');
const idxCurrencyStart = findLine('{/* Global Currency Control Toolbar */}');
const idxCurrencyEnd = findLine('{/* 🧮 EXECUTIVE TAX & TAKE-HOME PAY CALCULATOR */}');
const idxCountryStart = findLine('{/* 🌐 COMPREHENSIVE COUNTRY PROFILE & RELOCATION GUIDE */}');
const idxCityStart = findLine('{/* 🏙️ COMPREHENSIVE CITY GUIDE & NEIGHBORHOOD PROFILES */}');
const idxSalaryStart = findLine('{/* 💰 COMPREHENSIVE GLOBAL SALARY DASHBOARD */}');
const idxSalaryEnd = findLine('{/* Headline */}');

let idxCompEnd = -1;
for(let i = idxCompareStart; i < lines.length; i++) {
    if(lines[i].includes('</section>')) {
        idxCompEnd = i;
        break;
    }
}

const idxJoinEnd = findLine('{/* Footer: Institutional Compliance */}');

// The elements we want to move:
// Currency Toolbar: idxCurrencyStart to idxCurrencyEnd - 1
const currencyToolbar = lines.slice(idxCurrencyStart, idxCurrencyEnd);

// Country Profile: idxCountryStart to idxCityStart - 1
const countryProfile = lines.slice(idxCountryStart, idxCityStart);

// City Guide: idxCityStart to idxSalaryStart - 1
const cityGuide = lines.slice(idxCityStart, idxSalaryStart);

// Salary Dashboard: idxSalaryStart to idxSalaryEnd - 1
const salaryDashboard = lines.slice(idxSalaryStart, idxSalaryEnd);

// Now we need to remove them from their original positions.
// We remove from bottom to top so indices don't change.

// Remove Country, City, Salary
lines.splice(idxCountryStart, idxSalaryEnd - idxCountryStart);

// Remove Currency Toolbar
// wait, since we already removed Country/City/Salary which were AFTER currency toolbar, 
// the indices for Currency Toolbar are still valid.
lines.splice(idxCurrencyStart, idxCurrencyEnd - idxCurrencyStart);

// Now we need to insert `<Routes>` stuff.
// We should put the Currency Toolbar right BEFORE `<Routes>`, outside of it.
// And `<Routes>` should wrap the Hero Section, Compare Section, and Join Section?
// Wait, the user said: "Wrap the main layout inside <BrowserRouter> and <Routes>."
// Let's put `<Routes>` right below the newly inserted Currency Toolbar.
// Actually, let's put the Currency Toolbar right above Hero Section.
// Or wait, they should remain visible on ALL pages. So above `<Routes>`.

// Let's insert the components at `idxHeroStart` (since we removed things, `idxHeroStart` is still valid).

const routesStart = [
  '        {/* Global Currency Control Toolbar (Visible on all pages) */}',
  '        <div className="container mx-auto px-6 py-6 mt-6">',
  ...currencyToolbar,
  '        </div>',
  '',
  '        <Routes>',
  '          <Route path="/country" element={<div className="container mx-auto px-6 py-10">' + countryProfile.join('\n') + '</div>} />',
  '          <Route path="/city" element={<div className="container mx-auto px-6 py-10">' + cityGuide.join('\n') + '</div>} />',
  '          <Route path="/salary" element={<div className="container mx-auto px-6 py-10">' + salaryDashboard.join('\n') + '</div>} />',
  '          <Route path="/" element={<>',
];

// Let's insert routesStart before Hero Section
lines.splice(idxHeroStart, 0, ...routesStart.join('\n').split('\n'));

// Now we need to close Route `/` and `Routes`. Where?
// After `idxJoinEnd`. Since we added `routesStart`, `idxJoinEnd` has shifted.
const newIdxJoinEnd = lines.findIndex(l => l.includes('{/* Footer: Institutional Compliance */}'));

const routesEnd = [
  '          </>} />',
  '        </Routes>'
];

lines.splice(newIdxJoinEnd, 0, ...routesEnd);

fs.writeFileSync('src/App.tsx', lines.join('\n'));
console.log("Restructuring complete.");
