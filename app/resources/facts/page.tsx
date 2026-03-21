"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Sparkles, 
  Share2, 
  Twitter, 
  Facebook, 
  MessageCircle, 
  RefreshCcw, 
  Leaf, 
  Zap, 
  Droplets,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Info,
  Layers,
  ShoppingBag,
  Trash2,
  TreePine,
  Smartphone as PhoneIcon
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Particles } from "@/components/ui/particles";
import { LeafBackground } from "@/components/ui/leaf-background";
import { Footer } from "@/components/layout/footer";

/* ─── Data & Constants ─────────────────────────────────────────────── */

const GARMENT_DATA = {
  "T-Shirts": ["Cotton", "Polyester", "Bamboo"],
  "Jeans": ["Denim", "Stretch", "Recycled"],
  "Dresses": ["Silk", "Linen", "Wool"],
  "Jackets": ["Leather", "Nylon", "Hemp"],
  "Sweaters": ["Cashmere", "Merino", "Alpaca"],
  "Footwear": ["Leather", "Vegan", "Recycled"]
};

const RANDOM_FACTS = [
  "Over 2,700 liters of water are needed to produce just one cotton T-shirt.",
  "The fashion industry is responsible for 10% of global carbon emissions.",
  "Nearly 3 out of 5 items of clothing end up in a landfill within a year.",
  "Polyester takes up to 200 years to decompose in a landfill.",
  "Recycling textiles can save up to 95% of the water used in primary production."
];

/* ─── Main Page Component ───────────────────────────────────────────── */

