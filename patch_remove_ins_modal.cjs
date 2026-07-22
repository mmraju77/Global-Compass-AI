const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexModal = /\{\/\* Insurance Modal \*\/\}[\s\S]*?\{\/\* Concierge Modal \*\/\}/g;
code = code.replace(regexModal, '{/* Concierge Modal */}');

// Also remove states from HomeDashboard
code = code.replace(/  const \[isInsuranceModalOpen, setIsInsuranceModalOpen\] = useState\(false\);\n/g, '');
code = code.replace(/  const \[insFullName, setInsFullName\] = useState\(""\);\n/g, '');
code = code.replace(/  const \[insEmail, setInsEmail\] = useState\(""\);\n/g, '');
code = code.replace(/  const \[insAge, setInsAge\] = useState\("18-35"\);\n/g, '');
code = code.replace(/  const \[insCountry, setInsCountry\] = useState\(""\);\n/g, '');
code = code.replace(/  const \[insCoverage, setInsCoverage\] = useState\("Health & Medical"\);\n/g, '');
code = code.replace(/  const \[isSubmittingIns, setIsSubmittingIns\] = useState\(false\);\n/g, '');
code = code.replace(/  const \[selectedInsuranceProvider, setSelectedInsuranceProvider\] = useState\(''\);\n/g, '');

// Update SEO Hook in HomeDashboard
const oldSeoHook = `  // Dynamic SEO Hook
  useEffect(() => {
    if (isConciergeModalOpen) {
      document.title = "Apply for Consultation | Global Compass AI";
    } else if (isInsuranceModalOpen) {
      document.title = "Request Premium Quote | Global Compass AI";
    } else {
      document.title = "Global Compass AI | Turnkey Immigration & Premium Wealth Protection";
    }
  }, [isConciergeModalOpen, isInsuranceModalOpen]);`;

const newSeoHook = `  // Dynamic SEO Hook
  useEffect(() => {
    if (isConciergeModalOpen) {
      document.title = "Apply for Consultation | Global Compass AI";
    } else {
      document.title = "Global Compass AI | Turnkey Immigration & Premium Wealth Protection";
    }
  }, [isConciergeModalOpen]);`;

code = code.replace(oldSeoHook, newSeoHook);

fs.writeFileSync('src/App.tsx', code);
console.log("Modal and states removed from HomeDashboard");
