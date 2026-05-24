/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Globe, Shield, TrendingUp, Users, Cpu, FileText, ChevronRight, Loader2, X, DollarSign, Percent, Linkedin, Twitter, Mail, Lock, CheckCircle2, Home, HeartPulse, Wifi, Zap, BarChart3, History, Bookmark } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

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
    country_name: "Luxembourg", annual_growth: "+2.1%", stability_score: "Maximum", compass_index: 94, strategic_status: "Premium",
    average_salary_usd: 88000, tax_rate_percent: 24, rent_cost_usd: 2300, healthcare_score: 86, safety_rating: 85, internet_speed_mbps: 135
  },
  { 
    country_name: "United States", annual_growth: "+4.2%", stability_score: "High", compass_index: 92, strategic_status: "Optimal",
    average_salary_usd: 85000, tax_rate_percent: 25, rent_cost_usd: 2100, healthcare_score: 76, safety_rating: 71, internet_speed_mbps: 185
  },
  { 
    country_name: "Norway", annual_growth: "+1.5%", stability_score: "Maximum", compass_index: 93, strategic_status: "Stable",
    average_salary_usd: 78000, tax_rate_percent: 28, rent_cost_usd: 1550, healthcare_score: 88, safety_rating: 89, internet_speed_mbps: 160
  },
  { 
    country_name: "Denmark", annual_growth: "+1.6%", stability_score: "Very High", compass_index: 92, strategic_status: "Stable",
    average_salary_usd: 75000, tax_rate_percent: 35, rent_cost_usd: 1600, healthcare_score: 87, safety_rating: 88, internet_speed_mbps: 150
  },
  { 
    country_name: "Australia", annual_growth: "+2.8%", stability_score: "High", compass_index: 89, strategic_status: "Stable",
    average_salary_usd: 70000, tax_rate_percent: 32, rent_cost_usd: 1850, healthcare_score: 84, safety_rating: 83, internet_speed_mbps: 125
  },
  { 
    country_name: "Sweden", annual_growth: "+1.9%", stability_score: "High", compass_index: 90, strategic_status: "Stable",
    average_salary_usd: 65000, tax_rate_percent: 30, rent_cost_usd: 1350, healthcare_score: 83, safety_rating: 79, internet_speed_mbps: 155
  },
  { 
    country_name: "Netherlands", annual_growth: "+2.2%", stability_score: "High", compass_index: 91, strategic_status: "Optimal",
    average_salary_usd: 68000, tax_rate_percent: 37, rent_cost_usd: 1800, healthcare_score: 86, safety_rating: 84, internet_speed_mbps: 170
  },
  { 
    country_name: "Canada", annual_growth: "+2.0%", stability_score: "High", compass_index: 88, strategic_status: "Stable",
    average_salary_usd: 64000, tax_rate_percent: 28, rent_cost_usd: 1700, healthcare_score: 81, safety_rating: 82, internet_speed_mbps: 140
  },
  { 
    country_name: "Ireland", annual_growth: "+5.8%", stability_score: "High", compass_index: 86, strategic_status: "Emerging",
    average_salary_usd: 72000, tax_rate_percent: 20, rent_cost_usd: 2200, healthcare_score: 75, safety_rating: 81, internet_speed_mbps: 130
  },
  { 
    country_name: "United Kingdom", annual_growth: "+1.2%", stability_score: "High", compass_index: 84, strategic_status: "Stable",
    average_salary_usd: 60000, tax_rate_percent: 20, rent_cost_usd: 1750, healthcare_score: 79, safety_rating: 75, internet_speed_mbps: 120
  },
  { 
    country_name: "India", annual_growth: "+7.2%", stability_score: "Moderate", compass_index: 78, strategic_status: "High Potential",
    average_salary_usd: 32000, tax_rate_percent: 22, rent_cost_usd: 450, healthcare_score: 68, safety_rating: 72, internet_speed_mbps: 85
  },
];