export default function FactsPage() {
  const [selectedGarment, setSelectedGarment] = useState("T-Shirts");
  const [selectedMaterial, setSelectedMaterial] = useState("Cotton");
  const [currentFact, setCurrentFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tickerFact, setTickerFact] = useState(RANDOM_FACTS[0]);

  // Handle ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerFact(prev => {
        const idx = RANDOM_FACTS.indexOf(prev);
        return RANDOM_FACTS[(idx + 1) % RANDOM_FACTS.length];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateFact = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/facts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ garment: selectedGarment, material: selectedMaterial })
      });
      const data = await response.json();
      setCurrentFact(data.fact || "Sustainability is the ultimate trend. Recycle more!");
    } catch (error) {
       // Fallback
       setCurrentFact(`A ${selectedMaterial} ${selectedGarment.slice(0, -1)} has a significant impact on resource conservation when recycled correctly.`);
    } finally {
      setIsLoading(false);
    }
  };

  const shareFact = (platform: 'twitter' | 'facebook' | 'whatsapp') => {
    const text = encodeURIComponent(`Mind-blown by this fact: "${currentFact}" — Learn more at NoKasa #SustainableFashion #NoKasa`);
    const url = encodeURIComponent("https://nokasa.vercel.app/resources/facts");
    
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`
    };
    
    window.open(links[platform], '_blank');
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-brand selection:text-white">
      <Particles className="absolute inset-0 z-0 pointer-events-none opacity-40" count={120} />
      <LeafBackground />

      {/* ─── Hero Section ───────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-[10px] font-black text-brand uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Knowledge is Power</span>
              </div>
              <h1 className="text-display-xl font-black text-gray-950 dark:text-gray-100" style={{ fontFamily: "var(--font-display)" }}>
                Know Your <br/><span className="text-brand">Clothes.</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-lg">
                Discover the hidden sustainability story behind your favorite fabrics. Learn, share, and join the movement towards a circular fashion future.
              </p>
              
              {/* Ticker */}
              <div className="p-4 rounded-2xl bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-sm max-w-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <Info className="w-4 h-4 text-brand" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={tickerFact}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs font-bold text-gray-400 italic"
                    >
                      {tickerFact}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-6xl border border-white dark:border-white/5"
            >
              <Image 
                src="/images/know-your-clothes-hero.png" 
                alt="Know Your Clothes Hero" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── Fact Generator Tool ──────────────────────────────────────── */}
      <section className="py-24 relative" id="generator">
         <Container>
            <div className="max-w-4xl mx-auto space-y-12">
               <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black text-gray-950 dark:text-gray-100" style={{ fontFamily: "var(--font-display)" }}>Discover Clothing Facts</h2>
                  <p className="text-gray-500 font-medium">Choose a combination to reveal the eco-truth.</p>
               </div>

               <div className="bg-white dark:bg-card rounded-[4rem] p-12 shadow-6xl border border-gray-200 dark:border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand/[0.03] pointer-events-none" />
                  
                  <div className="relative z-10 grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
                     {/* Garment Selector */}
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand block ml-2">Textile Hub</label>
                        <select 
                          value={selectedGarment}
                          onChange={(e) => {
                             setSelectedGarment(e.target.value);
                             setSelectedMaterial(GARMENT_DATA[e.target.value as keyof typeof GARMENT_DATA][0]);
                          }}
                          className="w-full h-16 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-6 font-black text-gray-950 dark:text-gray-100 focus:ring-2 focus:ring-brand outline-none transition-all cursor-pointer appearance-none"
                        >
                           {Object.keys(GARMENT_DATA).map(g => (
                             <option key={g} value={g}>{g}</option>
                           ))}
                        </select>
                     </div>

                     <div className="hidden md:flex flex-col items-center justify-center opacity-20">
                        <div className="w-px h-12 bg-gray-400" />
                        <span className="text-[10px] font-black my-2">MIX</span>
                        <div className="w-px h-12 bg-gray-400" />
                     </div>

                     {/* Material Selector */}
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand block ml-2">Element</label>
                        <select 
                          value={selectedMaterial}
                          onChange={(e) => setSelectedMaterial(e.target.value)}
                          className="w-full h-16 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 px-6 font-black text-gray-950 dark:text-gray-100 focus:ring-2 focus:ring-brand outline-none transition-all cursor-pointer appearance-none"
                        >
                           {GARMENT_DATA[selectedGarment as keyof typeof GARMENT_DATA].map(m => (
                             <option key={m} value={m}>{m}</option>
                           ))}
                        </select>
                     </div>
                  </div>

                  <div className="mt-12 flex justify-center">
                     <button 
                       onClick={handleGenerateFact}
                       disabled={isLoading}
                       className="group relative px-12 py-5 bg-brand text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all overflow-hidden disabled:opacity-50"
                     >
                        <span className="relative z-10 flex items-center gap-3">
                           {isLoading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                           {isLoading ? "Consulting Archives..." : "Show Fact"}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                     </button>
                  </div>
               </div>

               {/* Fact Display Area */}
               <AnimatePresence mode="wait">
                  {currentFact && !isLoading && (
                     <motion.div 
                       initial={{ opacity: 0, y: 40, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: -20, scale: 0.95 }}
                       transition={{ type: "spring", damping: 20 }}
                       className="relative p-12 md:p-16 rounded-[4rem] bg-gray-950 text-white overflow-hidden text-center shadow-6xl"
                     >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                           <Leaf className="w-40 h-40 rotate-12" />
                        </div>
                        
                        <div className="relative z-10 space-y-10">
                           <div className="space-y-2">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-light">The Result</span>
                              <h3 className="text-4xl md:text-6xl font-black italic text-white" style={{ fontFamily: "var(--font-display)" }}>
                                 {selectedMaterial} {selectedGarment.slice(0, -1)}
                              </h3>
                           </div>
                           
                           <p className="text-xl md:text-3xl font-medium leading-[1.35] max-w-3xl mx-auto text-white/90">
                              "{currentFact}"
                           </p>

                           <div className="pt-6 space-y-6">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Spread the eco-truth</p>
                              <div className="flex flex-wrap justify-center gap-4">
                                 <button onClick={() => shareFact('twitter')} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand hover:border-brand transition-all">
                                    <Twitter className="w-5 h-5" />
                                 </button>
                                 <button onClick={() => shareFact('facebook')} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand hover:border-brand transition-all">
                                    <Facebook className="w-5 h-5" />
                                 </button>
                                 <button onClick={() => shareFact('whatsapp')} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand hover:border-brand transition-all">
                                    <MessageCircle className="w-5 h-5" />
                                 </button>
                                 <button onClick={() => {
                                    navigator.clipboard.writeText(currentFact || "");
                                    alert("Fact copied to clipboard!");
                                 }} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                                    <Share2 className="w-5 h-5" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </Container>
      </section>

      {/* ─── Sustainability CTA ──────────────────────────────────────── */}
      <section className="py-32 relative bg-brand/5 dark:bg-card/50">
        <Container>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-black text-brand uppercase tracking-widest">
                Action Required
              </div>
              <h2 className="text-6xl md:text-7xl font-black leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>
                Ready to make a <br/><span className="text-brand">difference?</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
                Unwanted clothes are not trash—they are valuable resources. By recycling with NoKasa, you save water, divert waste from landfills, and actively fight climate change.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { icon: <Droplets className="w-5 h-5" />, label: "Save Water", desc: "Reduces primary consumption" },
                  { icon: <Leaf className="w-5 h-5" />, label: "Reduce Waste", desc: "Landfill diversion at scale" },
                  { icon: <RefreshCcw className="w-5 h-5" />, label: "CO2 Credits", desc: "Offset your footprint" }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/20">
                      {item.icon}
                    </div>
                    <h4 className="font-black text-gray-950 dark:text-gray-100">{item.label}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-12 bg-white dark:bg-card border border-gray-100 dark:border-white/5 rounded-[4rem] shadow-6xl group overflow-hidden">
               <div className="relative z-10 space-y-8 text-center">
                  <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                     <RefreshCcw className="w-10 h-10 text-brand" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-950 dark:text-gray-100">Circular Mode</h3>
                  <p className="text-sm text-gray-500 font-medium">Turn your wardrobe waste into rewards. Start your recycling journey today.</p>
                  <a href="/#bin-form" className="block w-full py-5 bg-brand text-white rounded-2xl text-[11px] font-black uppercase tracking-widest text-center shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all">
                     Join the Movement
                  </a>
               </div>
               <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 blur-[60px] rounded-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Smart Bin Promotion ──────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <Container>
          <div className="relative p-16 md:p-32 rounded-[6rem] bg-gray-950 text-white overflow-hidden shadow-6xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand/20 border border-brand/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-light">The Infrastructure</div>
                  <h2 className="text-5xl md:text-7xl font-black leading-[0.95] text-white" style={{ fontFamily: "var(--font-display)" }}>
                    NoKasa <br/> Smart Bin. ♻️
                  </h2>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed">
                    A rewarding, ethical, and effortless clothing disposal point for your society. Made with circular logic from design to deployment.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { icon: <Zap className="w-5 h-5" />, title: "Instant Payouts", desc: "Get rewards as you deposit." },
                    { icon: <ShieldCheck className="w-5 h-5" />, title: "Secure Loop", desc: "Verified processing chain." },
                    { icon: <Smartphone className="w-5 h-5" />, title: "App Tracking", desc: "Live impact dashboard." },
                    { icon: <RefreshCcw className="w-5 h-5" />, title: "Solar Powered", desc: "Clean energy recycling." }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-all">
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white mb-1 uppercase tracking-widest">{feat.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                   <a href="/#bin-form" className="inline-flex h-16 px-12 items-center justify-center bg-brand text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all">
                      Request Deployment
                   </a>
                </div>
              </div>

              <div className="relative h-[600px] hidden lg:block">
                 <Image 
                   src="/images/smart-bin.png" 
                   alt="Smart Bin" 
                   fill 
                   className="object-contain drop-shadow-[0_0_100px_rgba(44,76,59,0.3)]"
                 />
              </div>
            </div>
            
            {/* Ambient Background Circles */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 blur-[150px] rounded-full -mr-1/4 -mt-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full -ml-1/4 -mb-1/4" />
          </div>
        </Container>
       </section>
     </main>
   );
 }
