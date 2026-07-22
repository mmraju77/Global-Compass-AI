const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetState = `  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);`;
const newState = `  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);
  const [isMatchingInsurance, setIsMatchingInsurance] = useState(false);`;

code = code.replace(targetState, newState);
fs.writeFileSync('src/App.tsx', code);
console.log("State patched");
