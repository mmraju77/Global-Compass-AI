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

console.log({
    idxHeroStart,
    idxCompareStart,
    idxCurrencyStart,
    idxCurrencyEnd,
    idxCountryStart,
    idxCityStart,
    idxSalaryStart,
    idxSalaryEnd,
    idxCompEnd,
    idxJoinEnd
});
