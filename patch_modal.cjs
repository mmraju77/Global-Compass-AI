const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `      {/* Global Notifications */}`;
const modalCode = `      {/* Concierge Modal */}
      <AnimatePresence>
        {isConciergeModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/30 max-w-md w-full rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Initiate Strategic Consultation</h2>
                <button 
                  onClick={() => setIsConciergeModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form 
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
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Notifications */}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, modalCode);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Modal patched");
} else {
  console.log("Target not found");
}
