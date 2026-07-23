const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('isJobModalOpen')) {
  code = code.replace(
    'const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);',
    'const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);\n  const [isJobModalOpen, setIsJobModalOpen] = useState(false);\n  const [isSubmittingJob, setIsSubmittingJob] = useState(false);\n  const [jobFullName, setJobFullName] = useState("");\n  const [jobTitle, setJobTitle] = useState("");\n  const [jobEmail, setJobEmail] = useState("");\n  const [jobLinkedIn, setJobLinkedIn] = useState("");'
  );
}

fs.writeFileSync('src/App.tsx', code);
console.log("Patched Job States");
