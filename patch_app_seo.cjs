const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetState = `  const [insCoverage, setInsCoverage] = useState("Health & Medical");`;
const newState = `  const [insCoverage, setInsCoverage] = useState("Health & Medical");

  // Dynamic SEO Hook
  useEffect(() => {
    if (isConciergeModalOpen) {
      document.title = "Apply for Consultation | Global Compass AI";
    } else if (isInsuranceModalOpen) {
      document.title = "Request Premium Quote | Global Compass AI";
    } else {
      document.title = "Global Compass AI | Turnkey Immigration & Premium Wealth Protection";
    }
  }, [isConciergeModalOpen, isInsuranceModalOpen]);`;

code = code.replace(targetState, newState);

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx patched for SEO");
