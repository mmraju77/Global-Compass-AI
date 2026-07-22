const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace('export default function App() {', 'function HomeDashboard() {\n  const navigate = useNavigate();');

fs.writeFileSync('src/App.tsx', code);
console.log("Renamed App to HomeDashboard");
