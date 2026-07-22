const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                    if (error) throw error;
                    
                    alert("Request Received. Our AI Concierge is currently analyzing your profile and eligibility parameters. An automated comprehensive report will be generated shortly.");
                    
                    setConciergeFullName("");`;

const replaceStr = `                    if (error) throw error;
                    
                    // Trigger backend email automation
                    try {
                      await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          email: conciergeEmail,
                          name: conciergeFullName
                        })
                      });
                    } catch (emailError) {
                      console.error("Email automation failed:", emailError);
                    }
                    
                    alert("Request Received. Our AI Concierge is currently analyzing your profile and eligibility parameters. An automated comprehensive report will be generated shortly.");
                    
                    setConciergeFullName("");`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/App.tsx', code);
  console.log("App.tsx patched successfully");
} else {
  console.log("Target string not found in App.tsx");
}
