/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Globe, Shield, ShieldCheck, TrendingUp, Users, Cpu, FileText, ChevronRight, Loader2, X, DollarSign, Percent, Linkedin, Twitter, Mail, Lock, CheckCircle2, Home, HeartPulse, Wifi, Zap, BarChart3, History, Bookmark, Scale, Download, ArrowLeft, Plane, Truck, Brain, Sparkles, Landmark, Calculator, PieChart, TrendingDown, Briefcase, Search } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState, useTransition } from "react";
import { jsPDF } from "jspdf";

const MOCK_DATA: CountryData[] = [
  { 
    country_name: "Switzerland", annual_growth: "+2.4%", stability_score: "Maximum", compass_index: 97, strategic_status: "Stable", cost_of_living_score: 92,
    average_salary_usd: 95000, tax_rate_percent: 18, rent: 2800, healthcare: 89, safety: 91, internet: 145
  },
  { 
    country_name: "Singapore", annual_growth: "+3.8%", stability_score: "Very High", compass_index: 95, strategic_status: "Premium", cost_of_living_score: 88,
    average_salary_usd: 72000, tax_rate_percent: 15, rent: 3200, healthcare: 92, safety: 93, internet: 210
  },
  { 
    country_name: "UAE", annual_growth: "+5.1%", stability_score: "High", compass_index: 88, strategic_status: "Emerging", cost_of_living_score: 75,
    average_salary_usd: 68000, tax_rate_percent: 0, rent: 2100, healthcare: 78, safety: 88, internet: 120
  },
  { 
    country_name: "Germany", annual_growth: "+1.8%", stability_score: "High", compass_index: 91, strategic_status: "Optimal", cost_of_living_score: 70,
    average_salary_usd: 62000, tax_rate_percent: 32, rent: 1400, healthcare: 85, safety: 82, internet: 95
  },
  { 
    country_name: "Luxembourg", annual_growth: "+2.1%", stability_score: "Maximum", compass_index: 94, strategic_status: "Premium", cost_of_living_score: 82,
    average_salary_usd: 88000, tax_rate_percent: 24, rent: 2300, healthcare: 86, safety: 85, internet: 135
  },
  { 
    country_name: "United States", annual_growth: "+4.2%", stability_score: "High", compass_index: 92, strategic_status: "Optimal", cost_of_living_score: 76,
    average_salary_usd: 85000, tax_rate_percent: 25, rent: 2100, healthcare: 76, safety: 71, internet: 185
  },
  { 
    country_name: "Norway", annual_growth: "+1.5%", stability_score: "Maximum", compass_index: 93, strategic_status: "Stable", cost_of_living_score: 84,
    average_salary_usd: 78000, tax_rate_percent: 28, rent: 1550, healthcare: 88, safety: 89, internet: 160
  },
  { 
    country_name: "Denmark", annual_growth: "+1.6%", stability_score: "Very High", compass_index: 92, strategic_status: "Stable", cost_of_living_score: 80,
    average_salary_usd: 75000, tax_rate_percent: 35, rent: 1600, healthcare: 87, safety: 88, internet: 150
  },
  { 
    country_name: "Australia", annual_growth: "+2.8%", stability_score: "High", compass_index: 89, strategic_status: "Stable", cost_of_living_score: 77,
    average_salary_usd: 70000, tax_rate_percent: 32, rent: 1850, healthcare: 84, safety: 83, internet: 125
  },
  { 
    country_name: "Sweden", annual_growth: "+1.9%", stability_score: "High", compass_index: 90, strategic_status: "Stable", cost_of_living_score: 74,
    average_salary_usd: 65000, tax_rate_percent: 30, rent: 1350, healthcare: 83, safety: 79, internet: 155
  },
  { 
    country_name: "Netherlands", annual_growth: "+2.2%", stability_score: "High", compass_index: 91, strategic_status: "Optimal", cost_of_living_score: 79,
    average_salary_usd: 68000, tax_rate_percent: 37, rent: 1800, healthcare: 86, safety: 84, internet: 170
  },
  { 
    country_name: "Canada", annual_growth: "+2.0%", stability_score: "High", compass_index: 88, strategic_status: "Stable", cost_of_living_score: 72,
    average_salary_usd: 64000, tax_rate_percent: 28, rent: 1700, healthcare: 81, safety: 82, internet: 140
  },
  { 
    country_name: "Ireland", annual_growth: "+5.8%", stability_score: "High", compass_index: 86, strategic_status: "Emerging", cost_of_living_score: 75,
    average_salary_usd: 72000, tax_rate_percent: 20, rent: 2200, healthcare: 75, safety: 81, internet: 130
  },
  { 
    country_name: "United Kingdom", annual_growth: "+1.2%", stability_score: "High", compass_index: 84, strategic_status: "Stable", cost_of_living_score: 75,
    average_salary_usd: 60000, tax_rate_percent: 20, rent: 1750, healthcare: 79, safety: 75, internet: 120
  },
  { 
    country_name: "India", annual_growth: "+7.2%", stability_score: "Moderate", compass_index: 78, strategic_status: "High Potential", cost_of_living_score: 40,
    average_salary_usd: 32000, tax_rate_percent: 22, rent: 450, healthcare: 68, safety: 72, internet: 85
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
  compass_index: number | string;
  strategic_status: string;
  cost_of_living_score: number | string;
  average_salary_usd?: number | string;
  tax_rate_percent?: number | string;
  rent?: number | string;
  healthcare?: number | string;
  safety?: number | string;
  internet?: number | string;
}

export default function App() {
  const CORE_DICTIONARY: Record<string, any> = {
    "monaco": { 
      average_salary_usd: 120000, 
      tax_rate_percent: 0, 
      rent: "$4,200 / mo", 
      healthcare: "88 / 100", 
      safety: "95 / 100", 
      internet: "220 Mbps", 
      annual_growth: "+2.8%", 
      stability_score: "Maximum", 
      strategic_status: "Premium", 
      compass_index: 94, 
      cost_of_living_score: 90 
    },
    "canada": { 
      average_salary_usd: 62000, 
      tax_rate_percent: 25, 
      rent: "$1,700 / mo", 
      healthcare: "82 / 100", 
      safety: "83 / 100", 
      internet: "140 Mbps", 
      annual_growth: "+2.1%", 
      stability_score: "High", 
      strategic_status: "Stable", 
      compass_index: 80, 
      cost_of_living_score: 72 
    },
    "japan": { 
      average_salary_usd: 52000, 
      tax_rate_percent: 30, 
      rent: "$1,200 / mo", 
      healthcare: "91 / 100", 
      safety: "89 / 100", 
      internet: "180 Mbps", 
      annual_growth: "+1.4%", 
      stability_score: "High", 
      strategic_status: "Stable", 
      compass_index: 85, 
      cost_of_living_score: 75 
    }
  };

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [user, setUser] = useState<any>(null);
  
  // Tax Calculator State
  const [calcCountry, setCalcCountry] = useState<string>("Switzerland");
  const [annualIncome, setAnnualIncome] = useState<number | string>(100000);
  
  // Savings Calculator State
  const [savingsIncome, setSavingsIncome] = useState<number | string>(8000);
  const [savingsExpenses, setSavingsExpenses] = useState<number | string>(3000);

  // Cost-of-Living Estimator State
  const [estCountry, setEstCountry] = useState<string>("Singapore");
  const [lifestyleTier, setLifestyleTier] = useState<"Basic" | "Executive" | "Luxury">("Executive");

  // Relocation Planner State
  const [relocCountry, setRelocCountry] = useState<string>("Singapore");
  const [partySize, setPartySize] = useState<"Single" | "Couple" | "Family">("Single");
  const [shippingVolume, setShippingVolume] = useState<"Minimal" | "Medium" | "Heavy">("Medium");

  // AI Relocation Advisor State
  const [aiTargetSalary, setAiTargetSalary] = useState<number | string>(150000);
  const [aiMaxTax, setAiMaxTax] = useState<number>(25);
  const [aiPriority, setAiPriority] = useState<"Safety" | "Healthcare" | "Wealth">("Wealth");
  const [aiResult, setAiResult] = useState<{ country: CountryData; score: number; summary: string } | null>(null);
  const [isAiCalculating, setIsAiCalculating] = useState(false);

  // AI Salary Predictor State
  const [salaryCountry, setSalaryCountry] = useState<string>("Singapore");
  const [industry, setIndustry] = useState<string>("Technology & AI");
  const [experience, setExperience] = useState<number | string>(5);
  const [predictedSalaryResult, setPredictedSalaryResult] = useState<{ low: number; high: number; demand: string } | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isPending, startTransition] = useTransition();

  // AI Visa Roadmap State
  const [visaCountry, setVisaCountry] = useState<string>("Singapore");
  const [visaPathway, setVisaPathway] = useState<string>("Golden Visa / Residency by Investment");
  const [visaRoadmap, setVisaRoadmap] = useState<{
    timeline: { step: string; detail: string }[];
    totalTime: string;
    documents: string[];
  } | null>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  // AI Savings Planner State
  const [savingsStrategy, setSavingsStrategy] = useState<string>("Capital Preservation (Low Risk)");
  const [savingsMonthly, setSavingsMonthly] = useState<number | string>(1000);
  const [savingsAllocation, setSavingsAllocation] = useState<{
    safe: number;
    cash: number;
    growth: number;
    timeline: string;
  } | null>(null);
  const [isOptimizingSavings, setIsOptimizingSavings] = useState(false);

  // AI Remote-Work & Nomad Advisor State
  const [nomadCountry, setNomadCountry] = useState<string>("Singapore");
  const [nomadRevenue, setNomadRevenue] = useState<number | string>(5000);
  const [nomadResult, setNomadResult] = useState<{
    score: string;
    internet: number;
    visaStatus: string;
    insight: string;
  } | null>(null);
  const [isAnalyzingNomad, setIsAnalyzingNomad] = useState(false);

  // Executive Purchasing Power & PPP Calculator State
  const [pppBaseCountry, setPppBaseCountry] = useState<string>("Singapore");
  const [pppTargetCountry, setPppTargetCountry] = useState<string>("United States");
  const [pppBaseSalary, setPppBaseSalary] = useState<number | string>(100000);
  const [pppResult, setPppResult] = useState<{
    equivalentSalary: number;
    insight: string;
  } | null>(null);
  const [isCalculatingPPP, setIsCalculatingPPP] = useState(false);

  // Corporate & Capital Gains Tax Engine State
  const [taxTargetCountry, setTaxTargetCountry] = useState<string>("Singapore");
  const [taxCorpRevenue, setTaxCorpRevenue] = useState<number | string>(500000);
  const [taxCapGains, setTaxCapGains] = useState<number | string>(100000);
  const [taxResult, setTaxResult] = useState<{
    corpTaxAmount: number;
    capGainsAmount: number;
    netRetained: number;
    corpRate: number;
    capRate: number;
  } | null>(null);
  const [isCalculatingTax, setIsCalculatingTax] = useState(false);

  // Forex & Currency Exchange Engine State
  const [fxAmount, setFxAmount] = useState<number | string>(1000);
  const [fxFrom, setFxFrom] = useState<string>("USD");
  const [fxTo, setFxTo] = useState<string>("EUR");
  const [fxResult, setFxResult] = useState<{
    convertedAmount: number;
    rateText: string;
    symbol: string;
  } | null>(null);
  const [isCalculatingFx, setIsCalculatingFx] = useState(false);

  // Immigration Concierge & Eligibility Engine State
  const [immiTargetCountry, setImmiTargetCountry] = useState<string>("Singapore");
  const [immiCitizenship, setImmiCitizenship] = useState<string>("Global");
  const [immiTier, setImmiTier] = useState<string>("Standard Application Assist");
  const [immiResult, setImmiResult] = useState<{
    probability: string;
    deliverables: string[];
  } | null>(null);
  const [isAssessingImmi, setIsAssessingImmi] = useState(false);

  // Global Insurance Partners State
  const [insTargetCountry, setInsTargetCountry] = useState<string>("Singapore");
  const [insCategory, setInsCategory] = useState<string>("Premium Global Health & Medical");
  const [insResult, setInsResult] = useState<{name: string, description: string}[] | null>(null);
  const [isAssessingIns, setIsAssessingIns] = useState(false);

  // Global Remote Job Board State
  const [jobIndustry, setJobIndustry] = useState<string>("Technology & AI Engineering");
  const [jobSalary, setJobSalary] = useState<string>("$150k - $250k");
  const [jobResult, setJobResult] = useState<{title: string, company: string, salary: number}[] | null>(null);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  // Offshore & International Banking State
  const [bankTargetCountry, setBankTargetCountry] = useState<string>("Singapore");
  const [bankTier, setBankTier] = useState<string>("Personal Digital Nomad Account");
  const [bankResult, setBankResult] = useState<{name: string, description: string}[] | null>(null);
  const [isFetchingBanks, setIsFetchingBanks] = useState(false);

  // Global Expat & Elite Networking State
  const [networkTargetCountry, setNetworkTargetCountry] = useState<string>("Singapore");
  const [networkInterest, setNetworkInterest] = useState<string>("Tech Founders & VC Mastermind");
  const [networkResult, setNetworkResult] = useState<{name: string, description: string}[] | null>(null);
  const [isFetchingNetworks, setIsFetchingNetworks] = useState(false);

  // Neural Matching Engine
  const runAiMatch = () => {
    if (!countries || countries.length === 0) return;
    setIsAiCalculating(true);
    
    setTimeout(() => {
      const targetSal = Number(aiTargetSalary) || 0;
      
      const scored = countries.map(country => {
        let score = 70; // Baseline
        
        // Tax alignment
        const taxRate = country.tax_rate_percent || 0;
        if (taxRate > aiMaxTax) {
          score -= (taxRate - aiMaxTax) * 1.5;
        } else {
          score += (aiMaxTax - taxRate) * 0.5;
        }
        
        // Financial potential (Savings after tax & rent)
        const rentVal = typeof country.rent === 'number' ? country.rent : 0;
        const netAfterTax = targetSal * (1 - (taxRate / 100));
        const estimatedSavings = netAfterTax - (rentVal * 12 + 12000); // 12k for food/misc
        
        if (aiPriority === "Wealth") {
          score += (estimatedSavings / 5000);
        } else if (aiPriority === "Safety") {
          score += (country.safety || 50) / 2;
        } else if (aiPriority === "Healthcare") {
          score += (country.healthcare || 50) / 2;
        }
        
        // Normalize score 0-100
        const rawScore = isNaN(score) ? 75 : score;
        const finalScore = Math.min(99, Math.max(65, Math.round(rawScore)));
        
        // Generate summary based on priority
        let summary = "";
        if (aiPriority === "Wealth") {
          summary = `${country.country_name} offers a superior capital accumulation profile with ${(country.tax_rate_percent || 0)}% effective tax and low overhead relative to your target income.`;
        } else if (aiPriority === "Safety") {
          summary = `With a world-class safety index of ${country.safety}/100, ${country.country_name} provides the most secure environment for high-net-worth relocation.`;
        } else {
          summary = `The healthcare infrastructure in ${country.country_name} (${country.healthcare}/100) aligns perfectly with your longevity and wellness priorites.`;
        }

        return { country, score: finalScore, summary };
      });
      
      // Sort and take top
      const winner = scored.sort((a, b) => b.score - a.score)[0];
      setAiResult(winner);
      setIsAiCalculating(false);
    }, 1500);
  };

  // Strategic Salary Predictor Engine
  const predictSalary = () => {
    if (!countries || countries.length === 0) return;
    setIsPredicting(true);
    
    setTimeout(() => {
      const countryData = countries.find(c => c.country_name === salaryCountry) || countries[0];
      const baseSalary = countryData.average_salary_usd || 60000;
      
      const multipliers: Record<string, number> = {
        "Technology & AI": 1.30,
        "Finance & Investment": 1.25,
        "Healthcare & BioTech": 1.20,
        "Executive Management": 1.35
      };
      
      const indMult = multipliers[industry] || 1;
      const expYears = Number(experience) || 0;
      const expMult = Math.pow(1.05, expYears);
      
      const midPoint = baseSalary * indMult * expMult;
      const lowBracket = midPoint * 0.9;
      const highBracket = midPoint * 1.15;
      
      let demand = "Moderate";
      if (indMult >= 1.3 && expYears >= 5) demand = "CRITICAL SHORTAGE";
      else if (indMult >= 1.25) demand = "HIGH DEMAND";
      else demand = "STABLE DEMAND";
      
      setPredictedSalaryResult({ low: lowBracket, high: highBracket, demand });
      setIsPredicting(false);
    }, 1200);
  };

  // Strategic AI Visa Roadmap Engine
  const generateVisaRoadmap = () => {
    if (!countries || countries.length === 0) return;
    setIsGeneratingRoadmap(true);
    
    setTimeout(() => {
      const countryData = countries.find(c => c.country_name === visaCountry) || countries[0];
      
      const roadmaps: Record<string, any> = {
        "Golden Visa / Residency by Investment": {
          timeline: [
            { step: "Initial Vetting", detail: "KYC and Source of Funds verification." },
            { step: "Capital Escrow", detail: "Transfer of investment funds to secure escrow." },
            { step: "Residency Approval", detail: "Formal government issuance of residency certificate." },
            { step: "Passport Stamping", detail: "Final biometrics and visa validity endorsement." }
          ],
          totalTime: countryData.tax_rate_percent < 5 ? "3-6 Months" : "6-12 Months",
          documents: ["Proof of Net Worth", "Clean Criminal Record", "Bank References", "Health Insurance"]
        },
        "Digital Nomad & Remote Work Permit": {
          timeline: [
            { step: "Online Submission", detail: "Portal registration and document upload." },
            { step: "Remote Income Audit", detail: "Verification of external contract and revenue." },
            { step: "Permit Clearance", detail: "Approval of 1-2 year stay permit." },
            { step: "Local Registration", detail: "Address registration and ID collection." }
          ],
          totalTime: "1-3 Months",
          documents: ["Remote Work Contract", "Bank Statements (12 months)", "Valid Passport", "Proof of Accommodation"]
        },
        "Skilled Tech & Executive Professional Visa": {
          timeline: [
            { step: "Employer Sponsoring", detail: "Formal job offer and sponsorship licensing." },
            { step: "Skills Assessment", detail: "Degree verification and technical vettings." },
            { step: "Priority Processing", detail: "Fast-track executive visa adjudication." },
            { step: "Entry Clearance", detail: "On-arrival orientation and labor registration." }
          ],
          totalTime: "2-5 Months",
          documents: ["Employment Contract", "Academic Certificates", "Tax Returns", "CV/Executive Profile"]
        }
      };
      
      setVisaRoadmap(roadmaps[visaPathway] || roadmaps["Golden Visa / Residency by Investment"]);
      setIsGeneratingRoadmap(false);
    }, 1500);
  };

  // Strategic AI Savings Planner Engine
  const optimizeSavingsDistribution = () => {
    setIsOptimizingSavings(true);
    
    setTimeout(() => {
      let result = {
        safe: 0,
        cash: 0,
        growth: 0,
        timeline: ""
      };
      
      if (savingsStrategy === "Capital Preservation (Low Risk)") {
        result = {
          safe: 60,
          cash: 25,
          growth: 15,
          timeline: "Timeline compressed by 12 Months vs Standard Savings"
        };
      } else if (savingsStrategy === "Balanced Wealth Accumulation") {
        result = {
          safe: 40,
          cash: 15,
          growth: 45,
          timeline: "Timeline compressed by 3.5 Years vs Standard Savings"
        };
      } else {
        result = {
          safe: 15,
          cash: 10,
          growth: 75,
          timeline: "Timeline compressed by 7+ Years vs Standard Savings"
        };
      }
      
      setSavingsAllocation(result);
      setIsOptimizingSavings(false);
    }, 1200);
  };

  // Strategic AI Remote-Work & Nomad Engine
  const analyzeRemoteFeasibility = () => {
    if (!countries || countries.length === 0) return;
    setIsAnalyzingNomad(true);
    
    setTimeout(() => {
      const countryData = countries.find(c => c.country_name === nomadCountry) || countries[0];
      const internetSpeed = countryData.internet_speed_mbps || 100;
      const safetyRating = countryData.safety_index || 70;
      const taxRate = countryData.tax_rate_percent || 0;
      
      let matchScore = 50;
      if (internetSpeed > 100) matchScore += 15;
      if (safetyRating > 75) matchScore += 20;
      if (taxRate < 10) matchScore += 15;
      
      let scoreLabel = "Moderate Match";
      if (matchScore >= 90) scoreLabel = `${matchScore}% Excellent Match`;
      else if (matchScore >= 75) scoreLabel = `${matchScore}% Strong Match`;
      else scoreLabel = `${matchScore}% Fair Match`;
      
      let insight = "";
      if (taxRate < 10 && internetSpeed > 100) {
        insight = `Highly favorable tax jurisdiction for remote operations with elite ${internetSpeed} Mbps infrastructure. Perfect for setting up compliant digital bases without heavy tax burdens.`;
      } else if (internetSpeed > 100) {
        insight = `Top-tier digital infrastructure ensures seamless operations. However, structuring tax compliance efficiently will be your primary strategic objective here.`;
      } else {
        insight = `Viable for basic remote work, but infrastructure may require strategic upgrades or reliable co-working spaces to ensure seamless executive operations.`;
      }
      
      const visaStatus = (taxRate < 15 || safetyRating > 80) ? "Active Nomad Program Available" : "Standard Tourist/Business Route";
      
      setNomadResult({
        score: scoreLabel,
        internet: internetSpeed,
        visaStatus,
        insight
      });
      setIsAnalyzingNomad(false);
    }, 1200);
  };

  // Strategic Executive Purchasing Power & PPP Calculator
  const calculatePPP = () => {
    if (!countries || countries.length === 0) return;
    setIsCalculatingPPP(true);
    
    setTimeout(() => {
      const baseCountryData = countries.find(c => c.country_name === pppBaseCountry) || countries[0];
      const targetCountryData = countries.find(c => c.country_name === pppTargetCountry) || countries[1] || countries[0];
      
      const baseCol = Number(baseCountryData.cost_of_living_score) || 80;
      const targetCol = Number(targetCountryData.cost_of_living_score) || 80;
      const baseSalary = Number(pppBaseSalary) || 0;
      
      const equivalentSalary = (targetCol / baseCol) * baseSalary;
      const deltaPercent = ((targetCol - baseCol) / baseCol) * 100;
      
      let insight = "";
      if (deltaPercent > 0) {
        insight = `To maintain the same lifestyle in ${pppTargetCountry}, you need ${deltaPercent.toFixed(1)}% more income compared to ${pppBaseCountry}.`;
      } else if (deltaPercent < 0) {
        insight = `Your purchasing power significantly increases. You need ${Math.abs(deltaPercent).toFixed(1)}% less income in ${pppTargetCountry} to maintain your ${pppBaseCountry} lifestyle.`;
      } else {
        insight = `Cost of living is statistically identical between ${pppBaseCountry} and ${pppTargetCountry}.`;
      }
      
      setPppResult({
        equivalentSalary,
        insight
      });
      setIsCalculatingPPP(false);
    }, 1200);
  };

  // Strategic Corporate & Capital Gains Tax Engine
  const calculateTaxLiability = () => {
    if (!countries || countries.length === 0) return;
    setIsCalculatingTax(true);
    
    setTimeout(() => {
      const countryData = countries.find(c => c.country_name === taxTargetCountry) || countries[0];
      
      // In a real app we'd have dedicated DB fields for corp_tax and cap_gains_tax
      // For now we map based on tax_rate_percent as a proxy, or use specific overrides for common jurisdictions
      let corpRate = countryData.tax_rate_percent || 20;
      let capRate = Math.max(0, corpRate - 5); // Generally cap gains is lower or 0
      
      // Custom overrides for famous zero/low tax jurisdictions
      if (countryData.country_name === "United Arab Emirates" || countryData.country_name === "Dubai") {
        corpRate = 9;
        capRate = 0;
      } else if (countryData.country_name === "Monaco" || countryData.country_name === "Bahamas" || countryData.country_name === "Cayman Islands") {
        corpRate = 0;
        capRate = 0;
      } else if (countryData.country_name === "Singapore") {
        corpRate = 17;
        capRate = 0;
      } else if (countryData.country_name === "Switzerland") {
        corpRate = 14;
        capRate = 0; // Usually 0 for private investors
      } else if (countryData.country_name === "United States") {
        corpRate = 21;
        capRate = 20;
      } else if (countryData.country_name === "United Kingdom") {
        corpRate = 25;
        capRate = 20;
      } else if (countryData.country_name === "Ireland") {
        corpRate = 12.5;
        capRate = 33;
      }
      
      const revenue = Number(taxCorpRevenue) || 0;
      const gains = Number(taxCapGains) || 0;
      
      const corpTaxAmount = revenue * (corpRate / 100);
      const capGainsAmount = gains * (capRate / 100);
      const totalIncome = revenue + gains;
      const netRetained = totalIncome - corpTaxAmount - capGainsAmount;
      
      setTaxResult({
        corpTaxAmount,
        capGainsAmount,
        netRetained,
        corpRate,
        capRate
      });
      setIsCalculatingTax(false);
    }, 1200);
  };

  // Dynamic Currency Configuration
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const CONVERSION_RATES: Record<string, { rate: number, symbol: string, name: string }> = {
    USD: { rate: 1, symbol: '$', name: 'US Dollar' },
    EUR: { rate: 0.92, symbol: '€', name: 'Euro' },
    GBP: { rate: 0.79, symbol: '£', name: 'British Pound' },
    INR: { rate: 83.20, symbol: '₹', name: 'Indian Rupee' },
    AED: { rate: 3.67, symbol: 'د.إ', name: 'UAE Dirham' },
    CHF: { rate: 0.91, symbol: 'CHF', name: 'Swiss Franc' },
    JPY: { rate: 156.40, symbol: '¥', name: 'Japanese Yen' },
    SGD: { rate: 1.35, symbol: 'S$', name: 'Singapore Dollar' },
    CAD: { rate: 1.37, symbol: 'C$', name: 'Canadian Dollar' },
    AUD: { rate: 1.51, symbol: 'A$', name: 'Australian Dollar' },
    HKD: { rate: 7.82, symbol: 'HK$', name: 'Hong Kong Dollar' },
    CNY: { rate: 7.24, symbol: '¥', name: 'Chinese Yuan' },
    SAR: { rate: 3.75, symbol: 'SR', name: 'Saudi Riyal' },
    QAR: { rate: 3.64, symbol: 'QR', name: 'Qatari Riyal' },
    KRW: { rate: 1365, symbol: '₩', name: 'South Korean Won' },
    BRL: { rate: 5.15, symbol: 'R$', name: 'Brazilian Real' },
    MXN: { rate: 16.70, symbol: '$', name: 'Mexican Peso' },
    ZAR: { rate: 18.40, symbol: 'R', name: 'South African Rand' },
    TRY: { rate: 32.20, symbol: '₺', name: 'Turkish Lira' },
    SEK: { rate: 10.75, symbol: 'kr', name: 'Swedish Krona' },
    NOK: { rate: 10.70, symbol: 'kr', name: 'Norwegian Krone' },
    DKK: { rate: 6.85, symbol: 'kr', name: 'Danish Krone' },
    MYR: { rate: 4.70, symbol: 'RM', name: 'Malaysian Ringgit' },
    NZD: { rate: 1.63, symbol: '$', name: 'New Zealand Dollar' }
  };
  
  // Strategic Forex & Currency Exchange Engine
  const calculateFx = () => {
    setIsCalculatingFx(true);
    
    setTimeout(() => {
      const amount = Number(fxAmount) || 0;
      const fromRateObj = CONVERSION_RATES[fxFrom] || CONVERSION_RATES['USD'];
      const toRateObj = CONVERSION_RATES[fxTo] || CONVERSION_RATES['EUR'];
      
      // Calculate cross rate (both are relative to USD where USD=1)
      const crossRate = toRateObj.rate / fromRateObj.rate;
      const convertedAmount = amount * crossRate;
      
      const rateText = `1 ${fxFrom} = ${crossRate.toFixed(4)} ${fxTo}`;
      
      setFxResult({
        convertedAmount,
        rateText,
        symbol: toRateObj.symbol
      });
      setIsCalculatingFx(false);
    }, 1200);
  };

  // Strategic Turnkey Immigration Concierge Engine
  const assessImmigration = () => {
    setIsAssessingImmi(true);
    
    setTimeout(() => {
      let probability = "75% Moderate Probability";
      let deliverables: string[] = [];

      if (immiTier === "Standard Application Assist") {
        probability = "82% High Probability";
        deliverables = [
          "Initial Eligibility Audit",
          "Document Checklist Preparation",
          "Standard Embassy Booking",
          "Application Review before Submission"
        ];
      } else if (immiTier === "VIP Fast-Track Processing") {
        probability = "91% Very High Probability";
        deliverables = [
          "Dedicated Immigration Attorney",
          "Priority Embassy Interview Booking",
          "100% Document Translation & Notarization",
          "Direct Diplomatic Liaison"
        ];
      } else if (immiTier === "Ultra-Luxury Family Relocation (End-to-End)") {
        probability = "98% Near-Guaranteed Probability";
        deliverables = [
          "Elite Tax & Immigration Counsel Team",
          "VIP Airport Fast-Track & Chauffeur",
          "Private School Placement for Dependents",
          "Turnkey Real Estate & Bank Setup",
          "Full Concierge Relocation Logistics"
        ];
      }

      setImmiResult({
        probability,
        deliverables
      });
      setIsAssessingImmi(false);
    }, 1200);
  };

  // Strategic Global Insurance Partners Engine
  const matchInsuranceProviders = () => {
    setIsAssessingIns(true);
    
    setTimeout(() => {
      let partners = [];

      if (insCategory === "Premium Global Health & Medical") {
        partners = [
          { name: "Cigna Sovereign Health", description: "Comprehensive global medical coverage with zero-deductible premium plans." },
          { name: "Bupa Elite Expat", description: "Priority access to private hospitals worldwide with dedicated health concierges." }
        ];
      } else if (insCategory === "International Life & Wealth Protection") {
        partners = [
          { name: "Allianz Global Wealth", description: "High-net-worth life insurance designed for cross-border legacy planning." },
          { name: "Swiss Re Private Client", description: "Bespoke risk management and wealth preservation structures." },
          { name: "AIA Executive Series", description: "Premium term and whole life solutions for global executives." }
        ];
      } else if (insCategory === "Expat Asset & Real Estate Cover") {
        partners = [
          { name: "Chubb Prestige Home", description: "Comprehensive coverage for high-value overseas properties and collections." },
          { name: "AXA Global Asset Guard", description: "Specialized protection for international real estate portfolios." }
        ];
      } else {
        partners = [
          { name: "Global Premier Partners", description: "Bespoke international coverage." }
        ];
      }

      setInsResult(partners);
      setIsAssessingIns(false);
    }, 1200);
  };

  // Strategic Global Remote Job Board Engine
  const fetchRemoteJobs = () => {
    setIsFetchingJobs(true);
    
    setTimeout(() => {
      let jobs = [];

      let baseSalary = 150000;
      if (jobSalary === "$100k - $150k") {
        baseSalary = 125000;
      } else if (jobSalary === "$150k - $250k") {
        baseSalary = 180000;
      } else if (jobSalary === "$250k+ (Equity Included)") {
        baseSalary = 320000;
      }

      if (jobIndustry === "Technology & AI Engineering") {
        jobs = [
          { title: "Senior VP of Engineering - Fully Remote", company: "NextGen Fintech Global", salary: baseSalary },
          { title: "Lead AI Systems Architect", company: "Quantum Neural Labs", salary: baseSalary * 1.1 }
        ];
      } else if (jobIndustry === "Executive Management (C-Suite)") {
        jobs = [
          { title: "Chief Operations Officer (Remote)", company: "Sovereign Wealth Partners", salary: baseSalary },
          { title: "Global Managing Director", company: "Apex Offshore Solutions", salary: baseSalary * 1.2 }
        ];
      } else if (jobIndustry === "Global Finance & Wealth Advisory") {
        jobs = [
          { title: "Offshore Wealth Manager - Global", company: "Swiss Alliance Capital", salary: baseSalary },
          { title: "Senior Quantitative Analyst", company: "Prime Global Hedge", salary: baseSalary * 1.15 }
        ];
      } else {
        jobs = [
          { title: "Head of Global Marketing Strategy", company: "Vanguard Media Group", salary: baseSalary },
          { title: "Growth Marketing Director", company: "Elevate Global Brands", salary: baseSalary * 0.9 }
        ];
      }

      setJobResult(jobs);
      setIsFetchingJobs(false);
    }, 1200);
  };

  // Strategic Offshore & International Banking Engine
  const fetchBankingPartners = () => {
    setIsFetchingBanks(true);
    
    setTimeout(() => {
      let partners = [];

      if (bankTier === "Personal Digital Nomad Account") {
        partners = [
          { name: "Global Expat NeoBank", description: "Multi-currency holding with 0% FX fees and virtual cards." },
          { name: "Nomad Financial Network", description: "Seamless cross-border transfers and remote account opening." }
        ];
      } else if (bankTier === "Corporate & Business Banking") {
        partners = [
          { name: "Mercury International", description: "Tech-forward business accounts with global treasury management." },
          { name: "Alpha Sovereign Commercial", description: "High-volume corporate routing and multicurrency payroll." }
        ];
      } else if (bankTier === "Private Wealth Management ($1M+)") {
        partners = [
          { name: "Swiss Alpha Private Bank", description: "Dedicated Wealth Manager and bespoke offshore trust structures." },
          { name: "Apex Sovereign Reserve", description: "Premium asset protection and ultra-high-net-worth tax mitigation." },
          { name: "Lombard Global Wealth", description: "Exclusive access to private market investments and family office advisory." }
        ];
      } else {
        partners = [
          { name: "Global Premier Banking", description: "Premium international banking services." }
        ];
      }

      setBankResult(partners);
      setIsFetchingBanks(false);
    }, 1200);
  };

  // Strategic Global Expat & Elite Networking Engine
  const fetchNetworkingCommunities = () => {
    setIsFetchingNetworks(true);
    
    setTimeout(() => {
      let communities = [];

      if (networkInterest === "Tech Founders & VC Mastermind") {
        communities = [
          { name: `Alpha Founders Club - ${networkTargetCountry}`, description: "Invite-only network of 500+ tech executives and venture capitalists." },
          { name: "Global Tech Syndicate", description: "Cross-border tech founders focused on AI and web3." }
        ];
      } else if (networkInterest === "Executive Expat Social Club") {
        communities = [
          { name: "Sovereign Expat Network", description: "Premium social and cultural integration club for senior executives." },
          { name: "The Diplomatic Lounge", description: "Exclusive networking for international diplomats and corporate leaders." }
        ];
      } else if (networkInterest === "Digital Nomad Co-working Hubs") {
        communities = [
          { name: "Nomad Executive Alliance", description: "High-end co-working access and community events for global professionals." },
          { name: "Remote Elite Hub", description: "Curated workspaces and networking for established digital nomads." }
        ];
      } else if (networkInterest === "Real Estate & Wealth Investors Circle") {
        communities = [
          { name: "Global Wealth Syndicate", description: "Private network of international real estate and asset investors." },
          { name: "Apex Investor Club", description: "Exclusive deal flow and mastermind events for high-net-worth individuals." }
        ];
      } else {
        communities = [
          { name: "Global Elite Network", description: "Premium international community." }
        ];
      }

      setNetworkResult(communities);
      setIsFetchingNetworks(false);
    }, 1200);
  };

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

  // Comparison Display Logic
  const getDisplayValue = (country: CountryData, metric: any) => {
    const val = (country as any)[metric.key];
    if (val === undefined || val === null || val === "") return "N/A";
    
    // If it's already a formatted string, return as is (except for rent strings we want to convert)
    if (typeof val === "string" && (val.includes("$") || val.includes("/") || val.includes("Mbps") || val.includes("%")) && metric.key !== "rent") {
      return val;
    }

    if (metric.key === "rent") {
      const formatted = formatCurrency(val);
      const isMonthly = String(val).toLowerCase().includes("mo");
      return formatted + (isMonthly ? " / mo" : "");
    }
    if (metric.key === "healthcare") return typeof val === "number" ? `${val} / 100` : val;
    if (metric.key === "safety") return typeof val === "number" ? `${val} / 100` : val;
    if (metric.key === "internet") return typeof val === "number" ? `${val} Mbps` : val;
    
    return metric.format ? metric.format(val || 0) : `${val}${metric.suffix || ""}`;
  };

  // Admin State - Individual Hooks for build stability
  const isAdmin = user?.email?.toLowerCase() === "moovi7g@gmail.com";
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isUpserting, setIsUpserting] = useState(false);

  // Individual Form States - Initialized as empty strings for clean start
  const [adminCountryName, setAdminCountryName] = useState("");
  const [adminAnnualGrowth, setAdminAnnualGrowth] = useState("");
  const [adminStabilityScore, setAdminStabilityScore] = useState("");
  const [adminCompassIndex, setAdminCompassIndex] = useState("");
  const [adminStrategicStatus, setAdminStrategicStatus] = useState("");
  const [adminCostOfLiving, setAdminCostOfLiving] = useState("");
  const [adminSalary, setAdminSalary] = useState("");
  const [adminTax, setAdminTax] = useState("");
  const [adminRent, setAdminRent] = useState("");
  const [adminHealthcare, setAdminHealthcare] = useState("");
  const [adminSafety, setAdminSafety] = useState("");
  const [adminInternet, setAdminInternet] = useState("");

  // Intelligent Auto-Populate on Type
  const handleCountryNameChange = (newName: string) => {
    setAdminCountryName(newName);
    const searchKey = newName.toLowerCase().trim();
    
    // 1. Instant Search in CORE_DICTIONARY
    if (CORE_DICTIONARY[searchKey]) {
      const data = CORE_DICTIONARY[searchKey];
      setAdminAnnualGrowth(data.annual_growth);
      setAdminStabilityScore(data.stability_score);
      setAdminCompassIndex(String(data.compass_index));
      setAdminStrategicStatus(data.strategic_status);
      setAdminCostOfLiving(String(data.cost_of_living_score));
      setAdminSalary(String(data.average_salary_usd));
      setAdminTax(String(data.tax_rate_percent));
      setAdminRent(data.rent);
      setAdminHealthcare(data.healthcare);
      setAdminSafety(data.safety);
      setAdminInternet(data.internet);
      return;
    }

    // 2. Search Database Collection
    const existing = countries.find(c => c.country_name?.toLowerCase() === searchKey);
    if (existing) {
      setAdminAnnualGrowth(existing.annual_growth || "");
      setAdminStabilityScore(existing.stability_score || "");
      setAdminCompassIndex(String(existing.compass_index || ""));
      setAdminStrategicStatus(existing.strategic_status || "");
      setAdminCostOfLiving(String(existing.cost_of_living_score || ""));
      setAdminSalary(String(existing.average_salary_usd || ""));
      setAdminTax(String(existing.tax_rate_percent || ""));
      setAdminRent(String(existing.rent || ""));
      setAdminHealthcare(String(existing.healthcare || ""));
      setAdminSafety(String(existing.safety || ""));
      setAdminInternet(String(existing.internet || ""));
    } else if (searchKey === "") {
      resetAdminForm();
    }
  };

  const resetAdminForm = () => {
    setAdminCountryName("");
    setAdminAnnualGrowth("");
    setAdminStabilityScore("");
    setAdminCompassIndex("");
    setAdminStrategicStatus("");
    setAdminCostOfLiving("");
    setAdminSalary("");
    setAdminTax("");
    setAdminRent("");
    setAdminHealthcare("");
    setAdminSafety("");
    setAdminInternet("");
  };

  const handleAdminUpsert = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase || !isAdmin) return;

    try {
      setIsUpserting(true);
      const cleanName = adminCountryName.trim();
      
      const existingRef = countries.find(c => c.country_name?.toLowerCase() === cleanName.toLowerCase());
      
      // Construction with "Blank Protection" - Save text strings directly for specified fields
      const payload = {
        country_name: cleanName,
        annual_growth: adminAnnualGrowth || (existingRef?.annual_growth) || "+0.0%",
        stability_score: adminStabilityScore || (existingRef?.stability_score) || "Stable",
        compass_index: adminCompassIndex || (existingRef?.compass_index) || 50,
        strategic_status: adminStrategicStatus || (existingRef?.strategic_status) || "Neutral",
        cost_of_living_score: adminCostOfLiving || (existingRef?.cost_of_living_score) || 70,
        average_salary_usd: adminSalary || (existingRef?.average_salary_usd) || 0,
        tax_rate_percent: adminTax || (existingRef?.tax_rate_percent) || 0,
        rent: adminRent || (existingRef?.rent) || "",
        healthcare: adminHealthcare || (existingRef?.healthcare) || "",
        safety: adminSafety || (existingRef?.safety) || "",
        internet: adminInternet || (existingRef?.internet) || ""
      };

      const { error } = await supabase
        .from('countries')
        .upsert([payload], { onConflict: 'country_name' });

      if (error) throw error;
      
      alert("Matrix Overridden Successfully!");
      triggerNotification("Jurisdiction Matrix Successfully Synchronized.");
      
      // Immediate Live State Refresh
      await fetchCountries();
      
      setIsAdminPanelOpen(false);
      resetAdminForm();
    } catch (err: any) {
      alert("Database Error: " + (err.message || "Unknown synchronization failure."));
      triggerNotification(err.message || "Matrix Synchronization Failure.");
    } finally {
      setIsUpserting(false);
    }
  };

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

  const fetchCountries = async () => {
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
  };

  useEffect(() => {
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
    // 1. Direct PDF File Download via data-driven jsPDF approach
    // This bypasses the DOM rendering engine to avoid oklab color parsing crashes
    triggerNotification(`Generating ${country.country_name} Executive Briefing...`);
    
    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const countryName = country.country_name;
        
        // 3. Wall Street Layout: Deep Dark Background
        doc.setFillColor("#060B13"); // Brand Midnight Hex
        doc.rect(0, 0, 210, 297, "F");

        // Header Branding
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor("#d4af37"); // Premium Gold Matte
        doc.text("EXECUTIVE INTELLIGENCE DOSSIER", 20, 25);
        
        doc.setDrawColor("#d4af37");
        doc.setLineWidth(0.5);
        doc.line(20, 30, 190, 30);

        doc.setFontSize(30);
        doc.setTextColor("#ffffff");
        doc.text(countryName.toUpperCase(), 20, 48);

        // Security Metadata
        doc.setFontSize(9);
        doc.setTextColor("#94a3b8"); // Slate 400
        doc.text(`ARCHIVE REF: GC-SYS-${Math.random().toString(36).substring(7).toUpperCase()}`, 20, 56);
        doc.text(`TIMESTAMP: ${new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC`, 120, 56);

        // 3. Wall Street Layout: Strategic Data Matrix (11 Fields)
        doc.setFontSize(14);
        doc.setTextColor("#d4af37");
        doc.text("STRATEGIC PERFORMANCE METRICS", 20, 75);
        
        const metrics = [
          { label: "Stability Index", value: (country.compass_index || "0") + "/100" },
          { label: "Annual GDP Growth", value: country.annual_growth || "N/A" },
          { label: "Strategic Status", value: country.strategic_status || "Standard" },
          { label: "Stability Score", value: country.stability_score || "N/A" },
          { label: "Average Annual Salary", value: formatCurrency(country.average_salary_usd) },
          { label: "Optimal Tax Rate", value: (country.tax_rate_percent !== undefined ? country.tax_rate_percent : "N/A") + "%" },
          { label: "Cost of Living Score", value: (country.cost_of_living_score || "N/A") + "/100" },
          { 
            label: "Monthly Rent (Avg)", 
            value: (() => {
              const r = country.rent || (countryMetrics[countryName]?.rent || "N/A");
              if (r === "N/A") return r;
              const formatted = formatCurrency(r);
              const isMonthly = String(r).toLowerCase().includes("mo");
              return formatted + (isMonthly ? " / mo" : "");
            })()
          },
          { label: "Healthcare Rating", value: country.healthcare ? `${country.healthcare}/100` : (countryMetrics[countryName]?.healthcare || "N/A") },
          { label: "Safety Rating", value: country.safety ? `${country.safety}/100` : (countryMetrics[countryName]?.safety || "N/A") },
          { label: "Digital Connectivity", value: country.internet ? `${country.internet} Mbps` : (countryMetrics[countryName]?.internet || "N/A") },
        ];

        let yPos = 90;
        metrics.forEach((m, idx) => {
          // Row banding for readability
          if (idx % 2 === 0) {
            doc.setFillColor("#0f172a"); // Dark Slate
            doc.rect(15, yPos - 6, 180, 10, "F");
          }
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor("#94a3b8");
          doc.text(m.label, 20, yPos);
          
          doc.setFont("helvetica", "bold");
          doc.setTextColor("#ffffff");
          // Align value to the right of the label column
          doc.text(String(m.value), 125, yPos);
          
          yPos += 12;
        });

        // 3. Wall Street Layout: Disclaimer & Authority
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor("#64748b");
        const footerLines = [
          "CONFIDENTIALITY NOTICE: This strategic brief is proprietary to Global Compass AI members.",
          "Global Compass AI provides architectural intelligence and baseline metrics for strategic planning goals.",
          "Jurisdictional performance is simulated using neural intelligence frameworks and historical data sets."
        ];
        doc.text(footerLines, 20, 245);

        // Executive Signature Footer
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor("#d4af37");
        doc.text("GLOBAL COMPASS AI", 20, 275);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor("#64748b");
        doc.text("M M RAJU Signature Architecture Series", 60, 275);
        
        doc.setDrawColor("#1e293b");
        doc.setLineWidth(0.2);
        doc.line(20, 280, 190, 280);

        // 4. Direct Automatic Download
        doc.save(`${country.country_name.replace(/\s+/g, '_')}_Intelligence_Report.pdf`);
        triggerNotification("Executive Briefing Export Complete.");

      } catch (error: any) {
        // 5. Thread Safety: Safe Abort
        alert("Strategic Export Failed: " + error.message);
      }
    }, 150);
  };

  const formatCurrency = (val?: number | string) => {
    if (val === undefined || val === null || val === "") return "N/A";
    const num = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return String(val);
    
    const config = CONVERSION_RATES[selectedCurrency];
    const converted = num * config.rate;
    
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: selectedCurrency, 
      maximumFractionDigits: 0 
    }).format(converted);
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
                {user?.email?.toLowerCase() === "moovi7g@gmail.com" && (
                  <button 
                    onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-600/30 text-amber-600 text-xs font-bold hover:bg-amber-600/10 transition-all uppercase tracking-widest cursor-pointer"
                  >
                    <Lock className="w-3 h-3" /> Admin Panel
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full border border-white/10 hover:border-terracotta-start/50 hover:text-slate-400 transition-all cursor-pointer"
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
            {/* Global Currency Control Toolbar */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/60 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] -z-10" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">GLOBAL DATA LOCALIZATION</h3>
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="animate-pulse">✨</span> PLATFORM DISPLAY CURRENCY:
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex items-center gap-3 bg-[#111111]/90 backdrop-blur-xl px-5 py-3 rounded-xl border border-[#d4af37]/40 hover:border-[#d4af37] transition-all group/select shadow-inner shadow-black">
                  <select 
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="bg-transparent border-none text-sm font-bold text-white focus:outline-none cursor-pointer tracking-wider min-w-[200px] appearance-none z-10"
                    style={{ backgroundImage: 'none' }}
                  >
                    {Object.entries(CONVERSION_RATES).map(([code, config]) => (
                      <option key={code} value={code} className="bg-[#111111] text-white text-base py-2">
                        {code} ({config.symbol}) — {config.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 w-2.5 h-2.5 border-r-2 border-b-2 border-[#d4af37]/60 rotate-45 transform -translate-y-0.5 group-hover/select:border-[#d4af37] transition-all pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 🧮 EXECUTIVE TAX & TAKE-HOME PAY CALCULATOR */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold/5 blur-[80px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase">🧮 EXECUTIVE TAX & TAKE-HOME PAY CALCULATOR</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Inputs */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Select Jurisdiction</label>
                      <div className="relative group/select">
                        <select 
                          value={calcCountry}
                          onChange={(e) => setCalcCountry(e.target.value)}
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Choose a Country</option>
                          {countries.map(c => (
                            <option key={c.country_name} value={c.country_name}>{c.country_name}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45 pointer-events-none group-hover/select:border-brand-gold transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Annual Income ({CONVERSION_RATES[selectedCurrency]?.symbol || '$'})</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 font-bold">{CONVERSION_RATES[selectedCurrency]?.symbol || '$'}</div>
                        <input 
                          type="number" 
                          value={annualIncome}
                          onChange={(e) => setAnnualIncome(e.target.value === "" ? "" : Number(e.target.value))}
                          onFocus={(e) => e.target.select()}
                          placeholder="Enter Amount"
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-12 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-black/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-center gap-6">
                    {(() => {
                      if (!countries || countries.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center p-10 text-center space-y-3">
                            <Loader2 className="w-6 h-6 animate-spin text-brand-gold" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Synchronizing Neural Matrix...</span>
                          </div>
                        );
                      }
                      const incomeNum = Number(annualIncome) || 0;
                      const countryData = countries.find(c => c.country_name === calcCountry) || countries[0];
                      const taxRate = countryData ? Number(countryData.tax_rate_percent || 0) : 0;
                      const totalTax = incomeNum * (taxRate / 100);
                      const takeHomePay = incomeNum - totalTax;

                      const formatPlain = (num: number) => {
                        return new Intl.NumberFormat('en-US', { 
                          style: 'currency', 
                          currency: selectedCurrency, 
                          maximumFractionDigits: 0 
                        }).format(num);
                      };

                      return (
                        <>
                          <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-slate-400 text-sm font-medium">Total Annual Salary</span>
                            <span className="text-white font-bold text-xl">{formatPlain(incomeNum)}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/5 pb-4 px-2">
                            <div className="flex flex-col">
                              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                Estimated Tax Logic
                              </span>
                              <span className="text-slate-400 text-xs">{calcCountry} Statutory Rate: {taxRate}%</span>
                            </div>
                            <span className="text-red-400 font-bold">{formatPlain(totalTax)}</span>
                          </div>
                          <div className="flex justify-between items-center bg-brand-gold/10 p-5 rounded-xl border border-brand-gold/20 shadow-lg shadow-amber-600/5">
                            <div className="flex flex-col">
                              <span className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em]">Net Take-Home Pay</span>
                              <span className="text-white text-xs font-medium opacity-60">Post-Tax Optimization</span>
                            </div>
                            <span className="text-white font-extrabold text-3xl tracking-tighter">
                              {formatPlain(takeHomePay)}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* 💰 EXECUTIVE SAVINGS & $1M MILESTONE PLANNER */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[80px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase">💰 EXECUTIVE SAVINGS & $1M MILESTONE PLANNER</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Inputs */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Estimated Monthly Income</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 font-bold">{CONVERSION_RATES[selectedCurrency]?.symbol || '$'}</div>
                        <input 
                          type="number" 
                          value={savingsIncome}
                          onChange={(e) => setSavingsIncome(e.target.value === "" ? "" : Number(e.target.value))}
                          onFocus={(e) => e.target.select()}
                          placeholder="Monthly Income"
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-12 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Estimated Monthly Expenses</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 font-bold">{CONVERSION_RATES[selectedCurrency]?.symbol || '$'}</div>
                        <input 
                          type="number" 
                          value={savingsExpenses}
                          onChange={(e) => setSavingsExpenses(e.target.value === "" ? "" : Number(e.target.value))}
                          onFocus={(e) => e.target.select()}
                          placeholder="Monthly Expenses"
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-12 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-black/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-center gap-6">
                    {(() => {
                      const inc = Number(savingsIncome) || 0;
                      const exp = Number(savingsExpenses) || 0;
                      const netSavings = Math.max(0, inc - exp);
                      const annualSavings = netSavings * 12;
                      
                      // Milestone calculation (reaching 1,000,000 units of selected currency)
                      const milestone = 1000000;
                      let timeToMilestone = "N/A";
                      
                      if (netSavings > 0) {
                        const totalMonths = milestone / netSavings;
                        const years = Math.floor(totalMonths / 12);
                        const months = Math.round(totalMonths % 12);
                        
                        if (years === 0) {
                          timeToMilestone = `${months} Month${months !== 1 ? 's' : ''}`;
                        } else if (years > 100) {
                          timeToMilestone = "100+ Years";
                        } else {
                          timeToMilestone = `${years} Year${years !== 1 ? 's' : ''} ${months > 0 ? `& ${months} Month${months !== 1 ? 's' : ''}` : ''}`;
                        }
                      } else {
                        timeToMilestone = "Infinite Horizon";
                      }

                      const formatPlain = (num: number) => {
                        return new Intl.NumberFormat('en-US', { 
                          style: 'currency', 
                          currency: selectedCurrency, 
                          maximumFractionDigits: 0 
                        }).format(num);
                      };

                      return (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Monthly Net Savings</span>
                              <span className="text-white font-bold text-lg">{formatPlain(netSavings)}</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Annualized Accumulation</span>
                              <span className="text-white font-bold text-lg">{formatPlain(annualSavings)}</span>
                            </div>
                          </div>
                          
                          <div className="bg-brand-gold/10 p-5 rounded-xl border border-brand-gold/20 shadow-lg shadow-amber-600/5 text-center">
                            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">TIME TO REACH {formatPlain(milestone)} MILESTONE</span>
                            <span className="text-white font-extrabold text-3xl tracking-tighter">
                              {timeToMilestone}
                            </span>
                            <div className="mt-2 text-white/40 text-[9px] uppercase tracking-widest">Calculated at current savings velocity</div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 EXECUTIVE COST-OF-LIVING ESTIMATOR */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold/5 blur-[80px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <Home className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase">📊 EXECUTIVE COST-OF-LIVING ESTIMATOR</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Inputs */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Select Jurisdiction</label>
                      <div className="relative group/select">
                        <select 
                          value={estCountry}
                          onChange={(e) => setEstCountry(e.target.value)}
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={c.country_name} value={c.country_name} className="bg-[#111111] text-white">{c.country_name}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45 pointer-events-none group-hover/select:border-brand-gold transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Lifestyle Tier Selection</label>
                      <div className="flex gap-2 p-1 bg-black/40 border border-white/5 rounded-xl">
                        {(['Basic', 'Executive', 'Luxury'] as const).map((tier) => (
                          <button
                            key={tier}
                            onClick={() => setLifestyleTier(tier)}
                            className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${lifestyleTier === tier ? 'bg-brand-gold text-black shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                          >
                            {tier === 'Luxury' ? 'Ultra Luxury' : tier === 'Executive' ? 'Executive' : 'Basic'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-black/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-center gap-6">
                    {(() => {
                      if (!countries || countries.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center p-10 text-center space-y-3">
                            <Loader2 className="w-6 h-6 animate-spin text-brand-gold" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Calculating Life Vectors...</span>
                          </div>
                        );
                      }
                      const countryData = countries.find(c => c.country_name === estCountry) || countries[0];
                      const rawRent = countryData?.rent || 0;
                      const rentVal = typeof rawRent === 'number' ? rawRent : parseFloat(String(rawRent).replace(/[^0-9.]/g, '')) || 0;
                      
                      let housing = 0;
                      let utilities = 0;
                      
                      if (lifestyleTier === 'Basic') {
                        housing = rentVal;
                        utilities = 1500;
                      } else if (lifestyleTier === 'Executive') {
                        housing = rentVal * 1.5;
                        utilities = 3000;
                      } else {
                        housing = rentVal * 2.5;
                        utilities = 6000;
                      }

                      const totalCost = housing + utilities;
                      const conv = CONVERSION_RATES[selectedCurrency] || CONVERSION_RATES['USD'];

                      const formatWithConv = (num: number) => {
                        const converted = num * conv.rate;
                        return new Intl.NumberFormat('en-US', { 
                          style: 'currency', 
                          currency: selectedCurrency, 
                          maximumFractionDigits: 0 
                        }).format(converted);
                      };

                      return (
                        <>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                              <span className="text-slate-400 text-sm font-medium">Estimated Housing / Rent</span>
                              <span className="text-white font-bold">{formatWithConv(housing)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                              <span className="text-slate-400 text-sm font-medium">Estimated Utilities & Food</span>
                              <span className="text-white font-bold">{formatWithConv(utilities)}</span>
                            </div>
                          </div>

                          <div className="bg-brand-gold/10 p-5 rounded-xl border border-brand-gold/20 shadow-lg shadow-amber-600/5 mt-2">
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.15em]">Total Monthly Cost-of-Living</span>
                                <span className="text-white text-xs font-medium opacity-60">Estimated {lifestyleTier} Tier</span>
                              </div>
                              <span className="text-white font-extrabold text-3xl tracking-tighter">
                                {formatWithConv(totalCost)}
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* ✈️ EXECUTIVE RELOCATION UPFRONT BUDGET PLANNER */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 blur-[100px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase">✈️ EXECUTIVE RELOCATION UPFRONT BUDGET PLANNER</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-1">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Relocation Jurisdiction</label>
                      <div className="relative group/select">
                        <select 
                          value={relocCountry}
                          onChange={(e) => setRelocCountry(e.target.value)}
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={c.country_name} value={c.country_name} className="bg-[#111111] text-white">{c.country_name}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45 pointer-events-none group-hover/select:border-brand-gold transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Moving Party Size</label>
                      <div className="relative group/select">
                        <select 
                          value={partySize}
                          onChange={(e) => setPartySize(e.target.value as any)}
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Single">Single Professional</option>
                          <option value="Couple">Couple</option>
                          <option value="Family">Family (3-4 Members)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45 pointer-events-none group-hover/select:border-brand-gold transition-colors" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Logistics & Shipping Volume</label>
                      <div className="relative group/select">
                        <select 
                          value={shippingVolume}
                          onChange={(e) => setShippingVolume(e.target.value as any)}
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Minimal">Minimal (Luggage Only)</option>
                          <option value="Medium">Medium (Partial Home)</option>
                          <option value="Heavy">Heavy (Full Container)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-b border-white/40 rotate-45 pointer-events-none group-hover/select:border-brand-gold transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-black/40 rounded-2xl border border-white/5 p-6 flex flex-col justify-center gap-5">
                    {(() => {
                      if (!countries || countries.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center p-10 text-center space-y-3">
                            <Loader2 className="w-6 h-6 animate-spin text-brand-gold" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Assembling Sovereign Assets...</span>
                          </div>
                        );
                      }
                      const countryData = countries.find(c => c.country_name === relocCountry) || countries[0];
                      const rawRent = countryData?.rent || 0;
                      const rentVal = typeof rawRent === 'number' ? rawRent : parseFloat(String(rawRent).replace(/[^0-9.]/g, '')) || 0;

                      let partyFactor = 1;
                      if (partySize === "Couple") partyFactor = 2;
                      if (partySize === "Family") partyFactor = 4;

                      let shippingCost = 3500;
                      if (shippingVolume === "Minimal") shippingCost = 750;
                      if (shippingVolume === "Heavy") shippingCost = 9000;

                      const visaFees = 1200 * partyFactor;
                      const flightCosts = 850 * partyFactor;
                      const securityDeposit = rentVal * 2;
                      const totalUpfront = visaFees + flightCosts + shippingCost + securityDeposit;

                      const conv = CONVERSION_RATES[selectedCurrency] || CONVERSION_RATES['USD'];
                      const formatWithConv = (num: number) => {
                        const converted = num * conv.rate;
                        return new Intl.NumberFormat('en-US', { 
                          style: 'currency', 
                          currency: selectedCurrency, 
                          maximumFractionDigits: 0 
                        }).format(converted);
                      };

                      return (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <div className="flex flex-col border-b border-white/5 pb-2">
                                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Visa & Admin Fees</span>
                                <span className="text-white font-bold text-sm">{formatWithConv(visaFees)}</span>
                              </div>
                              <div className="flex flex-col border-b border-white/5 pb-2">
                                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Flights & Travel</span>
                                <span className="text-white font-bold text-sm">{formatWithConv(flightCosts)}</span>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex flex-col border-b border-white/5 pb-2">
                                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Logistics & Freight</span>
                                <span className="text-white font-bold text-sm">{formatWithConv(shippingCost)}</span>
                              </div>
                              <div className="flex flex-col border-b border-white/5 pb-2">
                                <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Housing Security Deposit</span>
                                <span className="text-white font-bold text-sm">{formatWithConv(securityDeposit)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-brand-gold/10 p-5 rounded-xl border border-brand-gold/20 shadow-lg shadow-amber-600/5 mt-2">
                            <div className="flex flex-col text-center">
                              <span className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Total Estimated Capital Required</span>
                              <span className="text-white font-extrabold text-4xl tracking-tighter">
                                {formatWithConv(totalUpfront)}
                              </span>
                              <div className="mt-2 text-white/40 text-[8px] uppercase tracking-widest">Estimated upfront deployment for {partySize} relocation</div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* 🧠 PROPRIETARY AI RELOCATION ADVISOR & MATCH ENGINE */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/40 p-8 shadow-2xl shadow-black/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🧠 PROPRIETARY AI RELOCATION ADVISOR & MATCH ENGINE</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Powered by M M Raju Neural Infrastructure</p>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-brand-gold/40 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Neural Inputs */}
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest ml-1">Target Annual Salary Goal</label>
                        <span className="text-white/40 text-[10px] font-mono">{CONVERSION_RATES[selectedCurrency].symbol}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/60 font-bold">{CONVERSION_RATES[selectedCurrency].symbol}</div>
                        <input 
                          type="number" 
                          value={aiTargetSalary}
                          onChange={(e) => setAiTargetSalary(e.target.value === "" ? "" : Number(e.target.value))}
                          onFocus={(e) => e.target.select()}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 text-white font-bold text-lg focus:border-brand-gold focus:outline-none transition-all"
                          placeholder="e.g. 200000"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest ml-1">Max Acceptable Tax Rate</label>
                        <span className="text-brand-gold font-bold font-mono">{aiMaxTax}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="50"
                        value={aiMaxTax}
                        onChange={(e) => setAiMaxTax(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                      <div className="flex justify-between text-[10px] text-white font-bold uppercase tracking-widest">
                        <span>Tax Haven (0%)</span>
                        <span>High Utility (50%)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest ml-1">Core Strategic Priority</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["Wealth", "Safety", "Healthcare"] as const).map(p => (
                          <button
                            key={p}
                            onClick={() => setAiPriority(p)}
                            className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${aiPriority === p ? 'bg-brand-gold border-brand-gold text-black shadow-xl shadow-amber-600/20' : 'bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white'}`}
                          >
                            <div className="flex flex-col items-center">
                              {p === "Wealth" ? <TrendingUp className="w-3 h-3 mb-1" /> : p === "Safety" ? <Shield className="w-3 h-3 mb-1" /> : <HeartPulse className="w-3 h-3 mb-1" />}
                              {p}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={runAiMatch}
                      disabled={isAiCalculating}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-amber-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isAiCalculating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing Neural Vectors...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          <span>Run AI Neural Match</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Neural Output Result */}
                  <div className="relative min-h-[300px]">
                    <AnimatePresence mode="wait">
                      {!aiResult && !isAiCalculating ? (
                        <motion.div 
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex flex-col items-center justify-center text-center p-8 bg-black/20 rounded-3xl border border-dashed border-white/10"
                        >
                          <Cpu className="w-12 h-12 text-white/10 mb-4" />
                          <p className="text-white/30 text-[10px] font-medium uppercase tracking-widest leading-relaxed">
                            Configure your strategic parameters and initiate neural matching to identify your optimal sovereign destination.
                          </p>
                        </motion.div>
                      ) : isAiCalculating ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex flex-col items-center justify-center space-y-6"
                        >
                          <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-2 border-brand-gold/20 rounded-full" />
                            <div className="absolute inset-0 border-t-2 border-brand-gold rounded-full animate-spin" />
                            <Brain className="absolute inset-0 m-auto w-8 h-8 text-brand-gold animate-pulse" />
                          </div>
                          <div className="space-y-2 text-center">
                            <h4 className="text-white font-bold uppercase tracking-[0.3em] text-xs">Analyzing 32 Global Jurisdictions</h4>
                            <p className="text-brand-gold/60 text-[8px] uppercase tracking-widest animate-pulse">Filtering Stability Indices & Fiscal Profiles</p>
                          </div>
                        </motion.div>
                      ) : (
                        aiResult && (
                          <motion.div 
                            key="result"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="h-full bg-gradient-to-br from-black/60 to-black/20 rounded-3xl border border-brand-gold/20 p-8 flex flex-col gap-6"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="bg-brand-gold/10 text-brand-gold text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-brand-gold/20">Optimal Match Found</span>
                                <h4 className="text-4xl font-black text-white tracking-tighter mt-3 uppercase">{aiResult.country.country_name}</h4>
                              </div>
                              <div className="text-right">
                                <span className="text-brand-gold text-3xl font-black">{aiResult.score}%</span>
                                <p className="text-white/40 text-[8px] uppercase tracking-widest font-bold">Compatibility Score</p>
                              </div>
                            </div>

                            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 relative group shadow-2xl shadow-black/40">
                              <div className="absolute -top-3 left-6 px-2 bg-[#1a1a1a] text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] opacity-100">Executive AI Summary</div>
                              <p className="text-[#ffffff] text-sm md:text-base leading-relaxed font-semibold italic opacity-100">
                                "{aiResult.summary}"
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-auto">
                              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <span className="text-slate-300 text-[8px] font-bold uppercase tracking-widest block mb-1">Fiscal Efficiency</span>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                                  <div className="h-full bg-brand-gold" style={{ width: `${100 - (aiResult.country.tax_rate_percent || 0) * 2}%` }} />
                                </div>
                              </div>
                              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                                <span className="text-slate-300 text-[8px] font-bold uppercase tracking-widest block mb-1">Strategic Index</span>
                                <div className="text-white font-bold text-sm">Level {Math.ceil((aiResult.country.compass_index || 50) / 10)} / 10</div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 📈 PROPRIETARY AI GLOBAL SALARY PREDICTOR */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">📈 PROPRIETARY AI GLOBAL SALARY PREDICTOR</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Advanced Industry-Weight Alignment Engine</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Market Jurisdiction</label>
                        <select 
                          value={salaryCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => {
                              setSalaryCountry(val);
                            });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={c.country_name} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Core Industry / Profession</label>
                        <select 
                          value={industry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => {
                              setIndustry(val);
                            });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Technology & AI" className="bg-[#1a1a1a]">Technology & AI</option>
                          <option value="Finance & Investment" className="bg-[#1a1a1a]">Finance & Investment</option>
                          <option value="Healthcare & BioTech" className="bg-[#1a1a1a]">Healthcare & BioTech</option>
                          <option value="Executive Management" className="bg-[#1a1a1a]">Executive Management</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Years of Experience</label>
                        <input 
                          type="number"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value === "" ? "" : Number(e.target.value))}
                          onFocus={(e) => e.target.select()}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                        />
                    </div>

                    <button 
                      onClick={predictSalary}
                      disabled={isPredicting}
                      className="md:col-span-2 w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isPredicting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Calculating Strategic Brackets...</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          <span>Predict Strategic Salary</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Results Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 flex flex-col justify-center min-h-[250px]">
                    <AnimatePresence mode="wait">
                      {!predictedSalaryResult && !isPredicting ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                          <BarChart3 className="w-12 h-12" />
                          <p className="text-[10px] font-bold uppercase tracking-widest">Select parameters to generate market predictions</p>
                        </div>
                      ) : isPredicting ? (
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Running Monte Carlo Simulations...</p>
                        </div>
                      ) : (
                        predictedSalaryResult && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-6"
                          >
                            <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">Estimated Market Range</span>
                                <div className="text-white text-3xl font-black tracking-tighter">
                                  {(() => {
                                    const conv = CONVERSION_RATES[selectedCurrency];
                                    const f = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency, maximumFractionDigits: 0 }).format(n * conv.rate);
                                    return `${f(predictedSalaryResult.low)} — ${f(predictedSalaryResult.high)}`;
                                  })()}
                                </div>
                                <p className="text-white/40 text-[9px] uppercase tracking-widest leading-relaxed">Annual recurring compensation estimate for {industry}</p>
                              </div>
                            </div>

                            <div className="h-px bg-white/5 w-full" />

                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Talent Demand Index</span>
                                <span className="text-white font-bold text-sm mt-1">{predictedSalaryResult.demand}</span>
                              </div>
                              <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${predictedSalaryResult.demand === 'CRITICAL SHORTAGE' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold'}`}>
                                {predictedSalaryResult.demand === 'CRITICAL SHORTAGE' ? 'HIGHEST PRIORITY' : 'High Market Index'}
                              </div>
                            </div>

                            <div className="bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-xl flex items-center gap-3">
                              <ShieldCheck className="w-5 h-5 text-brand-gold" />
                              <p className="text-[10px] text-white/60 font-medium leading-relaxed italic">
                                Prediction assumes Tier-1 corporate presence and aligns with the top 25th percentile of the local executive market in {salaryCountry}.
                              </p>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🗺️ PROPRIETARY AI VISA ROADMAP & IMMIGRATION ENGINE */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Plane className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🗺️ PROPRIETARY AI VISA ROADMAP & IMMIGRATION ENGINE</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Sovereign Jurisdictional Mobility Protocol</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={visaCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setVisaCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={c.country_name} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Visa Pathway Stream</label>
                        <select 
                          value={visaPathway}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setVisaPathway(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Golden Visa / Residency by Investment" className="bg-[#1a1a1a]">Golden Visa / Residency by Investment</option>
                          <option value="Digital Nomad & Remote Work Permit" className="bg-[#1a1a1a]">Digital Nomad & Remote Work Permit</option>
                          <option value="Skilled Tech & Executive Professional Visa" className="bg-[#1a1a1a]">Skilled Tech & Executive Professional Visa</option>
                        </select>
                    </div>

                    <button 
                      onClick={generateVisaRoadmap}
                      disabled={isGeneratingRoadmap}
                      className="md:col-span-2 w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isGeneratingRoadmap ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Adjudicating Roadmap Protocol...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Generate Immigration Roadmap</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Roadmap Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[350px] relative">
                    <AnimatePresence mode="wait">
                      {!visaRoadmap && !isGeneratingRoadmap ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Plane className="w-12 h-12" />
                          <p className="text-[10px] font-bold uppercase tracking-widest">Select stream to synchronize mobility data</p>
                        </div>
                      ) : isGeneratingRoadmap ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Running Sequential Sovereignty Matches...</p>
                        </div>
                      ) : (
                        visaRoadmap && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">Strategic Implementation Timeline</span>
                                <div className="text-white text-xl font-bold mt-1 uppercase tracking-tight">{visaPathway}</div>
                              </div>
                              <div className="text-right">
                                <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest block">Est. Duration</span>
                                <span className="text-brand-gold font-black text-sm">{visaRoadmap.totalTime}</span>
                              </div>
                            </div>

                            <div className="space-y-4 relative ml-4 border-l border-white/5 pl-6">
                              {visaRoadmap.timeline.map((item, idx) => (
                                <div key={idx} className="relative">
                                  <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                                  <div className="space-y-0.5">
                                    <div className="text-white font-bold text-xs uppercase tracking-wider">{item.step}</div>
                                    <p className="text-white/40 text-[10px] italic">{item.detail}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="h-px bg-white/5 w-full" />

                            <div className="space-y-3">
                              <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest block">Executive Document Checklist</span>
                              <div className="grid grid-cols-2 gap-2">
                                {visaRoadmap.documents.map((doc, idx) => (
                                  <div key={idx} className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                                    <CheckCircle2 className="w-3 h-3 text-brand-gold" />
                                    <span className="text-white/80 text-[9px] font-medium uppercase tracking-tight">{doc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🤖 PROPRIETARY NEURAL AI SAVINGS PLANNER */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🤖 PROPRIETARY NEURAL AI SAVINGS PLANNER</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Asset Allocation & Wealth Velocity Engine</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Optimization Strategy</label>
                        <select 
                          value={savingsStrategy}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setSavingsStrategy(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Capital Preservation (Low Risk)" className="bg-[#1a1a1a]">Capital Preservation (Low Risk)</option>
                          <option value="Balanced Wealth Accumulation" className="bg-[#1a1a1a]">Balanced Wealth Accumulation</option>
                          <option value="Aggressive $1M Growth Velocity" className="bg-[#1a1a1a]">Aggressive $1M Growth Velocity</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Additional Monthly AI Injection</label>
                        <input 
                          type="number"
                          value={savingsMonthly}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setSavingsMonthly(val === "" ? "" : Number(val)));
                          }}
                          onFocus={(e) => e.target.select()}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                        />
                    </div>

                    <button 
                      onClick={optimizeSavingsDistribution}
                      disabled={isOptimizingSavings}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isOptimizingSavings ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing Allocation Arrays...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Optimize Savings Distribution</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!savingsAllocation && !isOptimizingSavings ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Cpu className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select strategy to compute asset velocity</p>
                        </div>
                      ) : isOptimizingSavings ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Running Monte Carlo Simulations...</p>
                        </div>
                      ) : (
                        savingsAllocation && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                          >
                            <div>
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">Dynamic Asset Allocation Breakdown</span>
                                
                                <div className="space-y-4 mt-6">
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-white uppercase tracking-wider">
                                      <span>Safe Sovereign Havens</span>
                                      <span>{savingsAllocation.safe}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                      <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${savingsAllocation.safe}%` }} />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-white uppercase tracking-wider">
                                      <span>High-Yield Cash Deposits</span>
                                      <span>{savingsAllocation.cash}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                      <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${savingsAllocation.cash}%` }} />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-white uppercase tracking-wider">
                                      <span>Strategic Growth Assets</span>
                                      <span>{savingsAllocation.growth}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                      <div className="bg-brand-gold h-full transition-all duration-1000" style={{ width: `${savingsAllocation.growth}%` }} />
                                    </div>
                                  </div>
                                </div>
                            </div>

                            <div className="h-px bg-white/5 w-full mt-2" />

                            <div className="bg-brand-gold/10 border border-brand-gold/20 p-4 rounded-xl flex items-center gap-4">
                              <Sparkles className="w-8 h-8 text-brand-gold shrink-0" />
                              <div className="flex flex-col">
                                <span className="text-brand-gold text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">AI Timeline Compression Alert</span>
                                <span className="text-white text-sm font-bold leading-snug">
                                  {savingsAllocation.timeline} based on a monthly injection of <span className="text-brand-gold">{(() => {
                                    const conv = CONVERSION_RATES[selectedCurrency];
                                    const val = Number(savingsMonthly) || 0;
                                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency, maximumFractionDigits: 0 }).format(val * conv.rate);
                                  })()}</span>
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🌐 PROPRIETARY AI REMOTE-WORK & NOMAD ADVISOR */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🌐 PROPRIETARY AI REMOTE-WORK & NOMAD ADVISOR</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Digital Infrastructure & Remote Compliance Engine</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={nomadCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setNomadCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={c.country_name} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Monthly Remote Revenue</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">
                            {CONVERSION_RATES[selectedCurrency]?.symbol || '$'}
                          </span>
                          <input 
                            type="number"
                            value={nomadRevenue}
                            onChange={(e) => {
                              const val = e.target.value;
                              startTransition(() => setNomadRevenue(val === "" ? "" : Number(val)));
                            }}
                            onFocus={(e) => e.target.select()}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                          />
                        </div>
                    </div>

                    <button 
                      onClick={analyzeRemoteFeasibility}
                      disabled={isAnalyzingNomad}
                      className="md:col-span-2 w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isAnalyzingNomad ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Adjudicating Remote Protocols...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Analyze Remote Feasibility</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!nomadResult && !isAnalyzingNomad ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Wifi className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select parameters to compute remote viability</p>
                        </div>
                      ) : isAnalyzingNomad ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Computing Infrastructure Feasibility...</p>
                        </div>
                      ) : (
                        nomadResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                          >
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">Remote Feasibility Score</span>
                                <div className="text-white text-2xl font-black mt-1 uppercase tracking-tight">{nomadResult.score}</div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest block">Infrastructure Checklist</span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col justify-center bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-1">Internet Speed</span>
                                  <div className="flex items-center gap-2">
                                    <Wifi className="w-4 h-4 text-emerald-500" />
                                    <span className="text-white text-xs font-bold">{nomadResult.internet} Mbps Avg</span>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-center bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-1">Nomad Program</span>
                                  <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                                    <span className="text-white text-xs font-bold">{nomadResult.visaStatus}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="h-px bg-white/5 w-full mt-2" />

                            <div className="bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-xl flex items-center gap-4">
                              <Brain className="w-6 h-6 text-brand-gold shrink-0" />
                              <div className="flex flex-col">
                                <span className="text-brand-gold text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">AI Executive Nomad Insight</span>
                                <span className="text-white text-xs font-medium leading-relaxed">
                                  {nomadResult.insight}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 📊 EXECUTIVE PURCHASING POWER & PPP CALCULATOR */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Scale className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">📊 EXECUTIVE PURCHASING POWER & PPP CALCULATOR</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Cross-Border Wealth Parity Engine</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Base Jurisdiction</label>
                        <select 
                          value={pppBaseCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setPppBaseCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={`base-${c.country_name}`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={pppTargetCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setPppTargetCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={`target-${c.country_name}`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Base Annual Salary</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">
                            {CONVERSION_RATES[selectedCurrency]?.symbol || '$'}
                          </span>
                          <input 
                            type="number"
                            value={pppBaseSalary}
                            onChange={(e) => {
                              const val = e.target.value;
                              startTransition(() => setPppBaseSalary(val === "" ? "" : Number(val)));
                            }}
                            onFocus={(e) => e.target.select()}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                          />
                        </div>
                    </div>

                    <button 
                      onClick={calculatePPP}
                      disabled={isCalculatingPPP}
                      className="md:col-span-2 w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isCalculatingPPP ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Computing Delta Parity...</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          <span>Calculate PPP Equivalent</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!pppResult && !isCalculatingPPP ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Scale className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select jurisdictions to compute purchasing power delta</p>
                        </div>
                      ) : isCalculatingPPP ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Running Parity Indexing...</p>
                        </div>
                      ) : (
                        pppResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                          >
                            <div>
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest">Real Purchasing Power Equivalent</span>
                                <div className="mt-4 p-6 bg-gradient-to-r from-amber-900/40 to-brand-gold/10 border border-brand-gold/30 rounded-2xl">
                                  <div className="text-white text-4xl font-black tracking-tighter">
                                    {(() => {
                                      const conv = CONVERSION_RATES[selectedCurrency];
                                      return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency, maximumFractionDigits: 0 }).format(pppResult.equivalentSalary * conv.rate);
                                    })()}
                                  </div>
                                  <div className="text-white/60 text-xs font-medium mt-2">
                                    Equivalent salary required in <span className="text-white font-bold">{pppTargetCountry}</span>
                                  </div>
                                </div>
                            </div>

                            <div className="h-px bg-white/5 w-full mt-2" />

                            <div className="bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-xl flex items-center gap-4">
                              <Brain className="w-6 h-6 text-brand-gold shrink-0" />
                              <div className="flex flex-col">
                                <span className="text-brand-gold text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">Parity Intelligence Alert</span>
                                <span className="text-white text-xs font-medium leading-relaxed">
                                  {pppResult.insight}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🏛️ PROPRIETARY CORPORATE & CAPITAL GAINS TAX ENGINE */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🏛️ PROPRIETARY CORPORATE & CAPITAL GAINS TAX ENGINE</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Strategic Tax Liability & Retained Profit Calculator</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={taxTargetCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setTaxTargetCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={`tax-${c.country_name}`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Annual Business Revenue / Corporate Income</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">
                            {CONVERSION_RATES[selectedCurrency]?.symbol || '$'}
                          </span>
                          <input 
                            type="number"
                            value={taxCorpRevenue}
                            onChange={(e) => {
                              const val = e.target.value;
                              startTransition(() => setTaxCorpRevenue(val === "" ? "" : Number(val)));
                            }}
                            onFocus={(e) => e.target.select()}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                          />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Annual Capital Gains / Investment Profit</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">
                            {CONVERSION_RATES[selectedCurrency]?.symbol || '$'}
                          </span>
                          <input 
                            type="number"
                            value={taxCapGains}
                            onChange={(e) => {
                              const val = e.target.value;
                              startTransition(() => setTaxCapGains(val === "" ? "" : Number(val)));
                            }}
                            onFocus={(e) => e.target.select()}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                          />
                        </div>
                    </div>

                    <button 
                      onClick={calculateTaxLiability}
                      disabled={isCalculatingTax}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isCalculatingTax ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Adjudicating Liabilities...</span>
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5" />
                          <span>Calculate Strategic Tax Liability</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!taxResult && !isCalculatingTax ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Landmark className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select parameters to compute tax exposure</p>
                        </div>
                      ) : isCalculatingTax ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Running Sovereign Tax Matrices...</p>
                        </div>
                      ) : (
                        taxResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                          >
                            <div>
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-4">Liability Breakdown</span>
                                
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="flex flex-col">
                                      <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Corporate Tax Burden ({taxResult.corpRate}%)</span>
                                      <span className="text-white text-lg font-bold">
                                        {(() => {
                                          const conv = CONVERSION_RATES[selectedCurrency];
                                          return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency, maximumFractionDigits: 0 }).format(taxResult.corpTaxAmount * conv.rate);
                                        })()}
                                      </span>
                                    </div>
                                    <PieChart className="w-6 h-6 text-red-400" />
                                  </div>

                                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="flex flex-col">
                                      <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Capital Gains Tax ({taxResult.capRate}%)</span>
                                      <span className="text-white text-lg font-bold">
                                        {(() => {
                                          const conv = CONVERSION_RATES[selectedCurrency];
                                          return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency, maximumFractionDigits: 0 }).format(taxResult.capGainsAmount * conv.rate);
                                        })()}
                                      </span>
                                    </div>
                                    <TrendingDown className="w-6 h-6 text-red-400" />
                                  </div>
                                </div>
                            </div>

                            <div className="mt-2 p-6 bg-gradient-to-r from-amber-900/40 to-brand-gold/10 border border-brand-gold/30 rounded-2xl">
                              <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Total Net Retained Profit</span>
                              <div className="text-white text-4xl font-black tracking-tighter">
                                {(() => {
                                  const conv = CONVERSION_RATES[selectedCurrency];
                                  return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency, maximumFractionDigits: 0 }).format(taxResult.netRetained * conv.rate);
                                })()}
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 💱 PROPRIETARY FOREX & CURRENCY EXCHANGE ENGINE */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">💱 PROPRIETARY FOREX & CURRENCY EXCHANGE ENGINE</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Cross-Border FX Routing Engine</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Amount to Convert</label>
                        <input 
                          type="number"
                          value={fxAmount}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setFxAmount(val === "" ? "" : Number(val)));
                          }}
                          onFocus={(e) => e.target.select()}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-bold focus:border-brand-gold focus:outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">From Currency</label>
                        <select 
                          value={fxFrom}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setFxFrom(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['USD', 'EUR', 'GBP', 'INR', 'AED', 'CHF', 'SGD', 'CAD', 'AUD', 'JPY'].map(c => (
                            <option key={`from-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">To Currency</label>
                        <select 
                          value={fxTo}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setFxTo(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['USD', 'EUR', 'GBP', 'INR', 'AED', 'CHF', 'SGD', 'CAD', 'AUD', 'JPY'].map(c => (
                            <option key={`to-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <button 
                      onClick={calculateFx}
                      disabled={isCalculatingFx}
                      className="md:col-span-2 w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isCalculatingFx ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Routing FX Request...</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          <span>Calculate Exchange Rate</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!fxResult && !isCalculatingFx ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <DollarSign className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select currencies to compute exchange delta</p>
                        </div>
                      ) : isCalculatingFx ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Running Exchange Parity...</p>
                        </div>
                      ) : (
                        fxResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                          >
                            <div>
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-4">Final Converted Amount</span>
                                
                                <div className="p-6 bg-gradient-to-r from-amber-900/40 to-brand-gold/10 border border-brand-gold/30 rounded-2xl">
                                  <div className="text-white text-4xl font-black tracking-tighter">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: fxTo, maximumFractionDigits: 2 }).format(fxResult.convertedAmount)}
                                  </div>
                                </div>
                            </div>

                            <div className="h-px bg-white/5 w-full mt-2" />

                            <div className="bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-xl flex items-center gap-4">
                              <Brain className="w-6 h-6 text-brand-gold shrink-0" />
                              <div className="flex flex-col">
                                <span className="text-brand-gold text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">Applied Exchange Rate</span>
                                <span className="text-zinc-200 text-xs font-medium leading-relaxed">
                                  {fxResult.rateText}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🛂 TURNKEY IMMIGRATION CONCIERGE SERVICES */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Plane className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🛂 TURNKEY IMMIGRATION CONCIERGE SERVICES</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Executive Relocation & Visa Eligibility</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={immiTargetCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setImmiTargetCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={`immi-target-${c.country_name}`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Current Citizenship</label>
                        <select 
                          value={immiCitizenship}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setImmiCitizenship(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['Global', 'USA', 'EU', 'UK', 'India', 'UAE', 'Canada', 'Australia'].map(c => (
                            <option key={`immi-cit-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Desired Concierge Tier</label>
                        <select 
                          value={immiTier}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setImmiTier(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['Standard Application Assist', 'VIP Fast-Track Processing', 'Ultra-Luxury Family Relocation (End-to-End)'].map(c => (
                            <option key={`immi-tier-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <button 
                      onClick={assessImmigration}
                      disabled={isAssessingImmi}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isAssessingImmi ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Auditing Profile...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          <span>Assess Eligibility & Initiate Service</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!immiResult && !isAssessingImmi ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Plane className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select parameters to compute visa eligibility</p>
                        </div>
                      ) : isAssessingImmi ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Consulting Global Immigration Counsel...</p>
                        </div>
                      ) : (
                        immiResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-6"
                          >
                            <div>
                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-4">Visa Approval Probability</span>
                                <div className="p-4 bg-gradient-to-r from-amber-900/40 to-brand-gold/10 border border-brand-gold/30 rounded-xl mb-6">
                                  <div className="text-white text-2xl font-black tracking-tighter">
                                    {immiResult.probability}
                                  </div>
                                </div>

                                <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-4">Dedicated Concierge Deliverables</span>
                                <ul className="space-y-3 mb-8">
                                  {immiResult.deliverables.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                                      <span className="text-zinc-200 text-sm font-medium">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                                
                                <button className="w-full bg-transparent border-2 border-brand-gold/50 hover:bg-brand-gold/10 py-4 rounded-xl text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all">
                                  Schedule Initial Consultation
                                </button>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🛡️ PROPRIETARY GLOBAL INSURANCE PARTNERS */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🛡️ PROPRIETARY GLOBAL INSURANCE PARTNERS</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Executive Coverage & Wealth Protection</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={insTargetCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setInsTargetCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={`ins-target-${c.country_name}`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Coverage Category</label>
                        <select 
                          value={insCategory}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setInsCategory(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['Premium Global Health & Medical', 'International Life & Wealth Protection', 'Expat Asset & Real Estate Cover'].map(c => (
                            <option key={`ins-cat-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <button 
                      onClick={matchInsuranceProviders}
                      disabled={isAssessingIns}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isAssessingIns ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Curating Elite Partners...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          <span>Match Premium Providers</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!insResult && !isAssessingIns ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Shield className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select coverage requirements</p>
                        </div>
                      ) : isAssessingIns ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Sourcing Global Underwriters...</p>
                        </div>
                      ) : (
                        insResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-4"
                          >
                            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-2">Verified Tier-1 Partners</span>
                            
                            {insResult.map((partner, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-brand-gold/30 transition-colors">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
                                  <span className="text-white font-bold text-lg">{partner.name}</span>
                                </div>
                                <p className="text-zinc-300 text-sm">{partner.description}</p>
                                <button className="w-full mt-2 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all">
                                  Request Custom Quote
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 💼 PROPRIETARY GLOBAL REMOTE JOB BOARD */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">💼 PROPRIETARY GLOBAL REMOTE JOB BOARD</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Executive Offshore & Tech Placements</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Industry / Profession</label>
                        <select 
                          value={jobIndustry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setJobIndustry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['Technology & AI Engineering', 'Executive Management (C-Suite)', 'Global Finance & Wealth Advisory', 'Marketing & Strategy'].map(c => (
                            <option key={`job-ind-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Desired Annual Salary Bracket</label>
                        <select 
                          value={jobSalary}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setJobSalary(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['$100k - $150k', '$150k - $250k', '$250k+ (Equity Included)'].map(c => (
                            <option key={`job-sal-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <button 
                      onClick={fetchRemoteJobs}
                      disabled={isFetchingJobs}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isFetchingJobs ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Matching Candidate Profile...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          <span>Fetch Premium Remote Roles</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!jobResult && !isFetchingJobs ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Briefcase className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select filters to query headhunter network</p>
                        </div>
                      ) : isFetchingJobs ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Scanning Global Opportunities...</p>
                        </div>
                      ) : (
                        jobResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-4"
                          >
                            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-2">Exclusive Matched Roles</span>
                            
                            {jobResult.map((job, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-brand-gold/30 transition-colors">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="text-white font-bold text-lg leading-tight">{job.title}</span>
                                    <div className="bg-brand-gold/10 border border-brand-gold/30 px-2 py-1 rounded text-[9px] font-black text-brand-gold uppercase tracking-wider shrink-0 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Verified Remote
                                    </div>
                                  </div>
                                  <span className="text-amber-600 text-sm font-medium">{job.company}</span>
                                </div>
                                
                                <div className="text-zinc-200 text-base font-bold bg-black/40 px-3 py-2 rounded-lg inline-block w-fit mt-1">
                                  {(() => {
                                    const conv = CONVERSION_RATES[selectedCurrency];
                                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency, maximumFractionDigits: 0 }).format(job.salary * conv.rate);
                                  })()}
                                  <span className="text-zinc-500 text-xs font-normal ml-1">/yr</span>
                                </div>

                                <button className="w-full mt-3 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all">
                                  Apply via Headhunter
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🏦 PROPRIETARY OFFSHORE & INTERNATIONAL BANKING */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🏦 PROPRIETARY OFFSHORE & INTERNATIONAL BANKING</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Exclusive Wealth & Asset Protection</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={bankTargetCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setBankTargetCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={`bank-target-${c.country_name}`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Account Type & Wealth Tier</label>
                        <select 
                          value={bankTier}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setBankTier(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['Personal Digital Nomad Account', 'Corporate & Business Banking', 'Private Wealth Management ($1M+)'].map(c => (
                            <option key={`bank-tier-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <button 
                      onClick={fetchBankingPartners}
                      disabled={isFetchingBanks}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isFetchingBanks ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Matching Institutional Partners...</span>
                        </>
                      ) : (
                        <>
                          <Landmark className="w-5 h-5" />
                          <span>Match Premium Banking Partners</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!bankResult && !isFetchingBanks ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Landmark className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select requirements to query global reserve network</p>
                        </div>
                      ) : isFetchingBanks ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Establishing Secure Routing...</p>
                        </div>
                      ) : (
                        bankResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-4"
                          >
                            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-2">Verified Banking & Wealth Partners</span>
                            
                            {bankResult.map((bank, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-brand-gold/30 transition-colors">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="text-white font-bold text-lg leading-tight">{bank.name}</span>
                                    <div className="bg-brand-gold/10 border border-brand-gold/30 px-2 py-1 rounded text-[9px] font-black text-brand-gold uppercase tracking-wider shrink-0 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Verified Partner
                                    </div>
                                  </div>
                                  <span className="text-zinc-300 text-sm mt-1">{bank.description}</span>
                                </div>
                                
                                <button className="w-full mt-3 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all">
                                  Request Priority Introduction
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 🌐 PROPRIETARY GLOBAL EXPAT & ELITE NETWORKING HUB */}
            <div className="w-full bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl shadow-black/80 relative overflow-hidden mt-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[120px] -z-10" />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">🌐 PROPRIETARY GLOBAL EXPAT & ELITE NETWORKING HUB</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">Exclusive Communities & Masterminds</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Parameter Inputs */}
                  <div className="grid grid-cols-1 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Target Jurisdiction</label>
                        <select 
                          value={networkTargetCountry}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setNetworkTargetCountry(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {countries.map(c => (
                            <option key={`network-target-${c.country_name}`} value={c.country_name} className="bg-[#1a1a1a]">{c.country_name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block ml-1">Networking Interest</label>
                        <select 
                          value={networkInterest}
                          onChange={(e) => {
                            const val = e.target.value;
                            startTransition(() => setNetworkInterest(val));
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-medium focus:border-brand-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {['Tech Founders & VC Mastermind', 'Executive Expat Social Club', 'Digital Nomad Co-working Hubs', 'Real Estate & Wealth Investors Circle'].map(c => (
                            <option key={`network-int-${c}`} value={c} className="bg-[#1a1a1a]">{c}</option>
                          ))}
                        </select>
                    </div>

                    <button 
                      onClick={fetchNetworkingCommunities}
                      disabled={isFetchingNetworks}
                      className="w-full bg-gradient-to-r from-amber-600 to-brand-gold py-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-amber-600/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-2"
                    >
                      {isFetchingNetworks ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Curating Private Networks...</span>
                        </>
                      ) : (
                        <>
                          <Users className="w-5 h-5" />
                          <span>Discover Exclusive Communities</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Allocation Display */}
                  <div className="bg-black/20 rounded-3xl border border-white/5 p-8 min-h-[300px] flex flex-col justify-center relative">
                    <AnimatePresence mode="wait">
                      {!networkResult && !isFetchingNetworks ? (
                        <div className="flex flex-col items-center justify-center text-center space-y-4 h-full opacity-40">
                          <Users className="w-12 h-12" />
                          <p className="text-[10px] font-bold text-white uppercase tracking-widest">Select interests to uncover private networks</p>
                        </div>
                      ) : isFetchingNetworks ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] animate-pulse">Accessing Global Membership Directory...</p>
                        </div>
                      ) : (
                        networkResult && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-4"
                          >
                            <span className="text-amber-600 text-[10px] font-bold uppercase tracking-widest block mb-2">Exclusive Matched Communities</span>
                            
                            {networkResult.map((community, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-brand-gold/30 transition-colors">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="text-white font-bold text-lg leading-tight">{community.name}</span>
                                    <div className="bg-brand-gold/10 border border-brand-gold/30 px-2 py-1 rounded text-[9px] font-black text-brand-gold uppercase tracking-wider shrink-0 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Verified Network
                                    </div>
                                  </div>
                                  <span className="text-zinc-300 text-sm mt-1">{community.description}</span>
                                </div>
                                
                                <button className="w-full mt-3 bg-transparent border border-brand-gold/30 hover:bg-brand-gold/10 py-3 rounded-lg text-brand-gold font-bold uppercase tracking-[0.1em] text-xs transition-all">
                                  Request Private Invitation
                                </button>
                              </div>
                            ))}
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 font-display relative">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold mb-4 text-slate-400">Strategic Jurisdictions</h2>
                <p className="text-gray-400 text-lg">
                  Real-time comparison of premium growth corridors analyzed by our native AI engine.
                </p>
              </div>

              {/* Top Header Close Button */}
              {(compareA || compareB) && (
                <button 
                  onClick={() => { setCompareA(null); setCompareB(null); }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-gold/30 bg-brand-gold/5 hover:bg-brand-gold/10 transition-all text-amber-600 font-bold uppercase tracking-widest text-xs z-20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
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
                        { label: "Monthly Rent", key: "rent", icon: Home },
                        { label: "Safety Rating", key: "safety", icon: Shield },
                        { label: "Internet Speed", key: "internet", icon: Wifi },
                      ].map((metric) => {
                        const valA = (compareA as any)[metric.key] || 0;
                        const valB = (compareB as any)[metric.key] || 0;

                        const displayA = getDisplayValue(compareA, metric);
                        const displayB = getDisplayValue(compareB, metric);

                        // Higher index/salary/speed/safety is better, but lower rent/tax is better
                        const isLowerBetter = metric.key === "tax_rate_percent" || metric.key === "rent";
                      
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
                                animate={{ width: `${(Number(String(compareA.average_salary_usd).replace(/[^0-9.]/g, '')) / Math.max(Number(String(compareA.average_salary_usd).replace(/[^0-9.]/g, '')), Number(String(compareB.average_salary_usd).replace(/[^0-9.]/g, '')), 1)) * 100}%` }}
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
                                animate={{ width: `${(Number(String(compareB.average_salary_usd).replace(/[^0-9.]/g, '')) / Math.max(Number(String(compareA.average_salary_usd).replace(/[^0-9.]/g, '')), Number(String(compareB.average_salary_usd).replace(/[^0-9.]/g, '')), 1)) * 100}%` }}
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
                                animate={{ width: `${(Number(String(compareA.tax_rate_percent).replace(/[^0-9.]/g, '')) / Math.max(Number(String(compareA.tax_rate_percent).replace(/[^0-9.]/g, '')), Number(String(compareB.tax_rate_percent).replace(/[^0-9.]/g, '')), 1)) * 100}%` }}
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
                                animate={{ width: `${(Number(String(compareB.tax_rate_percent).replace(/[^0-9.]/g, '')) / Math.max(Number(String(compareA.tax_rate_percent).replace(/[^0-9.]/g, '')), Number(String(compareB.tax_rate_percent).replace(/[^0-9.]/g, '')), 1)) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                                className="h-full bg-slate-500/50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Save & Close Report Actions */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
                  >
                    <button 
                      onClick={handleSaveReport}
                      disabled={isSaving}
                      className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-amber-600 shadow-xl shadow-amber-600/20 hover:scale-[1.02] active:scale-95 transition-all text-brand-midnight font-bold overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {isSaving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                      <span className="relative tracking-widest text-sm uppercase">Save Comparison Report</span>
                    </button>

                    <button 
                      onClick={() => { setCompareA(null); setCompareB(null); }}
                      className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border border-brand-gold/40 bg-brand-gold/5 hover:bg-brand-gold/15 hover:scale-[1.02] active:scale-95 transition-all text-amber-600 font-bold overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <X className="w-5 h-5" />
                      <span className="relative tracking-widest text-sm uppercase">Close & Return</span>
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

        {/* About: Leadership Profile - Premium Fintech UI */}
        <section id="about" className="py-24 relative overflow-hidden bg-[#0A0B0D]">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-start/[0.03] blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            {/* Fintech Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/5 border border-amber-600/20 text-amber-600 text-[10px] font-bold tracking-[0.35em] uppercase mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  Chief AI Architect
                </div>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white mb-8 tracking-tighter leading-[0.95] uppercase">
                  M M RAJU
                </h2>
                
                <div className="space-y-6 text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                  <p>
                    As the visionary architect behind our <span className="text-white font-medium">Proprietary Neural Intelligence Framework</span>, M M RAJU spearheads the strategic technological evolution of Global Compass. 
                  </p>
                  <p>
                    Specializing in high-frequency quantitative jurisdictional modeling and decentralized asset optimization, he has pioneered the synthesis of AI with global economic mobility for institutional-grade wealth preservation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 pt-12 mt-12 border-t border-white/5">
                  <div className="space-y-1">
                    <div className="text-3xl font-display font-bold text-white tracking-tight">$4.2B+</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">In-Matrix Assets</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-display font-bold text-white tracking-tight">99.9%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Predictive Uptime</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 mt-14">
                  <a href="https://www.linkedin.com/in/munchingi-matya-raju-52baa71bb/" target="_blank" rel="noopener noreferrer" className="group px-10 py-4.5 rounded-2xl bg-amber-600 text-brand-midnight text-[12px] font-bold tracking-[0.15em] hover:bg-white transition-all shadow-2xl shadow-amber-600/20 uppercase flex items-center gap-3">
                    <Linkedin className="w-5 h-5" /> 
                    <span>Access Executive Network</span>
                  </a>
                  <a href="https://x.com/mmraju77" target="_blank" rel="noopener noreferrer" className="px-10 py-4.5 rounded-2xl border border-white/10 text-slate-400 text-[12px] font-bold tracking-[0.15em] hover:border-amber-600 hover:text-amber-600 transition-all uppercase flex items-center gap-3">
                    <Twitter className="w-5 h-5" /> 
                    <span>Neural Feed</span>
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Premium Framing */}
                  <div className="absolute -inset-16 bg-amber-600/5 blur-[120px] rounded-full opacity-50" />
                  <div className="relative w-80 h-96 md:w-[450px] md:h-[550px] overflow-hidden rounded-[4rem] border border-white/10 group">
                    <img 
                      src="/founder.jpg.jpeg" 
                      alt="M M RAJU" 
                      className="w-full h-full object-cover grayscale brightness-110 contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D] via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Info Tag */}
                    <div className="absolute bottom-12 left-12 right-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center">
                          <CompassIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold tracking-tight">Verified Chief Architect</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Institutional Signature Series</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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

        {/* Footer: Institutional Compliance */}
        <footer className="pt-24 pb-12 bg-black border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="font-display text-2xl font-bold tracking-tighter text-slate-300">
                    GLOBAL COMPASS<span className="text-amber-600">.</span>
                  </span>
                </div>
                <p className="text-slate-500 text-lg max-w-sm mb-10 font-light leading-relaxed">
                  Strategic intelligence for wealth sovereignty and institutional cross-border migration.
                </p>
                <div className="flex gap-4">
                  {[Linkedin, Twitter].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:border-amber-600/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
                <ul className="space-y-4 text-slate-500 text-sm font-medium">
                  <li><a href="#" className="hover:text-amber-600 transition-colors">Jurisdiction Matrix</a></li>
                  <li><a href="#" className="hover:text-amber-600 transition-colors">AI Forecasting</a></li>
                  <li><a href="#" className="hover:text-amber-600 transition-colors">Wealth Vaults</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-8">Governance</h4>
                <ul className="space-y-4 text-slate-500 text-sm font-medium">
                  <li><a href="#" className="hover:text-amber-600 transition-colors">Privacy Sovereignty</a></li>
                  <li><a href="#" className="hover:text-amber-600 transition-colors">Regulatory Policy</a></li>
                  <li><a href="#" className="hover:text-amber-600 transition-colors">Security Audit</a></li>
                </ul>
              </div>
            </div>

            <div className="mb-16">
              <div className="p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/[0.02] blur-[80px]" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center border border-amber-600/20">
                    <Scale className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">Strict Global Regulatory & Financial Compliance Registry</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-12 text-[10px] text-slate-500 leading-relaxed uppercase tracking-[0.06em] font-medium">
                  <div className="space-y-6">
                    <p>
                      <span className="text-amber-600/80 font-bold block mb-2">I. NON-ADVISORY STATUS</span>
                      GLOBAL COMPASS (THE "PLATFORM") OPERATES EXCLUSIVELY AS A JURISDICTIONAL DATA AGGREGATOR AND NEURAL MODELING SUITE. NEITHER THE PLATFORM NOR GLOBAL STRATEGY LABS ARE REGISTERED FINANCIAL ADVISORS, LEGAL SOLICITORS, OR TAX CONSULTANTS UNDER ANY SOVEREIGN JURISDICTION (INCLUDING BUT NOT LIMITED TO THE SEC, FCA, OR ESMA).
                    </p>
                    <p>
                      <span className="text-amber-600/80 font-bold block mb-2">II. RISK ACKNOWLEDGMENT</span>
                      INTERNATIONAL WEALTH MIGRATION AND JURISDICTIONAL SELECTION INVOLVE INHERENT MACROECONOMIC, POLITICAL, AND GEOSPATIAL RISKS. DATA PROVIDED IS HISTORICAL OR PREDICTIVE AND CARRIES NO GUARANTEES OF FUTURE STABILITY OR TAX EFFICIENCY.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <p>
                      <span className="text-amber-600/80 font-bold block mb-2">III. USER FISCAL RESPONSIBILITY</span>
                      USERS RETAIN 100% RESPONSIBILITY FOR COMPLIANCE WITH THEIR RESIDENT NATION'S DECLARATION REQUIREMENTS, INCLUDING FATCA, CRS, AND ALL RELEVANT TAX TREATIES. GLOBAL COMPASS STERNLY ADVISES INDEPENDENT CERTIFIED CONSULTATION BEFORE ANY CAPITAL REALLOCATION.
                    </p>
                    <p>
                      <span className="text-amber-600/80 font-bold block mb-2">IV. SANCTIONS & ELIGIBILITY</span>
                      ACCESS TO ARCHIVED INTELLIGENCE REPORTS MAY BE RESTRICTED OR REVOKED FOR INDIVIDUALS SUBJECT TO INTERNATIONAL SANCTIONS LISTS (OFAC/EU/UN) OR THOSE LOCATED IN HIGH-RISK JURISDICTIONS AS DEFINED BY THE FATF.
                    </p>
                    <p>
                      <span className="text-amber-600/80 font-bold block mb-2">V. JURISDICTIONAL LIMITATIONS</span>
                      GLOBAL COMPASS DOES NOT SOLICIT OR OFFER SERVICES TO NATIONS SUBJECT TO TOTAL EMBARGO OR COMPREHENSIVE SANCTIONS. ALL ARCHITECTURAL FRAMEWORKS ARE PROTECTED UNDER INTERNATIONAL INTELLECTUAL PROPERTY STATUTES.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              <p>© {new Date().getFullYear()} Global Strategy Labs • All Strategic Rights Reserved.</p>
              <p className="text-amber-600/50">M M RAJU Signature Architecture Series</p>
            </div>
          </div>
        </footer>
      </div>

        {/* Admin Control Center Modal */}
        <AnimatePresence>
          {isAdminPanelOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAdminPanelOpen(false)}
                className="absolute inset-0 bg-brand-midnight/90 backdrop-blur-xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-brand-midnight border border-white/10 shadow-2xl flex flex-col"
              >
                <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-600/20 flex items-center justify-center border border-amber-600/30">
                      <Lock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-slate-400">Admin Control Center</h2>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Jurisdictional Data Override Matrix</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAdminPanelOpen(false)}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-500 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  <form onSubmit={handleAdminUpsert} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-4">Core Identification</h3>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Country Name</label>
                        <input 
                          type="text"
                          required
                          value={adminCountryName}
                          onChange={(e) => handleCountryNameChange(e.target.value)}
                          className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                          placeholder="e.g., Switzerland"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Annual Growth</label>
                          <input 
                            type="text"
                            value={adminAnnualGrowth}
                            onChange={(e) => setAdminAnnualGrowth(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="+2.4%"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Stability Score</label>
                          <input 
                            type="text"
                            value={adminStabilityScore}
                            onChange={(e) => setAdminStabilityScore(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="Maximum"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Compass Index (0-100)</label>
                          <input 
                            type="text"
                            value={adminCompassIndex}
                            onChange={(e) => setAdminCompassIndex(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="e.g., 95"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Strategic Status</label>
                          <input 
                            type="text"
                            value={adminStrategicStatus}
                            onChange={(e) => setAdminStrategicStatus(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="Premium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cost of Living Score (0-100)</label>
                        <input 
                          type="text"
                          value={adminCostOfLiving}
                          onChange={(e) => setAdminCostOfLiving(e.target.value)}
                          className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                          placeholder="e.g., 75"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-4">Economic & Living Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg Annual Salary ($)</label>
                          <input 
                            type="text"
                            value={adminSalary}
                            onChange={(e) => setAdminSalary(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="e.g., 85000"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tax Rate (%)</label>
                          <input 
                            type="text"
                            value={adminTax}
                            onChange={(e) => setAdminTax(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="e.g., 20"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monthly Rent ($)</label>
                          <input 
                            type="text"
                            value={adminRent}
                            onChange={(e) => setAdminRent(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="e.g., $1,200 / mo"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Healthcare Score (0-100)</label>
                          <input 
                            type="text"
                            value={adminHealthcare}
                            onChange={(e) => setAdminHealthcare(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="e.g., 91 / 100"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Safety Rating (0-100)</label>
                          <input 
                            type="text"
                            value={adminSafety}
                            onChange={(e) => setAdminSafety(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="e.g., 88 / 100"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Internet Speed (Mbps)</label>
                          <input 
                            type="text"
                            value={adminInternet}
                            onChange={(e) => setAdminInternet(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-400 focus:border-amber-600 outline-none transition-all placeholder:text-slate-600"
                            placeholder="e.g., 180 Mbps"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-6 flex justify-end gap-4">
                      <button 
                        type="button"
                        onClick={() => setIsAdminPanelOpen(false)}
                        className="px-8 py-3 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isUpserting}
                        className="px-10 py-3 rounded-xl bg-amber-600 text-brand-midnight font-bold shadow-xl shadow-amber-600/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs flex items-center gap-2"
                      >
                        {isUpserting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        {isUpserting ? "Synchronizing Matrix..." : "Override Jurisdiction Matrix"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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

              <div id="report-modal-content" className="relative z-10 p-8 md:p-12" style={{ backgroundColor: '#060B13' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ backgroundColor: 'rgba(204, 164, 59, 0.1)', borderColor: 'rgba(204, 164, 59, 0.2)' }}>
                    <Globe className="w-6 h-6" style={{ color: '#d97706' }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#d97706' }}>Intelligence Report</div>
                    <h3 className="text-3xl font-display font-bold" style={{ color: '#94a3b8' }}>{selectedCountry.country_name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                      <DollarSign className="w-3 h-3" style={{ color: '#d97706' }} /> Avg Salary
                    </div>
                    <div className="text-xl font-display font-bold" style={{ color: '#94a3b8' }}>
                      {formatCurrency(selectedCountry.average_salary_usd)}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                      <Percent className="w-3 h-3" style={{ color: '#d97706' }} /> Tax Rate
                    </div>
                    <div className="text-xl font-display font-bold" style={{ color: '#94a3b8' }}>
                      {selectedCountry.tax_rate_percent !== undefined ? `${selectedCountry.tax_rate_percent}%` : 'N/A'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                      <Home className="w-3 h-3" style={{ color: '#d97706' }} /> Avg Rent
                    </div>
                    <div className="text-xl font-display font-bold" style={{ color: '#94a3b8' }}>
                      {selectedCountry.rent ? formatCurrency(selectedCountry.rent) : (countryMetrics[selectedCountry.country_name]?.rent || "N/A")}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                      <HeartPulse className="w-3 h-3" style={{ color: '#d97706' }} /> Healthcare
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-display font-bold" style={{ color: '#94a3b8' }}>
                         {selectedCountry.healthcare ? `${selectedCountry.healthcare} / 100` : (countryMetrics[selectedCountry.country_name]?.healthcare || "N/A")}
                       </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                      <Shield className="w-3 h-3" style={{ color: '#d97706' }} /> Safety
                    </div>
                    <div className="text-xl font-display font-bold" style={{ color: '#94a3b8' }}>
                      {selectedCountry.safety ? `${selectedCountry.safety} / 100` : (countryMetrics[selectedCountry.country_name]?.safety || "N/A")}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                      <Wifi className="w-3 h-3" style={{ color: '#d97706' }} /> Connectivity
                    </div>
                    <div className="text-xl font-display font-bold" style={{ color: '#94a3b8' }}>
                      {selectedCountry.internet ? `${selectedCountry.internet} Mbps` : (countryMetrics[selectedCountry.country_name]?.internet || "N/A")}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl border" style={{ backgroundColor: 'rgba(204, 164, 59, 0.05)', borderColor: 'rgba(204, 164, 59, 0.1)' }}>
                    <div className="text-sm" style={{ color: '#94a3b8' }}>Strategic Stability Score</div>
                    <div className="text-sm font-bold uppercase" style={{ color: '#d97706' }}>{selectedCountry.stability_score}</div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <div className="text-sm" style={{ color: '#94a3b8' }}>Annual GDP Growth</div>
                    <div className="text-sm font-bold font-mono" style={{ color: '#94a3b8' }}>{selectedCountry.annual_growth}</div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleDownloadReport(selectedCountry)}
                    className="flex-1 px-6 py-4 bg-amber-600 text-brand-midnight font-bold rounded-xl shadow-xl shadow-amber-600/20 hover:bg-white transition-all uppercase tracking-widest text-[11px] flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Executive Dossier (PDF)
                  </button>
                  <button 
                    onClick={() => setSelectedCountry(null)}
                    className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 font-medium rounded-xl transition-all uppercase tracking-widest text-[11px]"
                  >
                    Close
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
