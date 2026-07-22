const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `      {/* Concierge Modal */}`;

const insModal = `      {/* Insurance Modal */}
      <AnimatePresence>
        {isInsuranceModalOpen && (
          <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/30 max-w-md w-full rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Request Premium Global Insurance Quote</h2>
                <button 
                  onClick={() => setIsInsuranceModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
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
                  
                  try {
                    const { error } = await supabase.from('insurance_quotes').insert([{ 
                      full_name: insFullName, 
                      email: insEmail, 
                      age_group: insAge, 
                      coverage_type: insCoverage, 
                      target_country: insCountry 
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
                          email: insEmail,
                          name: insFullName
                        })
                      });
                    } catch (emailError) {
                      console.error("Email automation failed:", emailError);
                    }
                    
                    alert("Quote Request Received. Our premium partners (Cigna/Bupa) will contact you shortly.");
                    
                    setInsFullName("");
                    setInsEmail("");
                    setInsAge("18-35");
                    setInsCoverage("Health & Medical");
                    setInsCountry("");
                    setIsInsuranceModalOpen(false);
                  } catch (err: any) {
                    console.error("Error inserting insurance quote:", err);
                    alert("Error submitting request: " + (err.message || "Unknown error"));
                  }
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Full Name</label>
                  <input type="text" required value={insFullName} onChange={(e) => setInsFullName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Email Address</label>
                  <input type="email" required value={insEmail} onChange={(e) => setInsEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Age Group</label>
                  <select required value={insAge} onChange={(e) => setInsAge(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors appearance-none">
                    <option value="18-35" className="bg-[#1a1a1a]">18-35</option>
                    <option value="36-50" className="bg-[#1a1a1a]">36-50</option>
                    <option value="51-65" className="bg-[#1a1a1a]">51-65</option>
                    <option value="65+" className="bg-[#1a1a1a]">65+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Target Relocation Country</label>
                  <input type="text" required value={insCountry} onChange={(e) => setInsCountry(e.target.value)} placeholder="e.g. UAE, Singapore, Switzerland" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Desired Coverage Type</label>
                  <select required value={insCoverage} onChange={(e) => setInsCoverage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors appearance-none">
                    <option value="Health & Medical" className="bg-[#1a1a1a]">Health & Medical</option>
                    <option value="Wealth Protection" className="bg-[#1a1a1a]">Wealth Protection</option>
                    <option value="Comprehensive Executive" className="bg-[#1a1a1a]">Comprehensive Executive</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full mt-6 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#b08d29] transition-colors"
                >
                  Submit Quote Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Concierge Modal */}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, insModal);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Insurance modal added");
} else {
  console.log("Target not found");
}
