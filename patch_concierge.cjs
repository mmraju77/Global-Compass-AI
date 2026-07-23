const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('isSubmittingConcierge')) {
  code = code.replace(
    'const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);',
    'const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);\n  const [isSubmittingConcierge, setIsSubmittingConcierge] = useState(false);'
  );
}

const targetSubmit = `              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const supabase = getSupabase();
                  if (!supabase) {
                    alert("System error. Please try again later.");
                    return;
                  }
                  
                  try {
                    const { error } = await supabase.from('consultation_requests').insert([{ 
                      full_name: conciergeFullName, 
                      professional_title: conciergeTitle, 
                      corporate_email: conciergeEmail, 
                      whatsapp_number: conciergeWhatsApp 
                    }]);
                    
                    if (error) throw error;
                    
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
                    
                    setConciergeFullName("");
                    setConciergeTitle("");
                    setConciergeEmail("");
                    setConciergeWhatsApp("");
                    setIsConciergeModalOpen(false);
                  } catch (err: any) {
                    console.error("Error inserting consultation request:", err);
                    alert("Error submitting request: " + (err.message || "Unknown error"));
                  }
                }} `;

const replaceSubmit = `              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const supabase = getSupabase();
                  if (!supabase) {
                    alert("System error. Please try again later.");
                    return;
                  }
                  
                  setIsSubmittingConcierge(true);
                  try {
                    const { error } = await supabase.from('consultation_requests').insert([{ 
                      full_name: conciergeFullName, 
                      professional_title: conciergeTitle, 
                      corporate_email: conciergeEmail, 
                      whatsapp_number: conciergeWhatsApp 
                    }]);
                    
                    if (error) throw error;
                    
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
                    
                    // Affiliate Auto-Redirect
                    window.open('https://www.henleyglobal.com/?aff_id=YOUR_FUTURE_ID_HERE', '_blank');
                    
                    setConciergeFullName("");
                    setConciergeTitle("");
                    setConciergeEmail("");
                    setConciergeWhatsApp("");
                    setIsConciergeModalOpen(false);
                  } catch (err: any) {
                    console.error("Error inserting consultation request:", err);
                    alert("Error submitting request: " + (err.message || "Unknown error"));
                  } finally {
                    setIsSubmittingConcierge(false);
                  }
                }} `;

code = code.replace(targetSubmit, replaceSubmit);

const targetButton = `                <button 
                  type="submit"
                  className="w-full mt-6 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#b08d29] transition-colors"
                >
                  Submit Request
                </button>`;

const replaceButton = `                <button 
                  type="submit"
                  disabled={isSubmittingConcierge}
                  className="w-full mt-6 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#b08d29] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingConcierge ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Redirecting to Premium Partner...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>`;

code = code.replace(targetButton, replaceButton);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched Concierge");
