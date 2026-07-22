const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetState = `  const [isLoginOpen, setIsLoginOpen] = useState(false);`;
const newState = `  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);`;

code = code.replace(targetState, newState);
fs.writeFileSync('src/App.tsx', code);
console.log("State patched");
