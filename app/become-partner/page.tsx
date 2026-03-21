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
  Home as HomeIcon,
  Shirt,
  Sparkles,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  "Housewife (Startup from home)",
  "Student (Side business)",
  "Employee (Extra Income)",
  "Existing Reseller"
];

export default function BecomePartnerPage() {
  const [investment, setInvestment] = useState(5000);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const costPerPiece = 50;
  const avgSellingPrice = 175; // Default for calc
  const pieces = Math.floor(investment / costPerPiece);
  const potentialRevenue = pieces * avgSellingPrice;
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
              className="text-6xl md:text-8xl font-black text-gray-950 dark:text-gray-100 leading-[0.9] tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start your business <br/>
              <span className="text-brand">from home.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Empowering housewives, students, and side-hustlers. NoKasa provides premium ironed clothes at a fixed ₹50. You sell at your own chosen price.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-6"
            >
              <a 
                href="#partner-form" 
                className="px-8 py-4 rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950 font-bold text-lg shadow-xl shadow-black/10 dark:shadow-white/10 hover:scale-105 transition-all flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-5 h-5 text-white dark:text-gray-950" />
              </a>
              <a 
                href="#calculator" 
                className="px-8 py-4 rounded-2xl bg-white dark:bg-card border-2 border-gray-950 dark:border-white text-gray-950 dark:text-white font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
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
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-12">
                <div className="space-y-6">
                   <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-gray-100 italic leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                      Buy at ₹50. <br/>
                      Sell at <span className="text-brand">your chosen price.</span>
                   </h2>
                   <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                      We handle the sourcing, grading, cleaning, and ironing. You focus on selling and building your brand. It's the simplest way to start a fashion business today. You control your margins.
                   </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                   {[
                     { icon: Shirt, title: "Clean & Ironed", desc: "Every piece is professionally processed and ready for your customer." },
                     { icon: HomeIcon, title: "100% From Home", desc: "No shop needed. Sell on WhatsApp, Instagram, or through your community." },
                     { icon: Coins, title: "Fixed Rates", desc: "No price fluctuations. ₹50 per piece, regardless of the brand's original cost." },
                     { icon: Clock, title: "Quick Startup", desc: "Get your first stock within 48 hours and start selling instantly." }
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
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl skew-y-1 group-hover:skew-y-0 transition-transform duration-700 bg-white dark:bg-gray-950 p-3">
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
          <div className="max-w-5xl mx-auto rounded-[4rem] bg-gray-950 p-12 md:p-20 text-white relative overflow-hidden shadow-4xl group">
             <div className="absolute inset-0 bg-brand/10 blur-[150px] rounded-full -mr-1/2 -mt-1/2 group-hover:bg-brand/20 transition-all" />
             
             <div className="relative z-10 grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
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
                           min="1000" 
                           max="50000" 
                           step="1000"
                           value={investment}
                           onChange={(e) => setInvestment(Number(e.target.value))}
                           className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand"
                         />
                         <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-gray-600">
                            <span>Min: ₹1,000</span>
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

                   <button className="w-full py-4 rounded-2xl gradient-brand text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-[1.02] transition-all">
                      Unlock Bulk Access
                   </button>
                </div>
             </div>
          </div>
        </Container>
      </section>

      {/* ─── Application Form ────────────────────────────────────────── */}
      <section id="partner-form" className="relative py-24 z-10 pb-40">
        <Container>
          <div className="max-w-2xl mx-auto space-y-12">
             <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-gray-100 tracking-tighter">Become a Partner</h2>
                <p className="text-gray-500 font-medium">Tell us about your home business goal and our team will call you.</p>
             </div>

             <div className="p-10 md:p-12 rounded-[4rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-3xl space-y-8">
                <form className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                         <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-brand/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">WhatsApp Number</label>
                         <input type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-brand/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                      </div>
                   </div>

                   <div className="space-y-2 relative">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Your Role</label>
                      
                      {/* Custom Styled Dropdown */}
                      <div className="relative">
                        <button 
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-brand/20 transition-all flex items-center justify-between group"
                        >
                           <span className={cn("text-sm transition-colors", selectedRole ? "text-gray-900 dark:text-gray-200" : "text-gray-400")}>
                             {selectedRole || "Select your journey"}
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
                                   onClick={() => {
                                     setSelectedRole(role);
                                     setIsDropdownOpen(false);
                                   }}
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
                      <input type="text" placeholder="e.g. Bangalore" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-brand/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                   </div>

                   <div className="pt-4">
                      <button type="submit" className="w-full py-5 rounded-[2rem] gradient-brand text-white font-black text-lg shadow-2xl shadow-brand/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                         Submit Application <ArrowUpRight className="w-6 h-6" />
                      </button>
                   </div>
                </form>
             </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
