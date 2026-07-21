const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');
const lines = code.split('\n');

const findLine = (str) => lines.findIndex(l => l.includes(str));

const idxCompareStart = findLine('<section id="compare"');
const idxCurrencyStart = findLine('{/* Global Currency Control Toolbar */}');
const idxCurrencyEnd = findLine('{/* 🧮 EXECUTIVE TAX & TAKE-HOME PAY CALCULATOR */}');
const idxCountryStart = findLine('{/* 🌐 COMPREHENSIVE COUNTRY PROFILE & RELOCATION GUIDE */}');
const idxCityStart = findLine('{/* 🏙️ COMPREHENSIVE CITY GUIDE & NEIGHBORHOOD PROFILES */}');
const idxSalaryStart = findLine('{/* 💰 COMPREHENSIVE GLOBAL SALARY DASHBOARD */}');
const idxSalaryEnd = findLine('{/* Headline */}');
const idxCompareEnd = findLine('</section>') // wait, we need the right one. The first </section> after idxCompareStart.
let idxCompEnd = -1;
for(let i = idxCompareStart; i < lines.length; i++) {
    if(lines[i].includes('</section>')) {
        idxCompEnd = i;
        break;
    }
}
const idxArchivesEnd = findLine('{/* About: Leadership Profile');

console.log({
    idxCompareStart,
    idxCurrencyStart,
    idxCurrencyEnd,
    idxCountryStart,
    idxCityStart,
    idxSalaryStart,
    idxSalaryEnd,
    idxCompEnd,
    idxArchivesEnd
});
