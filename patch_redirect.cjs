const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                    } catch (emailError) {
                      console.error("Email automation failed:", emailError);
                    }
                    
                    alert("Request Received. Our AI Concierge is currently analyzing your profile and eligibility parameters. An automated comprehensive report will be generated shortly.");
                    
                    // Affiliate Auto-Redirect
                    window.open('https://www.henleyglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    
                    setConciergeFullName("");`;

const replaceStr = `                    } catch (emailError) {
                      console.error("Email automation failed:", emailError);
                    }
                    
                    // Affiliate Auto-Redirect
                    window.location.href = 'https://www.henleyglobal.com/?aff_id=YOUR_FUTURE_ID_HERE';
                    
                    setConciergeFullName("");`;

code = code.replace(targetStr, replaceStr);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched Concierge Redirect");
