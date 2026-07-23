const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add state hook
if (!code.includes('const [conciergeTier, setConciergeTier]')) {
  code = code.replace(
    'const [immiTier, setImmiTier] = useState<string>("Standard Application Assist");',
    'const [immiTier, setImmiTier] = useState<string>("Standard Application Assist");\n  const [conciergeTier, setConciergeTier] = useState("Standard Application Assist");'
  );
}

// 2. Add Data Mapping Logic
const mappingLogic = `
  const conciergeData: Record<string, {probability: string, deliverables: string[]}> = {
    "Standard Application Assist": {
      probability: "82% High Probability",
      deliverables: ["Initial Eligibility Audit", "Document Checklist Preparation", "Standard Embassy Booking", "Application Review before Submission"]
    },
    "VIP Fast-Track Processing": {
      probability: "92% Expedited Probability",
      deliverables: ["Priority Embassy Processing Slots", "Dedicated Senior Case Manager", "Document Translation & Legal Notarization", "VIP Application Review & Compliance"]
    },
    "Ultra-Luxury Family Relocation (End-to-End)": {
      probability: "98% Near-Guaranteed Probability",
      deliverables: ["Elite Tax & Immigration Counsel Team", "VIP Airport Fast-Track & Chauffeur", "Private School Placement for Dependents", "Turnkey Real Estate & Bank Setup", "Full Concierge Relocation Logistics"]
    }
  };
  const currentConcierge = conciergeData[conciergeTier];
`;

if (!code.includes('const conciergeData')) {
  // Before the main return: line ~ 1781
  code = code.replace(
    /(\s*)(return \(\s*<div className="relative min-h-screen overflow-x-hidden)/,
    `$1${mappingLogic}$1$2`
  );
}

// 3. Update the UI Components
// Select
code = code.replace(
  /value=\{immiTier\}\s*onChange=\{\(e\) => \{\s*const val = e\.target\.value;\s*startTransition\(\(\) => setImmiTier\(val\)\);\s*\}\}/,
  `value={conciergeTier}
                          onChange={(e) => {
                            setConciergeTier(e.target.value);
                            startTransition(() => setImmiTier(e.target.value));
                          }}`
);

// Results
code = code.replace(/immiResult\.probability/g, 'currentConcierge.probability');
code = code.replace(/immiResult\.deliverables/g, 'currentConcierge.deliverables');

fs.writeFileSync('src/App.tsx', code);
console.log("Patched correctly");
