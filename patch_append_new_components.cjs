const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const newComponents = `

function InsurancePartnerPage() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  
  const [insFullName, setInsFullName] = useState("");
  const [insEmail, setInsEmail] = useState("");
  const [insAge, setInsAge] = useState("18-35");
  const [insCountry, setInsCountry] = useState("");
  const [insCoverage, setInsCoverage] = useState("Health & Medical");
  const [isSubmittingIns, setIsSubmittingIns] = useState(false);

  useEffect(() => {
    document.title = "Request Premium Quote | Global Compass AI";
    return () => {
      document.title = "Global Compass AI | Turnkey Immigration & Premium Wealth Protection";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-brand-gold/20 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-gold/5 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-amber-900/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-[#1a1a1a] border border-[#d4af37]/30 max-w-xl w-full rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Request Premium Global Insurance Quote</h2>
            <p className="text-amber-500/80 text-xs font-bold uppercase tracking-[0.2em] mt-2">Partner: {partnerId?.toUpperCase()}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmittingIns(true);
            const supabase = getSupabase();
            if (!supabase) {
              alert("System error. Please try again later.");
              setIsSubmittingIns(false);
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
              
              const affiliateLinks: Record<string, string> = {
                'bupa': 'https://www.bupaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE',
                'allianz': 'https://www.allianz.com/?aff_id=YOUR_FUTURE_ID_HERE',
                'swissre': 'https://www.swissre.com/?aff_id=YOUR_FUTURE_ID_HERE',
                'aia': 'https://www.aia.com/?aff_id=YOUR_FUTURE_ID_HERE',
                'chubb': 'https://www.chubb.com/?aff_id=YOUR_FUTURE_ID_HERE',
                'axa': 'https://www.axa.com/?aff_id=YOUR_FUTURE_ID_HERE',
                'cigna': 'https://www.cignaglobal.com/?aff_id=YOUR_FUTURE_ID_HERE'
              };

              const link = affiliateLinks[partnerId?.toLowerCase() || ''] || affiliateLinks['cigna'];
              window.open(link, '_blank');
              
              setInsFullName("");
              setInsEmail("");
              setInsAge("18-35");
              setInsCoverage("Health & Medical");
              setInsCountry("");
              navigate('/');
            } catch (err: any) {
              console.error("Error inserting insurance quote:", err);
              alert("Error submitting request: " + (err.message || "Unknown error"));
            } finally {
              setIsSubmittingIns(false);
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
            disabled={isSubmittingIns}
            className="w-full mt-6 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#b08d29] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmittingIns ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirecting to Premium Partner...
              </>
            ) : (
              "Submit Quote Request"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/insurance/:partnerId" element={<InsurancePartnerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
`;

code += newComponents;
fs.writeFileSync('src/App.tsx', code);
console.log("Appended new components");
