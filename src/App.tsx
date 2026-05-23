/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Globe, Shield, TrendingUp, Users, Cpu, FileText, ChevronRight, Loader2, X, DollarSign, Percent } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const MOCK_DATA: CountryData[] = [
  { country_name: "United States", annual_growth: "+4.2%", stability_score: "High", compass_index: 92, strategic_status: "Optimal" },
  { country_name: "Singapore", annual_growth: "+3.8%", stability_score: "Very High", compass_index: 95, strategic_status: "Premium" },
  { country_name: "UAE", annual_growth: "+5.1%", stability_score: "High", compass_index: 88, strategic_status: "Emerging" },
  { country_name: "Switzerland", annual_growth: "+2.4%", stability_score: "Maximum", compass_index: 97, strategic_status: "Stable" },
  { country_name: "India", annual_growth: "+7.2%", stability_score: "Moderate", compass_index: 78, strategic_status: "High Potential" },
];

// Lazy initialization of Supabase client
let supabaseClient: any = null;
function getSupabase() {
  if (!supabaseClient) {
    const url = "https://jigsefbiflmmzzkjkmgb.supabase.co";
    const key = "sb_publishable_qO3SvpC8E-pD8yak-pvpVA_t6Ii4ggq";
    
    try {
      supabaseClient = createClient(url, key);
    } catch (e) {
      return null;
    }
  }
  return supabaseClient;
}

interface CountryData {
  country_name: string;
  annual_growth: string;
  stability_score: string;
  compass_index: number;
  strategic_status: string;
  average_salary_usd?: number;
  tax_rate_percent?: number;
}

