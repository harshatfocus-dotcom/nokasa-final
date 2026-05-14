"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { LeafBackground } from "@/components/ui/leaf-background";
import { Particles } from "@/components/ui/particles";
import { 
  TrendingUp,
  Coins,
  CheckCircle,
  ArrowRight,
  Clock,
  Shirt,
  Sparkles,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  "Starting Fresh",
  "Side Business",
  "Additional Income Stream",
];

export default function BecomePartnerPage() {
  const [investment, setInvestment] = useState(10000);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [partnerForm, setPartnerForm] = useState({ fullName: "", whatsapp: "", city: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartnerForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...partnerForm, goal: selectedRole }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitStatus("success");
      setPartnerForm({ fullName: "", whatsapp: "", city: "" });
    } catch {
      setSubmitStatus("error");
    }
  };
  
  const costPerPiece = 50;
  const pieces = Math.floor(investment / costPerPiece);
  
  const tier1Pieces = Math.floor(pieces * 0.25);
  const tier2Pieces = Math.floor(pieces * 0.50);
  const tier3Pieces = pieces - tier1Pieces - tier2Pieces;

  const potentialRevenue = (tier1Pieces * 100) + (tier2Pieces * 125) + (tier3Pieces * 150);
  const potentialProfit = potentialRevenue - investment;

  return (
    <main className="relative min-h-screen bg-background transition-colors duration-500 overflow-hidden">
      <LeafBackground />
      <Particles count={70} className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none" />

      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 z-10">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-[10px] font-black text-brand uppercase tracking-[0.2em]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner with NoKasa</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-gray-950 dark:text-gray-100 leading-[0.9] tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Launch your own <br/>
              <span className="text-brand">clothing business.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              NoKasa gives you a ready supply of pre-loved clothes to build your brand around. Whether you&apos;re starting from scratch or scaling up, we handle the sourcing so you can focus on selling.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              <a
                href="#partner-form"
                className="w-[260px] px-8 py-4 rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950 font-bold text-lg shadow-xl shadow-black/10 dark:shadow-white/10 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5 text-white dark:text-gray-950" />
              </a>
              <a
                href="#calculator"
                className="w-[260px] px-8 py-4 rounded-2xl bg-white dark:bg-card border-2 border-gray-950 dark:border-white text-gray-950 dark:text-white font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center"
              >
                Earnings Calculator
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── The Value Proposition ────────────────────────────────────── */}
      <section className="relative py-24 z-10 bg-white/40 dark:bg-card/40 backdrop-blur-md border-y border-gray-100 dark:border-white/5">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
             <div className="space-y-12">
                <div className="space-y-6">
                   <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-gray-100 italic leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                      We do the sourcing. <br/>
                      You sell at <span className="text-brand">your chosen price.</span>
                   </h2>
                   <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                      NoKasa handles sourcing, grading, and delivery. You focus on building your customer base and growing your resale brand. You control your margins and your growth.
                   </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                   {[
                     { icon: Shirt, title: "Ready to Resell", desc: "Every piece is sourced, graded, and processed, ready to go straight to your customer." },
                     { icon: TrendingUp, title: "You Set the Price", desc: "No fixed margins imposed on you. Price your inventory based on your market and audience." },
                     { icon: Coins, title: "Low Entry Barrier", desc: "Start with a small batch, validate your market, and scale at your own pace." },
                     { icon: Clock, title: "Fast Turnaround", desc: "Get your first stock within 48 hours of onboarding and start selling right away." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand/5 border border-brand/10 flex items-center justify-center shrink-0">
                           <item.icon className="w-6 h-6 text-brand" />
                        </div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-gray-950 dark:text-gray-100 uppercase text-xs tracking-widest">{item.title}</h4>
                           <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="relative group">
                {/* Improved Framing */}
                <div className="absolute -inset-6 bg-gradient-to-tr from-brand/20 to-transparent blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl sm:skew-y-1 group-hover:skew-y-0 transition-transform duration-700 bg-white dark:bg-gray-950 p-3">
                   <div className="rounded-[2.2rem] overflow-hidden aspect-[4/5] relative">
                      <Image 
                        src="/images/partnership-lifestyle.png" 
                        alt="Home Boutique Success"
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                         <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                            <p className="text-white text-xs font-bold uppercase tracking-widest">Partner Spotlight</p>
                            <p className="text-white/80 text-[10px] mt-1">Starting a home boutique with NoKasa curated sets.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </Container>
      </section>

      {/* ─── Earnings Calculator ──────────────────────────────────────── */}
      <section id="calculator" className="relative py-24 z-10">
        <Container>
          <div className="max-w-5xl mx-auto rounded-[2.5rem] md:rounded-[4rem] bg-gray-950 p-6 sm:p-10 md:p-20 text-white relative overflow-hidden shadow-4xl group">
             <div className="absolute inset-0 bg-brand/10 blur-[150px] rounded-full -mr-1/2 -mt-1/2 group-hover:bg-brand/20 transition-all" />
             
             <div className="relative z-10 grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-center">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <h2 className="text-4xl font-black italic text-white">Investment Visualizer</h2>
                      <p className="text-gray-400 font-medium">Drag the slider to see your potential earnings at ₹50/piece unit cost.</p>
                   </div>
                   
                   <div className="space-y-8">
                      <div className="space-y-4">
                         <div className="flex justify-between items-end">
                            <span className="text-xs font-black uppercase tracking-widest text-brand">Starting Investment</span>
                            <span className="text-4xl font-black text-white italic">₹{investment.toLocaleString()}</span>
                         </div>
                         <input 
                           type="range" 
                           min="10000"
                           max="50000"
                           step="1000"
                           value={investment}
                           onChange={(e) => setInvestment(Number(e.target.value))}
                           className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand"
                         />
                         <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-gray-600">
                            <span>Min: ₹10,000</span>
                            <span>Max: ₹50,000</span>
                         </div>
                      </div>

                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Total Pieces Shipped:</span>
                            <span className="font-bold text-brand">{pieces} pieces</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Fixed Unit Cost:</span>
                            <span className="font-bold text-white">₹50</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-12 rounded-[3.5rem] bg-white text-gray-950 space-y-8 shadow-2xl relative">
                   <div className="absolute top-6 right-6 p-3 rounded-full bg-brand/10 text-brand">
                      <TrendingUp className="w-5 h-5" />
                   </div>
                   
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Predicted Profit Range</p>
                      <h3 className="text-5xl font-black tracking-tighter italic text-gray-950">₹{potentialProfit.toLocaleString()}*</h3>
                   </div>

                   <div className="space-y-4 pt-6 border-t border-gray-100">
                      <div className="flex items-start gap-3">
                         <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                         <p className="text-xs font-medium text-gray-600">Estimate based on conservative resale margins.</p>
                      </div>
                      <div className="flex items-start gap-3">
                         <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                         <p className="text-xs font-medium text-gray-600">ROI: High-frequency inventory turnover.</p>
                      </div>
                   </div>

                   <a
                      href="#partner-form"
                      onClick={(e) => { e.preventDefault(); document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="w-full py-4 rounded-2xl gradient-brand text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                   >
                      Unlock Bulk Access <ArrowRight className="w-4 h-4" />
                   </a>
                </div>
             </div>
          </div>
        </Container>
      </section>

      {/* ─── Application Form ────────────────────────────────────────── */}
      <section id="partner-form" className="relative py-24 z-10 pb-40">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <div className="relative h-[480px] md:h-[600px] rounded-[2.5rem] overflow-hidden hidden lg:block">
              <Image
                src="/images/partner_form.png"
                alt="NoKasa partner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Right: Form */}
            <div className="space-y-10">
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-gray-100 tracking-tighter">Become a Partner</h2>
                <p className="text-gray-500 font-medium">Tell us about yourself and our team will get in touch with you.</p>
              </div>

              <div className="p-10 md:p-12 rounded-[3rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-xl space-y-8">
                {submitStatus === "success" ? (
                  <div className="flex flex-col items-start gap-4 py-6">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">Application submitted!</h3>
                    <p className="text-gray-500 text-[15px]">Our team will reach out to you on WhatsApp shortly.</p>
                    <button onClick={() => setSubmitStatus("idle")} className="text-brand font-bold text-sm hover:underline">Submit another application</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handlePartnerSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name*</label>
                        <input name="fullName" type="text" required placeholder="John Doe" value={partnerForm.fullName} onChange={handlePartnerChange} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-brand/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">WhatsApp Number*</label>
                        <input name="whatsapp" type="tel" required placeholder="+91 00000 00000" value={partnerForm.whatsapp} onChange={handlePartnerChange} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-brand/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                      </div>
                    </div>

                    <div className="space-y-2 relative">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Your Goal</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-brand/20 transition-all flex items-center justify-between group"
                        >
                          <span className={cn("text-sm transition-colors", selectedRole ? "text-gray-900 dark:text-gray-200" : "text-gray-400")}>
                            {selectedRole || "Select your goal"}
                          </span>
                          <ChevronDown className={cn("w-4 h-4 text-gray-400 group-hover:text-brand transition-transform duration-300", isDropdownOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 5, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="absolute z-50 top-full left-0 right-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl shadow-gray-950/10 overflow-hidden"
                            >
                              {roles.map((role) => (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => { setSelectedRole(role); setIsDropdownOpen(false); }}
                                  className="w-full px-6 py-3.5 text-sm text-left hover:bg-brand/5 dark:hover:bg-brand/10 transition-colors text-gray-600 dark:text-gray-400 hover:text-brand"
                                >
                                  {role}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">City</label>
                      <input name="city" type="text" placeholder="e.g. Bangalore" value={partnerForm.city} onChange={handlePartnerChange} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-brand/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    </div>

                    {submitStatus === "error" && (
                      <p className="text-sm text-red-500">Something went wrong. Please try again or contact us directly.</p>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className="w-full py-5 rounded-[2rem] gradient-brand text-white font-black text-lg shadow-2xl shadow-brand/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {submitStatus === "loading" ? "Submitting..." : "Submit Application"} <ArrowUpRight className="w-6 h-6" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