const countryMetrics: Record<string, { rent: string; healthcare: string; safety: string; internet: string }> = {
  "Switzerland": { rent: "$2,800 / mo", healthcare: "89 / 100", safety: "91 / 100", internet: "145 Mbps" },
  "Singapore": { rent: "$3,200 / mo", healthcare: "92 / 100", safety: "93 / 100", internet: "210 Mbps" },
  "UAE": { rent: "$2,100 / mo", healthcare: "78 / 100", safety: "88 / 100", internet: "120 Mbps" },
  "Germany": { rent: "$1,400 / mo", healthcare: "85 / 100", safety: "82 / 100", internet: "95 Mbps" },
  "India": { rent: "$450 / mo", healthcare: "68 / 100", safety: "72 / 100", internet: "85 Mbps" },
  "Luxembourg": { rent: "$2,300 / mo", healthcare: "86 / 100", safety: "85 / 100", internet: "135 Mbps" },
  "Norway": { rent: "$1,550 / mo", healthcare: "88 / 100", safety: "89 / 100", internet: "160 Mbps" },
  "Denmark": { rent: "$1,600 / mo", healthcare: "87 / 100", safety: "88 / 100", internet: "150 Mbps" },
  "United States": { rent: "$2,100 / mo", healthcare: "76 / 100", safety: "71 / 100", internet: "185 Mbps" },
  "Australia": { rent: "$1,850 / mo", healthcare: "84 / 100", safety: "83 / 100", internet: "125 Mbps" },
  "Sweden": { rent: "$1,350 / mo", healthcare: "83 / 100", safety: "79 / 100", internet: "155 Mbps" },
  "Ireland": { rent: "$2,200 / mo", healthcare: "75 / 100", safety: "81 / 100", internet: "130 Mbps" },
  "Canada": { rent: "$1,700 / mo", healthcare: "81 / 100", safety: "82 / 100", internet: "140 Mbps" },
  "Netherlands": { rent: "$1,800 / mo", healthcare: "86 / 100", safety: "84 / 100", internet: "170 Mbps" },
  "United Kingdom": { rent: "$1,750 / mo", healthcare: "79 / 100", safety: "75 / 100", internet: "120 Mbps" }
};

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

  const [compareA, setCompareA] = useState<CountryData | null>(null);
  const [compareB, setCompareB] = useState<CountryData | null>(null);
  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSavedReports = async (overrideUser?: any) => {
    const supabase = getSupabase();
    const activeUser = overrideUser || user;
    if (!supabase || !activeUser) return;

    try {
      const { data, error } = await supabase
        .from('saved_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedReports(data || []);
    } catch (err: any) {
      console.error("Error fetching saved reports:", err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedReports();
    } else {
      setSavedReports([]);
    }
  }, [user]);

  const handleSaveReport = async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    // Explicitly fetch session to ensure we have the most up-to-date auth state
    const { data: { session } } = await supabase.auth.getSession();
    const activeUser = session?.user || user;

    if (!activeUser) {
      triggerNotification("Please request private access to save reports.");
      return;
    }

    if (!compareA || !compareB) {
      triggerNotification("Please select two jurisdictions to compare first.");
      return;
    }

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('saved_reports')
        .insert([
          { 
            user_id: activeUser.id, 
            country_a: compareA.country_name, 
            country_b: compareB.country_name 
          }
        ]);

      if (error) throw error;
      triggerNotification("Strategic Intelligence Saved to Archives.");
      fetchSavedReports(activeUser);
    } catch (err: any) {
      triggerNotification(err.message || "Failed to save intelligence report.");
    } finally {
      setIsSaving(false);
    }
  };

  const loadSavedReport = (report: any) => {
    const countryA = countries.find(c => c.country_name === report.country_a);
    const countryB = countries.find(c => c.country_name === report.country_b);

    if (countryA && countryB) {
      setCompareA(countryA);
      setCompareB(countryB);
      scrollToId('compare');
      triggerNotification(`Reloading: ${report.country_a} vs ${report.country_b}`);
    } else {
      triggerNotification("One or more jurisdictions have been updated in the neural engine.");
    }
  };

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

  useEffect(() => {
    if (isLoginOpen) {
      setEmail("");
      setPassword("");
      setRegEmail("");
      setRegPassword("");
      setRegName("");
    }
  }, [isLoginOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;

    const emailVal = email;
    const passwordVal = password;

    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email: emailVal, password: passwordVal });
      if (error) throw error;
      triggerNotification("Authentication Successful. Welcome back.");
    } catch (err: any) {
      triggerNotification(err.message || "Failed to authenticate.");
    } finally {
      setEmail("");
      setPassword("");
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;

    const nameVal = regName;
    const emailVal = regEmail;
    const passwordVal = regPassword;

    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signUp({
        email: emailVal,
        password: passwordVal,
        options: {
          data: { full_name: nameVal }
        }
      });
      if (error) throw error;
      triggerNotification("Registration Successful. Please check your email.");
    } catch (err: any) {
      triggerNotification(err.message || "Failed to initialize registration.");
    } finally {
      setRegName("");
      setRegEmail("");
      setRegPassword("");
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
            <img src="/logo.png" className="h-16 w-auto object-contain rounded-xl shadow-2xl shadow-amber-600/20 bg-gradient-to-br from-amber-600/20 to-terracotta-end/20 p-2 border border-amber-600/30" alt="Logo" />
            <span className="font-display text-2xl md:text-4xl font-bold tracking-tight text-slate-400">GLOBAL COMPASS AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToId('about'); }} className="hover:text-slate-400 transition-colors">About Us</a>
            <a href="#compare" onClick={(e) => { e.preventDefault(); scrollToId('compare'); }} className="hover:text-slate-400 transition-colors">Jurisdictions</a>
            {user && (
              <a href="#archives" onClick={(e) => { e.preventDefault(); scrollToId('archives'); }} className="hover:text-amber-600 transition-colors">My Archives</a>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-amber-600 font-bold">Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'Member'}</span>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full border border-white/10 hover:border-terracotta-start/50 hover:text-slate-400 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="px-5 py-2 rounded-full border border-white/10 hover:border-brand-gold/50 hover:text-slate-400 transition-all"
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-6 pt-20 pb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-amber-600 text-xs font-bold tracking-widest uppercase mb-6">
              <Cpu className="w-3 h-3" /> AI-Powered Strategic Intelligence
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Navigate the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600/80 via-slate-500 to-terracotta-start/80">
                Global Wealth & Growth
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Global Compass AI translates complex economic shifts into actionable intelligence. 
              Secure your assets and optimize growth across the world's most stable jurisdictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToId('join')}
                className="group relative px-8 py-4 bg-gradient-to-r from-terracotta-start to-terracotta-end text-slate-400 font-bold rounded-xl shadow-2xl shadow-terracotta-start/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
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

        {/* Global Hub: Comparison Tool & Index Table */}
        <section id="compare" className="py-20 bg-black/40 border-y border-white/5">
          <div className="container mx-auto px-6 flex flex-col gap-10">
            {/* Headline */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 font-display">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold mb-4 text-slate-400">Strategic Jurisdictions</h2>
                <p className="text-gray-400 text-lg">
                  Real-time comparison of premium growth corridors analyzed by our native AI engine.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 ${isLive ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-brand-gold/10 text-amber-600 border border-brand-gold/20'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-600'}`} />
                  {isLive ? 'Neural Live Engine' : 'Neural Simulation Mode'}
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm">Update: May 2026</div>
              </div>
            </div>

            {/* Comparison Tool Wrapper */}
            <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] -z-10" />
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                <div className="w-full md:w-1/3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-3 ml-1">Jurisdiction Alpha</div>
                  <select 
                    value={compareA?.country_name || ""}
                    onChange={(e) => setCompareA(countries.find(c => c.country_name === e.target.value) || null)}
                    className="w-full px-6 py-4 rounded-xl bg-brand-midnight border border-white/10 text-slate-400 font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Country A</option>
                    {countries.map(c => (
                      <option key={c.country_name} value={c.country_name}>{c.country_name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-gold/20 bg-brand-gold/5 text-amber-600 animate-pulse">
                  <Zap className="w-6 h-6" />
                </div>

                <div className="w-full md:w-1/3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-3 ml-1">Jurisdiction Beta</div>
                  <select 
                    value={compareB?.country_name || ""}
                    onChange={(e) => setCompareB(countries.find(c => c.country_name === e.target.value) || null)}
                    className="w-full px-6 py-4 rounded-xl bg-brand-midnight border border-white/10 text-slate-400 font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Country B</option>
                    {countries.map(c => (
                      <option key={c.country_name} value={c.country_name}>{c.country_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {compareA && compareB && compareA.country_name !== compareB.country_name ? (
                <>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {[
                      { label: "Stability Index", key: "compass_index", icon: Shield, suffix: "/100" },
                      { label: "Avg Annual Salary", key: "average_salary_usd", icon: DollarSign, format: (v: number) => formatCurrency(v) },
                      { label: "Optimal Tax Rate", key: "tax_rate_percent", icon: Percent, suffix: "%" },
                      { label: "Monthly Rent", key: "rent_cost_usd", icon: Home, countryMetric: "rent" },
                      { label: "Safety Rating", key: "safety_rating", icon: Shield, countryMetric: "safety" },
                      { label: "Internet Speed", key: "internet_speed_mbps", icon: Wifi, countryMetric: "internet" },
                    ].map((metric) => {
                      const valA = (compareA as any)[metric.key] || 0;
                      const valB = (compareB as any)[metric.key] || 0;

                      // Support for dynamic strings from live data with countryMetrics fallback
                      const getDisplayValue = (country: CountryData) => {
                        if (metric.key === "rent_cost_usd" && country.rent_cost_usd) return formatCurrency(country.rent_cost_usd);
                        if (metric.key === "healthcare_score" && country.healthcare_score) return `${country.healthcare_score} / 100`;
                        if (metric.key === "safety_rating" && country.safety_rating) return `${country.safety_rating} / 100`;
                        if (metric.key === "internet_speed_mbps" && country.internet_speed_mbps) return `${country.internet_speed_mbps} Mbps`;
                        
                        // Fallback to countryMetrics if property is missing
                        if ((metric as any).countryMetric) {
                          return countryMetrics[country.country_name]?.[(metric as any).countryMetric as keyof typeof countryMetrics[string]];
                        }
                        
                        return metric.format ? metric.format((country as any)[metric.key] || 0) : `${(country as any)[metric.key] || 0}${metric.suffix || ""}`;
                      };

                      const displayA = getDisplayValue(compareA);
                      const displayB = getDisplayValue(compareB);

                      // Higher index/salary/speed/safety is better, but lower rent/tax is better
                      const isLowerBetter = metric.key === "tax_rate_percent" || metric.key === "rent_cost_usd";
                      
                      // Logic for visual indicators (using numbers from data object for logic)
                      const isABetter = isLowerBetter ? (valA < valB && valA !== 0) : (valA > valB);
                      const isBBetter = isLowerBetter ? (valB < valA && valB !== 0) : (valB > valA);

                      return (
                        <div key={metric.key} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            <metric.icon className="w-3 h-3 text-amber-600" />
                            {metric.label}
                          </div>
                          
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 text-center space-y-1">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate mb-1">{compareA.country_name}</div>
                              <div className={`text-lg font-display font-bold text-amber-600 ${isABetter ? 'scale-110 origin-center transition-transform' : 'opacity-80'}`}>
                                {displayA || "N/A"}
                              </div>
                            </div>
                            
                            <div className="w-px h-8 bg-white/10" />

                            <div className="flex-1 text-center space-y-1">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate mb-1">{compareB.country_name}</div>
                              <div className={`text-lg font-display font-bold text-slate-400 ${isBBetter ? 'scale-110 origin-center transition-transform' : 'opacity-80'}`}>
                                {displayB || "N/A"}
                              </div>
                            </div>
                          </div>

                          {/* Comparison Progress Bar */}
                          <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                            {valA + valB > 0 ? (
                              <>
                                <div 
                                  className={`h-full transition-all duration-700 ${isABetter ? 'bg-amber-600/70' : 'bg-white/10'}`} 
                                  style={{ width: `${(valA / (valA + valB)) * 100}%` }} 
                                />
                                <div 
                                  className={`h-full transition-all duration-700 ${isBBetter ? 'bg-slate-400/70' : 'bg-white/10'}`} 
                                  style={{ width: `${(valB / (valA + valB)) * 100}%` }} 
                                />
                              </>
                            ) : (
                              <div className="w-full h-full bg-white/5" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                  
                  {/* Visual Analytics Chart Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center border border-amber-600/20">
                        <BarChart3 className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Visual Analytics Comparison</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Relative Metric Scaling Optimization</p>
                      </div>
                    </div>

                    <div className="space-y-10">
                      {/* Salary Chart */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Average Annual Salary</span>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>{compareA.country_name}</span>
                              <span>{formatCurrency(compareA.average_salary_usd)}</span>
                            </div>
                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(compareA.average_salary_usd / Math.max(compareA.average_salary_usd, compareB.average_salary_usd, 1)) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                className="h-full bg-amber-600/60"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>{compareB.country_name}</span>
                              <span>{formatCurrency(compareB.average_salary_usd)}</span>
                            </div>
                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(compareB.average_salary_usd / Math.max(compareA.average_salary_usd, compareB.average_salary_usd, 1)) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                                className="h-full bg-slate-500/50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tax Rate Chart */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Optimal Tax Rate</span>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>{compareA.country_name}</span>
                              <span>{compareA.tax_rate_percent}%</span>
                            </div>
                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(compareA.tax_rate_percent / Math.max(compareA.tax_rate_percent, compareB.tax_rate_percent, 1)) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                                className="h-full bg-amber-600/60"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>{compareB.country_name}</span>
                              <span>{compareB.tax_rate_percent}%</span>
                            </div>
                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(compareB.tax_rate_percent / Math.max(compareA.tax_rate_percent, compareB.tax_rate_percent, 1)) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                                className="h-full bg-slate-500/50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Save Report Action */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex justify-center"
                  >
                    <button 
                      onClick={handleSaveReport}
                      disabled={isSaving}
                      className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl bg-amber-600 shadow-xl shadow-amber-600/20 hover:scale-[1.02] active:scale-95 transition-all text-brand-midnight font-bold overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {isSaving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                      <span className="relative tracking-widest text-sm uppercase">Save Comparison Report</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/5 border border-brand-gold/10 text-amber-600/40 mb-4">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-gray-400 font-display text-lg">Select two distinct jurisdictions for neural comparison</h3>
                  <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest">Awaiting Alpha & Beta Selection</p>
                </div>
              )}
            </div>

            {/* Index Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-brand-midnight/50 backdrop-blur-xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest">
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
                          <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
                          <span className="text-slate-400 text-sm animate-pulse">Connecting to Supabase Neural Engine...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    countries.map((row) => (
                      <tr 
                        key={row.country_name} 
                        onClick={() => setSelectedCountry(row)}
                        className="hover:bg-white/[0.04] cursor-pointer transition-all duration-300 group border-l-2 border-transparent hover:border-amber-600"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="font-medium text-lg text-slate-400">{row.country_name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-amber-600 font-mono font-bold opacity-80">{row.annual_growth}</td>
                        <td className="px-8 py-6 text-slate-400">{row.stability_score}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden w-24">
                              <div className="h-full bg-amber-600/70" style={{ width: `${row.compass_index}%` }} />
                            </div>
                            <span className="text-xs font-bold text-slate-400">{row.compass_index}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-400 text-xs font-bold">
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

        {/* Strategic Archives Section - Only for Authenticated Users */}
        {user && savedReports.length > 0 && (
          <section id="archives" className="py-24 relative">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Personal Strategic Vault</div>
                  <h2 className="font-display text-4xl font-bold tracking-tight text-slate-400">Saved Intelligence Archives</h2>
                </div>
                <p className="text-slate-500 text-sm max-w-sm uppercase tracking-widest leading-relaxed">
                  Historical Jurisdictional comparisons curated for your specific neural focus.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedReports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => loadSavedReport(report)}
                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-600/30 hover:bg-white/[0.04] transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-amber-600/20 group-hover:border-amber-600/40 transition-all">
                        <History className="w-5 h-5 text-slate-500 group-hover:text-amber-600" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alpha</div>
                        <div className="text-lg font-display font-bold text-slate-400 group-hover:text-amber-600 transition-colors uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                          {report.country_a}
                        </div>
                      </div>
                      
                      <div className="text-amber-600/30 font-bold italic text-sm">VS</div>

                      <div className="flex-1 text-right">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Beta</div>
                        <div className="text-lg font-display font-bold text-slate-400 group-hover:text-amber-600 transition-colors uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                          {report.country_b}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-600 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                        Load Neural Model <ChevronRight className="w-3 h-3" />
                      </div>
                      <Bookmark className="w-3 h-3 text-slate-600" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Leadership Profile */}
        <section id="about" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 px-4">
              <h2 className="text-amber-600 text-sm font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Leadership Intelligence</h2>
              <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-400">The Architect of Global Strategy</h3>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto rounded-[2.5rem] p-1 bg-gradient-to-br from-amber-600/30 via-transparent to-terracotta-start/30 shadow-2xl shadow-amber-600/5"
            >
              <div className="bg-brand-midnight/90 backdrop-blur-3xl rounded-[calc(2.5rem-4px)] p-8 md:p-16 border border-white/5 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                <div className="relative group">
                  <div className="absolute inset-0 bg-amber-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="w-48 h-48 rounded-full border-2 border-amber-600 p-1 shadow-2xl shadow-amber-600/30 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
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
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-amber-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Chief AI Architect</div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-slate-400">Munchangi Matyaraju <span className="text-amber-600/80 block md:inline mt-2 md:mt-0">(mm Raju)</span></h3>
                  <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-8 font-light max-w-sm mx-auto md:mx-0">
                    <p className="italic">
                      "Visionary behind Global Compass AI, focused on strategic global intelligence and neural economic forecasting."
                    </p>
                    <p className="text-sm not-italic opacity-80">
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
                      className="px-8 py-3 rounded-xl border border-white/10 text-slate-400 text-xs font-bold hover:border-amber-600/50 hover:text-amber-600 transition-all flex items-center gap-2"
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
                  <h2 className="font-display text-4xl font-bold mb-6 text-slate-400">Begin Your Wealth Journey</h2>
                  <p className="text-gray-400 text-lg mb-8">
                    Join our exclusive network of global growth seekers. Intelligence that moves as fast as the markets.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Neural Jurisdiction Analysis",
                      "Daily Resource Allocation Insights",
                      "Tax Optimization Strategies",
                      "Confidential Growth Network"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-amber-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <form className="space-y-4" onSubmit={handleRegister}>
                  {/* Autofill Honeypot */}
                  <div className="absolute -top-[1000px] -left-[1000px] pointer-events-none" aria-hidden="true">
                    <input type="text" name="dummy_name" tabIndex={-1} />
                    <input type="email" name="dummy_email" tabIndex={-1} />
                    <input type="password" name="dummy_password" tabIndex={-1} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    <input 
                      type="text" 
                      required
                      autoComplete="one-time-code"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all text-slate-400" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Neural Email Address</label>
                    <input 
                      type="email" 
                      required
                      readOnly
                      onFocus={(e) => e.target.removeAttribute('readOnly')}
                      autoComplete="one-time-code"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="john@nebula.com" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all text-slate-400" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Secure Password</label>
                    <input 
                      type="password" 
                      required
                      autoComplete="one-time-code"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all text-slate-400" 
                    />
                  </div>
                  <button 
                    disabled={authLoading}
                    className="w-full py-4 bg-amber-600 text-brand-midnight font-bold rounded-xl hover:bg-slate-400 transition-all shadow-xl shadow-brand-gold/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "REQUEST PRIVATE ACCESS"}
                  </button>
                  <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">Initial allocation limited to premium cohorts</p>
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
                    <Zap className="text-brand-midnight w-5 h-5" />
                  </div>
                  <span className="font-display text-xl font-bold tracking-tight text-slate-400">GLOBAL COMPASS AI</span>
                </div>
                <p className="text-gray-400 max-w-sm mb-8">
                  The world's premier neural-intelligence platform for strategic wealth relocation 
                  and global economic navigation.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/munchingi-matya-raju-52baa71bb/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:border-amber-600/50 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://x.com/mmraju77" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:border-amber-600/50 transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-slate-400 text-sm uppercase tracking-widest">Solutions</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> Wealth Migration</a></li>
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> Jurisdiction Audits</a></li>
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> AI Portfolio Guard</a></li>
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> Global Concierge</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-slate-400 text-sm uppercase tracking-widest">Company</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> Security Standards</a></li>
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> Press Room</a></li>
                  <li><a href="#" className="hover:text-amber-600 flex items-center gap-2 group"><ChevronRight className="w-3 h-3 text-amber-600 opacity-0 group-hover:opacity-100 transition-all" /> Global Status</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <div className="flex flex-col gap-8">
                {/* Strict Regulatory Disclaimer */}
                <div className="p-8 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <h5 className="font-bold text-xs uppercase tracking-widest text-slate-400">Regulatory & Financial Disclaimer</h5>
                  </div>
                  <div className="space-y-4 text-[11px] text-gray-500 leading-relaxed uppercase">
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
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
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
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-400 transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center border border-brand-gold/20">
                    <Globe className="text-amber-600 w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-amber-600 text-[10px] font-bold tracking-[0.2em] uppercase">Intelligence Report</div>
                    <h3 className="text-3xl font-display font-bold text-slate-400">{selectedCountry.country_name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <DollarSign className="w-3 h-3 text-amber-600" /> Avg Salary
                    </div>
                    <div className="text-xl font-display font-bold text-slate-400">
                      {formatCurrency(selectedCountry.average_salary_usd)}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Percent className="w-3 h-3 text-amber-600" /> Tax Rate
                    </div>
                    <div className="text-xl font-display font-bold text-slate-400">
                      {selectedCountry.tax_rate_percent !== undefined ? `${selectedCountry.tax_rate_percent}%` : 'N/A'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Home className="w-3 h-3 text-amber-600" /> Avg Rent
                    </div>
                    <div className="text-xl font-display font-bold text-slate-400">
                      {selectedCountry.rent_cost_usd ? formatCurrency(selectedCountry.rent_cost_usd) : (countryMetrics[selectedCountry.country_name]?.rent || "N/A")}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <HeartPulse className="w-3 h-3 text-amber-600" /> Healthcare
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-display font-bold text-slate-400">
                         {selectedCountry.healthcare_score ? `${selectedCountry.healthcare_score} / 100` : (countryMetrics[selectedCountry.country_name]?.healthcare || "N/A")}
                       </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Shield className="w-3 h-3 text-amber-600" /> Safety
                    </div>
                    <div className="text-xl font-display font-bold text-slate-400">
                      {selectedCountry.safety_rating ? `${selectedCountry.safety_rating} / 100` : (countryMetrics[selectedCountry.country_name]?.safety || "N/A")}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      <Wifi className="w-3 h-3 text-amber-600" /> Connectivity
                    </div>
                    <div className="text-xl font-display font-bold text-slate-400">
                      {selectedCountry.internet_speed_mbps ? `${selectedCountry.internet_speed_mbps} Mbps` : (countryMetrics[selectedCountry.country_name]?.internet || "N/A")}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/10">
                    <div className="text-sm text-slate-400">Strategic Stability Score</div>
                    <div className="text-sm font-bold text-amber-600 uppercase">{selectedCountry.stability_score}</div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-sm text-slate-400">Annual GDP Growth</div>
                    <div className="text-sm font-bold text-slate-400 font-mono">{selectedCountry.annual_growth}</div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleDownloadReport(selectedCountry)}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-terracotta-start to-terracotta-end text-slate-400 font-bold rounded-xl shadow-xl shadow-terracotta-start/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    DOWNLOAD FULL REPORT
                  </button>
                  <button 
                    onClick={() => setSelectedCountry(null)}
                    className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 font-medium rounded-xl transition-all"
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
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-500 hover:text-slate-400 transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center border border-brand-gold/20 mx-auto mb-6">
                  <Lock className="text-amber-600 w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display font-bold text-slate-400 mb-2">Welcome Back</h3>
                <p className="text-gray-400 text-sm">Access your neural intelligence dashboard.</p>
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                {/* Autofill Honeypot */}
                <div className="absolute -top-[1000px] -left-[1000px] pointer-events-none" aria-hidden="true">
                  <input type="email" name="dummy_email_login" tabIndex={-1} />
                  <input type="password" name="dummy_password_login" tabIndex={-1} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readOnly')}
                    autoComplete="one-time-code"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-amber-600/50 focus:outline-none transition-all placeholder:text-slate-500 text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Secure Password
                  </label>
                  <input 
                    type="password" 
                    required
                    autoComplete="one-time-code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-amber-600/50 focus:outline-none transition-all placeholder:text-slate-500 text-slate-400"
                  />
                </div>
                <button 
                  disabled={authLoading}
                  className="w-full py-4 bg-amber-600 text-brand-midnight font-bold rounded-xl hover:bg-slate-400 transition-all shadow-xl shadow-brand-gold/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "SECURE AUTHENTICATION"}
                </button>
              </form>

              <div className="mt-8 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
                <button className="hover:text-amber-600 transition-colors">Forgot Access?</button>
                <button 
                  onClick={() => {
                    setIsLoginOpen(false);
                    scrollToId('join');
                  }}
                  className="hover:text-amber-600 transition-colors"
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
            className="fixed bottom-12 left-1/2 z-[200] px-6 py-3 bg-brand-midnight border border-brand-gold/30 rounded-full text-amber-600 font-bold text-xs tracking-widest shadow-2xl backdrop-blur-xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
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
