const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetState = `  const [conciergeWhatsApp, setConciergeWhatsApp] = useState("");`;
const newState = `  const [conciergeWhatsApp, setConciergeWhatsApp] = useState("");
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [insFullName, setInsFullName] = useState("");
  const [insEmail, setInsEmail] = useState("");
  const [insAge, setInsAge] = useState("18-35");
  const [insCountry, setInsCountry] = useState("");
  const [insCoverage, setInsCoverage] = useState("Health & Medical");`;

code = code.replace(targetState, newState);
fs.writeFileSync('src/App.tsx', code);
console.log("Insurance state patched");
