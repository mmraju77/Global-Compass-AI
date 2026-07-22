const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'import { BrowserRouter, Routes, Route, Link } from "react-router-dom";',
  'import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";'
);
fs.writeFileSync('src/App.tsx', code);
