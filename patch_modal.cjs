const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add State
const targetState = `  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);`;
const newState = `  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);
  const [conciergeFullName, setConciergeFullName] = useState("");
  const [conciergeTitle, setConciergeTitle] = useState("");
  const [conciergeEmail, setConciergeEmail] = useState("");
  const [conciergeWhatsApp, setConciergeWhatsApp] = useState("");`;

code = code.replace(targetState, newState);

// 2. Replace Modal UI
const targetModal = `              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Request Received. Our AI Concierge is generating your secure profile...");
                  setIsConciergeModalOpen(false);
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Full Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Professional Title</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Corporate Email</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">WhatsApp / Contact Number</label>
                  <input type="tel" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <button 
                  type="submit"
                  className="w-full mt-6 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#b08d29] transition-colors"
                >
                  Submit Request
                </button>
              </form>`;

const newModal = `              <form 
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
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Full Name</label>
                  <input type="text" required value={conciergeFullName} onChange={(e) => setConciergeFullName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Professional Title</label>
                  <input type="text" required value={conciergeTitle} onChange={(e) => setConciergeTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Corporate Email</label>
                  <input type="email" required value={conciergeEmail} onChange={(e) => setConciergeEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">WhatsApp / Contact Number</label>
                  <input type="tel" required value={conciergeWhatsApp} onChange={(e) => setConciergeWhatsApp(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#d4af37] focus:outline-none transition-colors" />
                </div>
                <button 
                  type="submit"
                  className="w-full mt-6 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#b08d29] transition-colors"
                >
                  Submit Request
                </button>
              </form>`;

if (code.includes(targetModal)) {
  code = code.replace(targetModal, newModal);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Modal patched successfully");
} else {
  console.log("Target modal not found");
}
