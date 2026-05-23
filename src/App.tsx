/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Globe, Shield, TrendingUp, Users, Cpu, FileText, ChevronRight, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const MOCK_DATA: CountryData[] = [
  { country: "United States", growth: "+4.2%", stability: "High", compass_index: 92, status: "Optimal" },
  { country: "Singapore", growth: "+3.8%", stability: "Very High", compass_index: 95, status: "Premium" },
  { country: "UAE", growth: "+5.1%", stability: "High", compass_index: 88, status: "Emerging" },
  { country: "Switzerland", growth: "+2.4%", stability: "Maximum", compass_index: 97, status: "Stable" },
  { country: "India", growth: "+7.2%", stability: "Moderate", compass_index: 78, status: "High Potential" },
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
  country: string;
  growth: string;
  stability: string;
  compass_index: number;
  status: string;
}

export default function App() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

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
        // Only log actual data fetching errors if Supabase was configured
        console.warn("Supabase fetch failed, falling back to neural simulations:", err.message);
        setCountries(MOCK_DATA);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

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
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-terracotta-end rounded-lg flex items-center justify-center shadow-lg shadow-brand-gold/20">
              <CompassIcon className="text-brand-midnight w-6 h-6" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">GLOBAL COMPASS AI</span>
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
                      <tr key={row.country} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                            <span className="font-medium text-lg text-white/90">{row.country}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-brand-gold font-mono">{row.growth}</td>
                        <td className="px-8 py-6 text-white/70">{row.stability}</td>
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
                            {row.status}
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

        {/* Founder Profile / About Us */}
        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-brand-gold/10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-3xl p-1 bg-gradient-to-br from-brand-gold/40 to-transparent">
                  <div className="rounded-[calc(1.5rem-4px)] overflow-hidden bg-brand-midnight">
                     <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                      alt="Chief AI Architect" 
                      className="w-full h-[500px] object-cover opacity-80 filter grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-midnight to-transparent">
                      <h3 className="text-3xl font-display font-bold">Munchangi Matyaraju (mm Raju)</h3>
                      <p className="text-brand-gold font-medium tracking-widest uppercase text-sm mt-1">Chief AI Architect</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div>
                <h2 className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-4">Leadership Behind the Vision</h2>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">Masterminding Global <br />Intelligence.</h3>
                <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                  <p>
                    Munchangi Matyaraju, known strategically as <span className="text-white font-medium">mm Raju</span>, 
                    is the architectural force behind Global Compass AI. With a background in deep neural 
                    modeling and quantitative finance, mm Raju has pioneered the integration of AI-driven 
                    geopolitical forecasting into premium wealth management.
                  </p>
                  <p>
                    Global Compass AI was founded on a simple yet radical premise: that the world's 
                    economic shift can not only be predicted but navigated with mathematical precision. 
                    Under his leadership, the platform has become the standard for institutional-grade 
                    growth intelligence.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <TrendingUp className="text-brand-gold w-6 h-6 mb-3" />
                    <div className="text-2xl font-bold">$12B+</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">Assets Analyzed</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <Users className="text-brand-gold w-6 h-6 mb-3" />
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">Global Jurisdictions</div>
                  </div>
                </div>
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
