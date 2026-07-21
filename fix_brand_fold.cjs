const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');
const lines = code.split('\n');

const idxAboutStart = lines.findIndex(l => l.includes('{/* About: Leadership Profile'));
let idxAboutEnd = -1;
for (let i = idxAboutStart; i < lines.length; i++) {
    if (lines[i].includes('</section>')) {
        idxAboutEnd = i;
        break;
    }
}

// Check if idxAboutStart is above idxRoutesEnd
const idxRoutesEnd = lines.findIndex(l => l.includes('</Routes>'));

if (idxAboutStart !== -1 && idxAboutStart < idxRoutesEnd) {
    const aboutSection = lines.slice(idxAboutStart, idxAboutEnd + 1);
    lines.splice(idxAboutStart, aboutSection.length);
    
    // Now idxRoutesEnd has shifted
    const newIdxRoutesEnd = lines.findIndex(l => l.includes('</Routes>'));
    
    // Insert after </Routes>
    lines.splice(newIdxRoutesEnd + 1, 0, ...aboutSection);
    
    fs.writeFileSync('src/App.tsx', lines.join('\n'));
    console.log("Moved About section outside Routes.");
} else {
    console.log("About section not found or already outside Routes.", idxAboutStart, idxRoutesEnd);
}
