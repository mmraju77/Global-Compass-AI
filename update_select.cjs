const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetSelect = `                        {countries.map(c => (
                          <option key={\`profile-country-\${c.country_name}\`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                        ))}`;

const newSelect = `                        {availableCountries.length > 0 
                          ? availableCountries.map(name => (
                              <option key={\`profile-country-\${name}\`} value={name} className="bg-[#1a1a1a]">{name}</option>
                            ))
                          : countries.map(c => (
                              <option key={\`profile-country-\${c.country_name}\`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                            ))
                        }`;

code = code.replace(targetSelect, newSelect);
fs.writeFileSync('src/App.tsx', code);
console.log("Updated dropdown options");