export default function App() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const particles = Array.from({ length: 30 });

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true);
        const supabase = getSupabase();
        
        if (!supabase) {
          setCountries(MOCK_DATA);
          setIsLive(false);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('countries')
          .select('*')
          .order('compass_index', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setCountries(data);
          setIsLive(true);
        } else {
          setCountries(MOCK_DATA);
          setIsLive(false);
        }
      } catch (err: any) {
        console.warn("Supabase fetch failed, falling back to neural simulations:", err.message);
        setCountries(MOCK_DATA);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  const handleDownloadReport = (country: CountryData) => {
    const reportContent = `
GLOBAL COMPASS AI - STRATEGIC INTELLIGENCE REPORT
--------------------------------------------------
DATE: ${new Date().toLocaleDateString()}
COUNTRY: ${country.country_name}
STRATEGIC STATUS: ${country.strategic_status}
--------------------------------------------------

METRICS:
- Compass Index: ${country.compass_index}/100
- Annual GDP Growth: ${country.annual_growth}
- Stability Score: ${country.stability_score}
- Average Salary: ${formatCurrency(country.average_salary_usd)}
- Personal Tax Rate: ${country.tax_rate_percent !== undefined ? `${country.tax_rate_percent}%` : 'N/A'}

ANALYSIS:
This report confirms ${country.country_name} as a ${country.strategic_status.toLowerCase()} zone 
for strategic growth. Our neural engine indicates a ${country.compass_index >= 90 ? 'prime' : 'stable'} 
window for resource allocation.

--------------------------------------------------
CONFIDENTIAL - GLOBAL COMPASS LABS
    `.trim();

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${country.country_name.replace(/\s+/g, '_')}_Intelligence_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return "N/A";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-brand-gold/20">
      {/* Dynamic Background Particles */}
      <div className="particles">
        {particles.map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
              opacity: Math.random() * 0.5,
              transform: `scale(${Math.random() * 1.5})`,
            }}
          />
        ))}
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-terracotta-start/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Global Compass AI Logo" className="w-12 h-12 object-contain rounded-xl shadow-xl shadow-brand-gold/20 bg-gradient-to-br from-brand-gold/20 to-terracotta-end/20 p-2 border border-brand-gold/30" />
            <span className="font-display text-2xl font-bold tracking-tight">GLOBAL COMPASS AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#compare" className="hover:text-white transition-colors">Jurisdictions</a>
            <button className="px-5 py-2 rounded-full border border-white/10 hover:border-brand-gold/50 hover:text-white transition-all">
              Login
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold tracking-widest uppercase mb-6">
              <Cpu className="w-3 h-3" /> AI-Powered Strategic Intelligence
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Navigate the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-terracotta-start">
                Global Wealth & Growth
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Global Compass AI translates complex economic shifts into actionable intelligence. 
              Secure your assets and optimize growth across the world's most stable jurisdictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-terracotta-start to-terracotta-end text-white font-bold rounded-xl shadow-2xl shadow-terracotta-start/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                JOIN FREE & BEGIN YOUR GROWTH PATH
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all font-medium">
                View Performance
              </button>
            </div>
          </motion.div>
        </header>

        {/* Comparison Section */}
        <section id="compare" className="py-24 bg-black/40 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-xl">
                <h2 className="font-display text-4xl font-bold mb-4">Strategic Jurisdictions</h2>
                <p className="text-white/50 text-lg">
                  Real-time comparison of premium growth corridors analyzed by our native AI engine.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 ${isLive ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-brand-gold'}`} />
                  {isLive ? 'Neural Live Engine' : 'Neural Simulation Mode'}
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm">Update: May 2026</div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-brand-midnight/50 backdrop-blur-xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs font-bold uppercase tracking-widest">
                    <th className="px-8 py-6">Region</th>
                    <th className="px-8 py-6">Annual Growth</th>
                    <th className="px-8 py-6">Stability Score</th>
                    <th className="px-8 py-6">Compass Index</th>
                    <th className="px-8 py-6">Strategic Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
                          <span className="text-white/40 text-sm animate-pulse">Connecting to Supabase Neural Engine...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    countries.map((row) => (
                      <tr 
                        key={row.country_name} 
                        onClick={() => setSelectedCountry(row)}
                        className="hover:bg-white/[0.04] cursor-pointer transition-all duration-300 group border-l-2 border-transparent hover:border-brand-gold"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="font-medium text-lg text-white/90">{row.country_name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-brand-gold font-mono">{row.annual_growth}</td>
                        <td className="px-8 py-6 text-white/70">{row.stability_score}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden w-24">
                              <div className="h-full bg-brand-gold" style={{ width: `${row.compass_index}%` }} />
                            </div>
                            <span className="text-xs font-bold">{row.compass_index}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold">
                            {row.strategic_status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Leadership Profile */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 px-4">
              <h2 className="text-brand-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Leadership Intelligence</h2>
              <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight">The Architect of Global Strategy</h3>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto rounded-[2.5rem] p-1 bg-gradient-to-br from-brand-gold/30 via-transparent to-terracotta-start/30 shadow-2xl shadow-brand-gold/5"
            >
              <div className="bg-brand-midnight/90 backdrop-blur-3xl rounded-[calc(2.5rem-4px)] p-8 md:p-16 border border-white/5 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                <div className="relative group">
                  <div className="absolute inset-0 bg-brand-gold rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="w-48 h-48 rounded-full border-2 border-brand-gold p-1 shadow-2xl shadow-brand-gold/30 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                    <img 
                      src="/founder.jpg.jpeg" 
                      alt="mm Raju - Founder Photo" 
                      className="w-full h-full rounded-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-brand-gold text-brand-midnight p-2.5 rounded-full shadow-lg border-4 border-brand-midnight">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Chief AI Architect</div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">Munchangi Matyaraju <span className="text-brand-gold/80 block md:inline mt-2 md:mt-0">(mm Raju)</span></h3>
                  <div className="space-y-4 text-white/50 text-lg leading-relaxed mb-8 font-light max-w-sm mx-auto md:mx-0">
                    <p className="italic">
                      "Visionary behind Global Compass AI, focused on strategic global intelligence and neural economic forecasting."
                    </p>
                    <p className="text-sm not-italic opacity-70">
                      Pioneering the integration of quantitative models to navigate the future of global wealth with mathematical precision.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <button className="px-8 py-3 rounded-xl bg-brand-gold text-brand-midnight text-xs font-bold hover:bg-white transition-all shadow-lg shadow-brand-gold/20 active:scale-95">CONNECT VIA LINKEDIN</button>
                    <button className="px-8 py-3 rounded-xl border border-white/10 text-white/40 text-xs font-bold hover:border-white/20 hover:text-white transition-all">VIEW STRATEGIC BIO</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Section Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        </section>

        {/* Footer */}
        <footer className="pt-24 pb-12 border-t border-white/5 bg-black/60">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center">
                    <CompassIcon className="text-brand-midnight w-5 h-5" />
                  </div>
                  <span className="font-display text-xl font-bold tracking-tight">GLOBAL COMPASS AI</span>
                </div>
                <p className="text-white/40 max-w-sm mb-8">
                  The world's premier neural-intelligence platform for strategic wealth relocation 
                  and global economic navigation.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6">Solutions</h4>
                <ul className="space-y-4 text-white/40 text-sm">
                  <li><a href="#" className="hover:text-brand-gold">Wealth Migration</a></li>
                  <li><a href="#" className="hover:text-brand-gold">Jurisdiction Audits</a></li>
                  <li><a href="#" className="hover:text-brand-gold">AI Portfolio Guard</a></li>
                  <li><a href="#" className="hover:text-brand-gold">Global Concierge</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-white/40 text-sm">
                  <li><a href="#" className="hover:text-brand-gold">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-brand-gold">Security Standards</a></li>
                  <li><a href="#" className="hover:text-brand-gold">Press Room</a></li>
                  <li><a href="#" className="hover:text-brand-gold">Global Status</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <div className="flex flex-col gap-8">
                {/* Strict Regulatory Disclaimer */}
                <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <h5 className="font-bold text-xs uppercase tracking-widest text-white/60">Regulatory & Financial Disclaimer</h5>
                  </div>
                  <div className="space-y-4 text-[11px] text-white/30 leading-relaxed uppercase">
                    <p>
                      GLOBAL COMPASS AI (THE "PLATFORM") PROVIDES STRATEGIC DATA ANALYSIS AND AI-GENERATED INSIGHTS FOR INFORMATIONAL PURPOSES ONLY. THE CONTENTS DO NOT CONSTITUTE FINANCIAL, INVESTMENT, TAX, OR LEGAL ADVICE. USERS SHOULD CONSULT WITH PROFESSIONAL ADVISORS BEFORE MAKING ANY FINANCIAL DECISIONS OR CROSS-BORDER ASSET TRANSFERS. 
                    </p>
                    <p>
                      PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS. JURISDICTION ANALYSIS AND GROWTH FORECASTS ARE SUBJECT TO MARKET VOLATILITY, GEOPOLITICAL SHIFTS, AND REGULATORY CHANGES IN GLOBAL TERRITORIES. THE PLATFORM DISCLAIMS ALL LIABILITY FOR ANY FINANCIAL LOSSES OR REGULATORY MISSTEPS ARISING FROM THE USE OF ITS DATA. 
                    </p>
                    <p>
                      CERTAIN SERVICES MAY NOT BE AVAILABLE IN ALL JURISDICTIONS DUE TO LOCAL FINANCIAL REGULATIONS (INCLUDING BUT NOT LIMITED TO SEC, FCA, AND ESMA DIRECTIVES). BY USING THIS PLATFORM, YOU ACKNOWLEDGE AND ACCEPT THE RISKS INHERENT IN GLOBAL ASSET MANAGEMENT.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
                  <p>© 2026 Global Compass AI. All Strategic Rights Reserved.</p>
                  <p>Design by Global Compass Labs • mm Raju Signature Series</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Country Insights Modal */}
      <AnimatePresence>
        {selectedCountry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCountry(null)}
              className="absolute inset-0 bg-brand-midnight/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-midnight border border-brand-gold/20 rounded-3xl overflow-hidden shadow-2xl shadow-black"
            >
              {/* Modal Background Particles */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta-start/10 blur-[80px]" />
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedCountry(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center border border-brand-gold/20">
                    <Globe className="text-brand-gold w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase">Intelligence Report</div>
                    <h3 className="text-3xl font-display font-bold text-white">{selectedCountry.country_name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                      <DollarSign className="w-3 h-3 text-brand-gold" /> Average Salary
                    </div>
                    <div className="text-3xl font-display font-bold text-white">
                      {formatCurrency(selectedCountry.average_salary_usd)}
                    </div>
                    <div className="text-[10px] text-white/30 italic">Per annum estimation (USD)</div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                      <Percent className="w-3 h-3 text-brand-gold" /> Personal Tax Rate
                    </div>
                    <div className="text-3xl font-display font-bold text-white">
                      {selectedCountry.tax_rate_percent !== undefined ? `${selectedCountry.tax_rate_percent}%` : 'N/A'}
                    </div>
                    <div className="text-[10px] text-white/30 italic">Average across brackets</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/10">
                    <div className="text-sm text-white/70">Strategic Stability Score</div>
                    <div className="text-sm font-bold text-brand-gold uppercase">{selectedCountry.stability_score}</div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-sm text-white/70">Annual GDP Growth</div>
                    <div className="text-sm font-bold text-white font-mono">{selectedCountry.annual_growth}</div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleDownloadReport(selectedCountry)}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-terracotta-start to-terracotta-end text-white font-bold rounded-xl shadow-xl shadow-terracotta-start/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    DOWNLOAD FULL REPORT
                  </button>
                  <button 
                    onClick={() => setSelectedCountry(null)}
                    className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
