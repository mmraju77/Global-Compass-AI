const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const jobModalCode = `
      {/* Job Lead Modal */}
      <AnimatePresence>
        {isJobModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/30 max-w-md w-full rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Exclusive Headhunter Access</h2>
                <button 
                  onClick={() => setIsJobModalOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const supabase = getSupabase();
                  if (!supabase) {
                    alert("System error. Please try again later.");
                    return;
                  }
                  
                  setIsSubmittingJob(true);
                  try {
                    const { error } = await supabase.from('leads').insert([{ 
                      lead_type: 'Remote Job',
                      full_name: jobFullName, 
                      professional_title: jobTitle, 
                      corporate_email: jobEmail, 
                      linkedin_url: jobLinkedIn 
                    }]);
                    
                    if (error) throw error;
                    
                    try {
                      await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          email: jobEmail,
                          name: jobFullName
                        })
                      });
                    } catch (emailError) {
                      console.error("Email automation failed:", emailError);
                    }
                    
                    window.location.href = 'https://www.toptal.com/?aff_id=YOUR_FUTURE_ID_HERE';
                    
                    setJobFullName("");
                    setJobTitle("");
                    setJobEmail("");
                    setJobLinkedIn("");
                    setIsJobModalOpen(false);
                  } catch (err) {
                    console.error("Error inserting job lead request:", err);
                    alert("Error submitting request: " + (err.message || "Unknown error"));
                  } finally {
                    setIsSubmittingJob(false);
                  }
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-bold text-indigo-100 uppercase tracking-widest block mb-2">Full Name</label>
                  <input type="text" required value={jobFullName} onChange={(e) => setJobFullName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-bold text-indigo-100 uppercase tracking-widest block mb-2">Professional Title</label>
                  <input type="text" required value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-bold text-indigo-100 uppercase tracking-widest block mb-2">Corporate Email</label>
                  <input type="email" required value={jobEmail} onChange={(e) => setJobEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-bold text-indigo-100 uppercase tracking-widest block mb-2">LinkedIn Profile URL</label>
                  <input type="url" required value={jobLinkedIn} onChange={(e) => setJobLinkedIn(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmittingJob}
                  className="w-full mt-6 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#b08d29] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingJob ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    "SUBMIT & ACCESS ROLES"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
`;

if (!code.includes('Exclusive Headhunter Access')) {
    code = code.replace(
      "      {/* Global Notifications */}",
      jobModalCode + "\n\n      {/* Global Notifications */}"
    );
}

fs.writeFileSync('src/App.tsx', code);
console.log("Patched Job Modal successfully");
