/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Globe, Shield, TrendingUp, Users, Cpu, FileText, ChevronRight, Loader2, X, DollarSign, Percent, Linkedin, Twitter, Mail, Lock, CheckCircle2, Home, HeartPulse, Wifi, Zap } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const MOCK_DATA: CountryData[] = [
  { 
    country_name: "Switzerland", annual_growth: "+2.4%", stability_score: "Maximum", compass_index: 97, strategic_status: "Stable",
    average_salary_usd: 95000, tax_rate_percent: 18, rent_cost_usd: 2800, healthcare_score: 89, safety_rating: 91, internet_speed_mbps: 145
  },
  { 
    country_name: "Singapore", annual_growth: "+3.8%", stability_score: "Very High", compass_index: 95, strategic_status: "Premium",
    average_salary_usd: 72000, tax_rate_percent: 15, rent_cost_usd: 3200, healthcare_score: 92, safety_rating: 93, internet_speed_mbps: 210
  },
  { 
    country_name: "UAE", annual_growth: "+5.1%", stability_score: "High", compass_index: 88, strategic_status: "Emerging",
    average_salary_usd: 68000, tax_rate_percent: 0, rent_cost_usd: 2100, healthcare_score: 78, safety_rating: 88, internet_speed_mbps: 120
  },
  { 
    country_name: "Germany", annual_growth: "+1.8%", stability_score: "High", compass_index: 91, strategic_status: "Optimal",
    average_salary_usd: 62000, tax_rate_percent: 32, rent_cost_usd: 1400, healthcare_score: 85, safety_rating: 82, internet_speed_mbps: 95
  },
  { 
    country_name: "India", annual_growth: "+7.2%", stability_score: "Moderate", compass_index: 78, strategic_status: "High Potential",
    average_salary_usd: 32000, tax_rate_percent: 22, rent_cost_usd: 450, healthcare_score: 68, safety_rating: 72, internet_speed_mbps: 85
  },
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
  rent_cost_usd?: number;
  healthcare_score?: number;
  safety_rating?: number;
  internet_speed_mbps?: number;
}

export default function App() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  
  // Auth Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

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

    // Set up Auth listener
    const supabase = getSupabase();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }: any) => {
        setUser(session?.user ?? null);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setIsLoginOpen(false);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      triggerNotification("Authentication Successful. Welcome back.");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      triggerNotification(err.message || "Failed to authenticate.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: { full_name: regName }
        }
      });
      if (error) throw error;
      triggerNotification("Registration Successful. Please check your email.");
      setRegName("");
      setRegEmail("");
      setRegPassword("");
    } catch (err: any) {
      triggerNotification(err.message || "Failed to initialize registration.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
      triggerNotification("Signed out from neural session.");
    }
  };

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
          <div className="flex items-center gap-6">
            <img src="/logo.png" className="h-16 w-auto object-contain rounded-xl shadow-2xl shadow-brand-gold/20 bg-gradient-to-br from-brand-gold/20 to-terracotta-end/20 p-2 border border-brand-gold/30" alt="Logo" />
            <span className="font-display text-2xl md:text-4xl font-bold tracking-tight">GLOBAL COMPASS AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToId('about'); }} className="hover:text-white transition-colors">About Us</a>
            <a href="#compare" onClick={(e) => { e.preventDefault(); scrollToId('compare'); }} className="hover:text-white transition-colors">Jurisdictions</a>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-brand-gold font-bold">Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'Member'}</span>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full border border-white/10 hover:border-terracotta-start/50 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="px-5 py-2 rounded-full border border-white/10 hover:border-brand-gold/50 hover:text-white transition-all"
              >
                Login
              </button>
            )}
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
              <button 
                onClick={() => scrollToId('join')}
                className="group relative px-8 py-4 bg-gradient-to-r from-terracotta-start to-terracotta-end text-white font-bold rounded-xl shadow-2xl shadow-terracotta-start/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                JOIN FREE & BEGIN YOUR GROWTH PATH
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => {
                  scrollToId('compare');
                  triggerNotification("Performance Dashboard coming soon in Phase-2");
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all font-medium"
              >
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
                      alt="Founder" 
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
                    <a 
                      href="https://www.linkedin.com/in/munchingi-matya-raju-52baa71bb/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-xl bg-brand-gold text-brand-midnight text-xs font-bold hover:bg-white transition-all shadow-lg shadow-brand-gold/20 active:scale-95 flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      CONNECT VIA LINKEDIN
                    </a>
                    <a 
                      href="https://x.com/mmraju77" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-xl border border-white/10 text-white/60 text-xs font-bold hover:border-brand-gold/50 hover:text-brand-gold transition-all flex items-center gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      FOLLOW ON X
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Section Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        </section>

        {/* Global Registration Section */}
        <section id="join" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-brand-midnight">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
              {/* Accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta-start/5 blur-[100px] -z-10" />
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-4xl font-bold mb-6">Begin Your Wealth Journey</h2>
                  <p className="text-white/50 text-lg mb-8">
                    Join our exclusive network of global growth seekers. Intelligence that moves as fast as the markets.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Neural Jurisdiction Analysis",
                      "Daily Resource Allocation Insights",
                      "Tax Optimization Strategies",
                      "Confidential Growth Network"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <form className="space-y-4" onSubmit={handleRegister}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Neural Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="john@nebula.com" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Secure Password</label>
                    <input 
                      type="password" 
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all" 
                    />
                  </div>
                  <button 
                    disabled={authLoading}
                    className="w-full py-4 bg-brand-gold text-brand-midnight font-bold rounded-xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "REQUEST PRIVATE ACCESS"}
                  </button>
                  <p className="text-[10px] text-center text-white/20 uppercase tracking-widest">Initial allocation limited to premium cohorts</p>
                </form>
              </div>
            </div>
          </div>
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
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/munchingi-matya-raju-52baa71bb/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/50 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://x.com/mmraju77" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/50 transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
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

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <DollarSign className="w-3 h-3 text-brand-gold" /> Avg Salary
                    </div>
                    <div className="text-xl font-display font-bold text-white">
                      {formatCurrency(selectedCountry.average_salary_usd)}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Percent className="w-3 h-3 text-brand-gold" /> Tax Rate
                    </div>
                    <div className="text-xl font-display font-bold text-white">
                      {selectedCountry.tax_rate_percent !== undefined ? `${selectedCountry.tax_rate_percent}%` : 'N/A'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Home className="w-3 h-3 text-brand-gold" /> Avg Rent
                    </div>
                    <div className="text-xl font-display font-bold text-white">
                      {formatCurrency(selectedCountry.rent_cost_usd)} <span className="text-[10px] text-white/20 font-normal">/ mo</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <HeartPulse className="w-3 h-3 text-brand-gold" /> Healthcare
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-display font-bold text-white">{selectedCountry.healthcare_score || 'N/A'}</span>
                       <span className="text-[10px] text-white/20 font-normal">/ 100</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Shield className="w-3 h-3 text-brand-gold" /> Safety
                    </div>
                    <div className="text-xl font-display font-bold text-white">
                      {selectedCountry.safety_rating || 'N/A'} <span className="text-white/20 text-[10px] font-normal">/ 100</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Wifi className="w-3 h-3 text-brand-gold" /> Connectivity
                    </div>
                    <div className="text-xl font-display font-bold text-white">
                      {selectedCountry.internet_speed_mbps || 'N/A'} <span className="text-white/20 text-[10px] font-normal">Mbps</span>
                    </div>
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

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="absolute inset-0 bg-brand-midnight/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-brand-midnight border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-8 md:p-12"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] -z-10" />
              
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center border border-brand-gold/20 mx-auto mb-6">
                  <Lock className="text-brand-gold w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h3>
                <p className="text-white/40 text-sm">Access your neural intelligence dashboard.</p>
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold/50 focus:outline-none transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Secure Password
                  </label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold/50 focus:outline-none transition-all placeholder:text-white/10"
                  />
                </div>
                <button 
                  disabled={authLoading}
                  className="w-full py-4 bg-brand-gold text-brand-midnight font-bold rounded-xl hover:bg-white transition-all shadow-xl shadow-brand-gold/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "SECURE AUTHENTICATION"}
                </button>
              </form>

              <div className="mt-8 flex justify-between items-center text-[10px] text-white/30 uppercase tracking-widest">
                <button className="hover:text-brand-gold transition-colors">Forgot Access?</button>
                <button 
                  onClick={() => {
                    setIsLoginOpen(false);
                    scrollToId('join');
                  }}
                  className="hover:text-brand-gold transition-colors"
                >
                  Create Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Notifications */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-[200] px-6 py-3 bg-brand-midnight border border-brand-gold/30 rounded-full text-brand-gold font-bold text-xs tracking-widest shadow-2xl backdrop-blur-xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
            {notificationMsg}
          </motion.div>
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
