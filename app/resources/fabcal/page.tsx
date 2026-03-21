"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  Droplets, 
  Wind, 
  Zap, 
  Fuel, 
  ChevronRight, 
  RefreshCcw, 
  ShieldCheck, 
  Coins, 
  ArrowRight,
  Info,
  Layers,
  ShoppingBag,
  Trash2,
  TreePine,
  Smartphone
} from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { LeafBackground } from "@/components/ui/leaf-background";
import { Footer } from "@/components/layout/footer";

/* ─── Data & Constants ─────────────────────────────────────────────── */

const GARMENTS = ["T-Shirt", "Jeans", "Sweater", "Dress", "Jackets"];
const MATERIALS = ["Cotton", "Polyester", "Linen", "Denim", "Wool"];

const IMPACT_BASE = {
  "T-Shirt": {
    "Cotton": { water: 2700, co2: 5.3, energy: 8.5, oil: 0.5, showers: 33, km: 20, tv: 28, gas: 0.6 },
    "Polyester": { water: 500, co2: 12.0, energy: 12.0, oil: 2.1, showers: 6, km: 45, tv: 40, gas: 2.4 },
    "Linen": { water: 1200, co2: 4.5, energy: 6.8, oil: 0.3, showers: 14, km: 15, tv: 22, gas: 0.4 },
  },
  "Jeans": {
    "Denim": { water: 7600, co2: 33.4, energy: 48.0, oil: 1.8, showers: 95, km: 125, tv: 160, gas: 2.1 },
    "Cotton": { water: 6800, co2: 30.0, energy: 42.0, oil: 1.5, showers: 85, km: 110, tv: 140, gas: 1.8 },
  },
  "Sweater": {
    "Wool": { water: 3500, co2: 18.0, energy: 25.0, oil: 0.8, showers: 42, km: 65, tv: 80, gas: 1.0 },
    "Polyester": { water: 800, co2: 24.0, energy: 30.0, oil: 3.5, showers: 10, km: 90, tv: 100, gas: 4.0 },
  },
  "Dress": {
    "Cotton": { water: 4500, co2: 15.0, energy: 20.0, oil: 1.1, showers: 55, km: 55, tv: 65, gas: 1.2 },
    "Polyester": { water: 1000, co2: 28.0, energy: 35.0, oil: 4.0, showers: 12, km: 105, tv: 115, gas: 4.5 },
  },
  "Jackets": {
    "Denim": { water: 8500, co2: 40.0, energy: 55.0, oil: 2.2, showers: 105, km: 150, tv: 180, gas: 2.5 },
    "Polyester": { water: 1500, co2: 50.0, energy: 70.0, oil: 6.0, showers: 18, km: 190, tv: 230, gas: 6.8 },
  }
};

const DEFAULT_IMPACT = { water: 2500, co2: 10, energy: 15, oil: 1.2, showers: 30, km: 40, tv: 50, gas: 1.5 };

function ImpactChart({ color = "#2c4c3b" }: { color?: string }) {
  const points = [15, 35, 25, 65, 45, 90, 75, 100];
  const width = 800;
  const height = 200;
  const gap = width / (points.length - 1);
  
  const pathData = `M 0,${height - (points[0] / 100) * height} ` + 
    points.slice(1).map((p, i) => `L ${(i + 1) * gap},${height - (p / 100) * height}`).join(" ");

  return (
    <div className="w-full h-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Fill Area */}
        <motion.path
          d={`${pathData} L ${width},${height} L 0,${height} Z`}
          fill="url(#chart-grad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Data Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={i * gap}
            cy={height - (p / 100) * height}
            r="6"
            fill="white"
            stroke={color}
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

function MiniChart() {
   return (
      <div className="w-full h-full flex items-end gap-[2px]">
         {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
            <motion.div 
               key={i}
               initial={{ height: 0 }}
               whileInView={{ height: `${h}%` }}
               transition={{ delay: i * 0.05, duration: 0.5 }}
               className="flex-1 bg-brand/40 rounded-t-sm"
            />
         ))}
      </div>
   );
}

export default function FabCalPage() {
  const [garment, setGarment] = useState("T-Shirt");
  const [material, setMaterial] = useState("Cotton");
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const AVATARS = [
    "avatar_1_1774014610488.png",
    "avatar_2_1774014629711.png",
    "avatar_3_1774014649548.png",
    "avatar_4_1774014668313.png"
  ];

  // Sync material options based on garment
  const availableMaterials = IMPACT_BASE[garment as keyof typeof IMPACT_BASE] 
    ? Object.keys(IMPACT_BASE[garment as keyof typeof IMPACT_BASE]) 
    : ["Cotton", "Polyester"];

  useEffect(() => {
     if (!availableMaterials.includes(material)) {
        setMaterial(availableMaterials[0]);
     }
  }, [garment]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setResult(null);
    
    setTimeout(() => {
      const base = (IMPACT_BASE[garment as keyof typeof IMPACT_BASE] as any)?.[material] || DEFAULT_IMPACT;
      const finalResult = {
        water: base.water * quantity,
        co2: (base.co2 * quantity).toFixed(1),
        energy: (base.energy * quantity).toFixed(1),
        oil: (base.oil * quantity).toFixed(1),
        showers: Math.round(base.showers * quantity),
        km: Math.round(base.km * quantity),
        tv: Math.round(base.tv * quantity),
        gas: (base.gas * quantity).toFixed(1)
      };
      setResult(finalResult);
      setIsCalculating(false);
    }, 1200);
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-brand selection:text-white">
      <Particles 
        className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40" 
        count={200} 
      />
      <LeafBackground />

      {/* ─── Hero / Awareness ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-8">
                   <Droplets className="w-3.5 h-3.5 text-brand" />
                   <span className="text-[11px] font-black text-brand uppercase tracking-widest">Sustainability Intelligence</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-gray-950 dark:text-gray-100 mb-8 leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>
                  The hidden <br/> cost of <br/> <span className="text-brand">Fabrics.</span>
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-lg mb-12">
                   Beneath every garment lies a massive ecological blueprint. From thirsting cotton fields to fossil-fuel based synthetics, your closet tells a silent story.
                </p>
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
                      <h4 className="text-3xl font-black text-gray-950 dark:text-gray-100 mb-1">2,700L</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Water / T-Shirt</p>
                   </div>
                   <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
                      <h4 className="text-3xl font-black text-gray-950 dark:text-gray-100 mb-1">10%</h4>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Emissions</p>
                   </div>
                </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="relative aspect-square"
             >
                <div className="absolute inset-0 bg-brand/20 blur-[120px] rounded-full animate-pulse" />
                <div className="relative z-10 w-full h-full rounded-[4rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-3xl">
                   <Image 
                      src="/images/fabric-impact-hero.png" 
                      alt="Environmental Impact" 
                      fill 
                      className="object-cover transition-transform duration-1000 hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                   <div className="absolute bottom-10 left-10 right-10 p-8 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      <p className="text-lg font-black leading-tight italic">"The most sustainable garment is the one already in your closet — or the one being rescued for recycle."</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── The Calculator ─────────────────────────────────────────── */}
      <section className="py-24 relative" id="calculator">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-white/10 to-transparent" />
        <Container>
           <div className="max-w-6xl mx-auto">
              <div className="bg-white dark:bg-card rounded-[4rem] border border-gray-100 dark:border-white/5 shadow-2xl overflow-hidden grid lg:grid-cols-[1.2fr_1.8fr]">
                 
                 {/* Left: Inputs */}
                 <div className="p-12 md:p-16 border-r border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-12">
                       <RefreshCcw className="w-8 h-8 text-brand" />
                       <h2 className="text-3xl font-black text-gray-950 dark:text-gray-100">Impact Meter.</h2>
                    </div>

                    <div className="space-y-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Garment Type</label>
                          <div className="grid grid-cols-2 gap-3">
                             {GARMENTS.map(g => (
                                <button 
                                  key={g} 
                                  onClick={() => setGarment(g)}
                                  className={`px-4 py-3 rounded-2xl text-[13px] font-bold border transition-all ${garment === g ? "bg-brand text-white border-brand shadow-lg" : "bg-white dark:bg-white/5 text-gray-500 border-gray-100 dark:border-white/5 hover:border-brand/30"}`}
                                >
                                   {g}
                                </button>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Fabric Material</label>
                          <div className="flex flex-wrap gap-3">
                             {availableMaterials.map(m => (
                                <button 
                                  key={m} 
                                  onClick={() => setMaterial(m)}
                                  className={`px-6 py-2.5 rounded-full text-[13px] font-bold border transition-all ${material === m ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950 border-gray-900" : "bg-transparent text-gray-400 border-gray-100 dark:border-white/5 hover:border-gray-300"}`}
                                >
                                   {m}
                                </button>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Quantity (pcs)</label>
                          <div className="flex items-center gap-6">
                             <input 
                                type="range" 
                                min="1" 
                                max="50" 
                                value={quantity} 
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="flex-1 accent-brand h-1.5 rounded-full bg-gray-200 dark:bg-white/10"
                             />
                             <span className="text-3xl font-black text-gray-950 dark:text-gray-100 w-12">{quantity}</span>
                          </div>
                       </div>

                       <button 
                         onClick={handleCalculate}
                         disabled={isCalculating}
                         className="w-full py-5 bg-brand text-white rounded-[2rem] text-[12px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                       >
                          {isCalculating ? (
                             <RefreshCcw className="w-5 h-5 animate-spin" />
                          ) : (
                             <>Run Calculation <ChevronRight className="w-5 h-5" /></>
                          )}
                       </button>
                    </div>
                 </div>

                 {/* Right: Results */}
                 <div className="p-12 md:p-16 flex flex-col justify-center relative bg-white dark:bg-transparent">
                    <AnimatePresence mode="wait">
                       {!result && !isCalculating && (
                          <motion.div 
                             key="empty"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="text-center space-y-6"
                          >
                             <div className="w-24 h-24 rounded-[2.5rem] bg-brand/5 border border-brand/10 flex items-center justify-center mx-auto text-brand animate-bounce">
                                <Info className="w-10 h-10" />
                             </div>
                             <h3 className="text-3xl font-black text-gray-950 dark:text-gray-100">Ready to visualize?</h3>
                             <p className="text-gray-500 font-medium max-w-sm mx-auto">Input your garment details to reveal the environmental footprint behind them.</p>
                          </motion.div>
                       )}

                       {isCalculating && (
                          <motion.div 
                             key="loading"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="text-center space-y-8"
                          >
                             <div className="relative w-40 h-40 mx-auto">
                                <svg className="w-full h-full transform -rotate-90">
                                   <circle cx="80" cy="80" r="70" className="stroke-gray-100 dark:stroke-white/5" strokeWidth="8" fill="none" />
                                   <motion.circle 
                                      cx="80" cy="80" r="70" 
                                      className="stroke-brand" 
                                      strokeWidth="8" 
                                      fill="none" 
                                      strokeDasharray="440"
                                      initial={{ strokeDashoffset: 440 }}
                                      animate={{ strokeDashoffset: 0 }}
                                      transition={{ duration: 1.2, ease: "linear" }}
                                   />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                   <RefreshCcw className="w-10 h-10 text-brand animate-spin" />
                                </div>
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-brand animate-pulse">Analyzing Resource Matrix...</p>
                          </motion.div>
                       )}

                       {result && !isCalculating && (
                          <motion.div 
                             key="result"
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="space-y-10"
                          >
                             <div className="grid grid-cols-2 gap-4">
                               <div className="p-8 rounded-[2.5rem] bg-brand/5 dark:bg-white/5 border border-brand/20 dark:border-white/10 group overflow-hidden relative">
                                  <Droplets className="w-8 h-8 text-brand mb-4" />
                                  <h4 className="text-4xl font-black text-gray-950 dark:text-gray-100 mb-1 leading-none">{result.water.toLocaleString()}L</h4>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-6">Freshwater Volume</p>
                                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 w-fit border border-gray-100 dark:border-white/10">
                                     <RefreshCcw className="w-3 h-3 text-brand" />
                                     <span className="text-[9px] font-black text-gray-500 uppercase italic">≈ {result.showers} Showers</span>
                                  </div>
                               </div>
 
                               <div className="p-8 rounded-[2.5rem] bg-white dark:bg-gray-950 text-gray-950 dark:text-white border border-gray-100 dark:border-white/10 group overflow-hidden relative shadow-2xl dark:shadow-none transition-all duration-500">
                                  <Wind className="w-8 h-8 text-brand-light dark:text-brand mb-4" />
                                  <h4 className="text-4xl font-black mb-1 leading-none text-gray-950 dark:text-gray-100">{result.co2}kg</h4>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 font-bold">CO₂ Emissions</p>
                                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 w-fit border border-gray-100 dark:border-white/10">
                                     <ArrowRight className="w-3 h-3 text-brand" />
                                     <span className="text-[9px] font-black text-gray-500 dark:text-white/60 uppercase italic">≈ driving {result.km}km</span>
                                  </div>
                               </div>
 
                               <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 group overflow-hidden relative">
                                  <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                                  <h4 className="text-4xl font-black text-gray-950 dark:text-gray-100 mb-1 leading-none">{result.energy}kWh</h4>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-6">Primary Energy</p>
                                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 w-fit border border-gray-200 dark:border-white/10">
                                     <span className="text-[9px] font-black text-gray-500 uppercase italic">≈ {result.tv}h of TV usage</span>
                                  </div>
                               </div>
 
                               <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 group overflow-hidden relative">
                                  <Fuel className="w-8 h-8 text-orange-500 mb-4" />
                                  <h4 className="text-4xl font-black text-gray-950 dark:text-gray-100 mb-1 leading-none">{result.oil}kg</h4>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-6">Crude Oil Input</p>
                                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 w-fit border border-gray-200 dark:border-white/10">
                                     <span className="text-[9px] font-black text-gray-500 uppercase italic">≈ {result.gas}L of gasoline</span>
                                  </div>
                               </div>
                             </div>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </div>
           </div>
        </Container>
      </section>

      {/* ─── Circular Fashion ────────────────────────────────────────── */}
      <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-brand/5 blur-[120px] rounded-full -left-1/4" />
         <Container className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand/20 border border-brand/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-light">The Circular Economy</div>
                  <h2 className="text-5xl md:text-7xl font-black leading-[0.95] text-white" style={{ fontFamily: "var(--font-display)" }}>
                     Breaking the <br/> Linear Cycle. 🌿
                  </h2>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
                     The current fashion model is broken. Millions of tons are discarded yearly, yet less than 1% is recycled into new clothes. NoKasa bridges that gap.
                  </p>
                  <div className="space-y-6 pt-4">
                     {[
                       { title: "Rescue", desc: "Diverting garments from landfills via community infrastructure." },
                       { title: "Redistribute", desc: "Ensuring high-quality fabrics find a second, meaningful life." },
                       { title: "Reclaim", desc: "Transforming textile carbon into new industrial value." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 group">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand transition-all group-hover:bg-brand group-hover:text-white">
                             <RefreshCcw className="w-5 h-5" />
                          </div>
                           <div>
                             <h4 className="text-lg font-black text-white mb-1">{item.title}</h4>
                             <p className="text-sm text-gray-400 font-medium">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="relative group">
                  <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-1000" />
                  <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl aspect-[4/5]">
                     <Image src="/images/circular-economy-wardrobe.png" alt="Circular Living" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                     <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent">
                        <div className="p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20">
                           <h4 className="text-3xl font-black mb-2 leading-none text-white">Join the loop.</h4>
                           <p className="text-gray-400 text-sm font-medium">Be the first in your society to start recycling.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* ─── Smart Bin Section ────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden bg-white dark:bg-background transition-colors duration-500">
        <Container>
          <div className="relative p-16 md:p-32 rounded-[6rem] bg-gray-950 text-white overflow-hidden shadow-6xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand/20 border border-brand/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-light">The Infrastructure</div>
                  <h2 className="text-5xl md:text-7xl font-black leading-[0.95] text-white" style={{ fontFamily: "var(--font-display)" }}>
                    NoKasa <br/> Smart Bin. ♻️
                  </h2>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
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
                        <h4 className="text-sm font-black text-white mb-1 uppercase tracking-widest leading-none">{feat.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                   <a href="#request" className="inline-flex h-16 px-12 items-center justify-center bg-brand text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all">
                      Request Deployment
                   </a>
                </div>
              </div>

              <div className="relative h-[600px] hidden lg:block">
                 <Image 
                   src="/images/smart-bin.png" 
                   alt="Smart Bin" 
                   fill 
                   className="object-contain drop-shadow-[0_0_100px_rgba(44,76,59,0.3)] transition-transform duration-1000 group-hover:scale-105"
                 />
              </div>
            </div>
            
            {/* Ambient Background Circles */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 blur-[150px] rounded-full -mr-1/4 -mt-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full -ml-1/4 -mb-1/4" />
          </div>
        </Container>
      </section>

      {/* ─── Community Request Form ──────────────────────────────────── */}
      <section className="py-24" id="request">
         <Container>
            <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[5rem] bg-gray-950 text-white relative overflow-hidden shadow-6xl">
               <div className="relative z-10 grid lg:grid-cols-2 gap-20">
                  <div className="space-y-10">
                     <h2 className="text-5xl md:text-7xl font-black leading-[0.9] text-white" style={{ fontFamily: "var(--font-display)" }}>Get a <br/> Smart Bin <br/> in your <br/> Society.</h2>
                     <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm">
                        Reside in a residential society, office, or community space? Lead the movement. Request a bin deployment today.
                     </p>
                     <div className="flex items-center gap-4 text-brand font-black italic">
                        <RefreshCcw className="w-6 h-6 animate-spin-slow" />
                        <span>24h Installation Promise*</span>
                     </div>
                  </div>

                  <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
                     <div className="space-y-2">
                        <input type="text" placeholder="Society / Hub Name" className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand transition-colors px-4 outline-none font-bold text-white placeholder:text-gray-600" />
                     </div>
                     <div className="space-y-2">
                        <input type="text" placeholder="Pincode" className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand transition-colors px-4 outline-none font-bold text-white placeholder:text-gray-600" />
                     </div>
                     <div className="space-y-2">
                        <input type="text" placeholder="Your Name" className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand transition-colors px-4 outline-none font-bold text-white placeholder:text-gray-600" />
                     </div>
                     <div className="space-y-2">
                        <input type="email" placeholder="Email Address" className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand transition-colors px-4 outline-none font-bold text-white placeholder:text-gray-600" />
                     </div>
                     <button className="w-full py-5 bg-brand text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Complete Request
                     </button>
                  </div>
               </div>
               {/* Background decor */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/10 blur-[150px] rounded-full" />
            </div>
         </Container>
      </section>

      {/* ─── Visual Impact Chart ────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-brand/5 dark:bg-card/50">
         <Container>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
               <div className="space-y-6">
                  <div className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-black text-brand uppercase tracking-widest w-fit">Performance Metrics</div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-gray-100 leading-tight">Quantifying our <br/><span className="text-brand">positive curve.</span></h2>
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                     Every smart bin we deploy creates an exponential shift in resource preservation. This visualization tracks our cumulative textile rescue trajectory.
                  </p>
                  <div className="flex items-center gap-6 pt-4">
                     <div>
                        <p className="text-2xl font-black text-gray-950 dark:text-gray-100">+124%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand">Monthly Growth</p>
                     </div>
                     <div className="w-px h-10 bg-gray-200 dark:bg-white/10" />
                     <div>
                        <p className="text-2xl font-black text-gray-950 dark:text-gray-100">8.2k</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand">Active Users</p>
                     </div>
                  </div>
               </div>
               
               <div className="p-10 md:p-12 rounded-[4rem] bg-white dark:bg-card border border-white dark:border-white/5 shadow-2xl relative">
                  <div className="flex items-center justify-between mb-12">
                     <div>
                        <h4 className="text-lg font-black text-gray-950 dark:text-gray-100">Rescue Volume (KG)</h4>
                        <p className="text-xs text-gray-400">Cumulative societal impact over last 8 months</p>
                     </div>
                     <RefreshCcw className="w-5 h-5 text-brand opacity-20" />
                  </div>
                  <div className="h-[250px] md:h-[300px]">
                     <ImpactChart />
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50 dark:border-white/5">
                     {["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"].map(q => (
                        <p key={q} className="text-[10px] font-black text-gray-300 uppercase tracking-widest text-center">{q}</p>
                     ))}
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* ─── Global Impact ───────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
         <Container>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {[
                  { label: "Textiles Rescued", val: "256", unit: "KG", icon: <Layers className="w-5 h-5" /> },
                  { label: "Water Preserved", val: "10.2M", unit: "LITERS", icon: <Droplets className="w-5 h-5" /> },
                  { label: "CO₂ Avoided", val: "7,000", unit: "KG", icon: <Wind className="w-5 h-5" /> }
                ].map((stat, i) => (
                  <div key={i} className="p-12 rounded-[4rem] bg-white dark:bg-card border border-gray-200 dark:border-white/5 text-center group transition-all duration-500 hover:-translate-y-2">
                     <div className="w-12 h-12 rounded-2xl bg-brand/5 dark:bg-white/5 flex items-center justify-center text-brand mx-auto mb-8">
                        {stat.icon}
                     </div>
                     <h4 className="text-6xl font-black text-gray-950 dark:text-gray-100 mb-2 leading-none" style={{ fontFamily: "var(--font-display)" }}>{stat.val}<span className="text-2xl ml-1">{stat.unit}</span></h4>
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
            </div>
         </Container>
      </section>

      {/* ─── Final CTA with Flip ─────────────────────────────────────── */}
      <section className="py-32 relative">
         <Container>
            <div className="relative w-full h-[600px] perspective-2000">
               <motion.div 
                 animate={{ rotateY: isFlipped ? 180 : 0 }}
                 transition={{ duration: 0.8, ease: "circOut" }}
                 style={{ transformStyle: "preserve-3d" }}
                 className="relative w-full h-full"
               >
                  {/* Front: Join Movement */}
                  <div className="absolute inset-0 backface-hidden p-16 md:p-32 rounded-[6rem] bg-brand text-white overflow-hidden text-center flex flex-col items-center justify-center">
                     <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                        <h2 className="text-6xl md:text-8xl font-black leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>Join the <br/> Movement.</h2>
                        <p className="text-white/80 text-xl font-medium">Use the calculator, request a bin, and let's clean the earth together.</p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                           <a href="/#bin-form" className="px-10 py-5 bg-white text-gray-950 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform flex items-center justify-center">Get Started Today</a>
                           <button 
                             onClick={() => setIsFlipped(true)}
                             className="px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                           >
                              View Our Impact
                           </button>
                        </div>
                     </div>
                     {/* Floating circles */}
                     <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
                     <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]" />
                  </div>

                  {/* Back: Impact Hub (Data Dashboard) */}
                  <div 
                    className="absolute inset-0 backface-hidden p-8 md:p-16 rounded-[6rem] bg-gray-950 text-white flex flex-col items-center justify-center text-center shadow-6xl"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                     <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
                        {/* Stats Dashboard */}
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-left space-y-4 col-span-2 relative overflow-hidden group">
                              <div className="flex justify-between items-end relative z-10">
                                 <div className="space-y-1">
                                    <p className="text-[11px] font-black uppercase tracking-widest text-brand-light">Growth Velocity</p>
                                    <h4 className="text-5xl font-black italic">2.4M <span className="text-xl">LTR</span></h4>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Freshwater Rescued</p>
                                 </div>
                                 <div className="w-40 h-20 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <MiniChart />
                                 </div>
                              </div>
                              <div className="absolute inset-0 bg-brand/5 pointer-events-none" />
                           </div>
                           <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-left space-y-2">
                              <p className="text-[10px] font-black uppercase tracking-widest text-brand">Total Orders</p>
                              <h4 className="text-4xl font-black tracking-tight">1,420+</h4>
                              <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-tight">Societies Active</p>
                           </div>
                           <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-left space-y-2">
                              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Waste Saved</p>
                              <h4 className="text-4xl font-black tracking-tight">5,850<span className="text-sm">KG</span></h4>
                              <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-tight">Collected Weekly</p>
                           </div>
                        </div>

                        {/* CTA Hub */}
                        <div className="space-y-10 text-left">
                           <div className="space-y-4">
                               <h3 className="text-4xl md:text-5xl font-black leading-[1.1] text-white" style={{ fontFamily: "var(--font-display)" }}>Believe in our <br/> <span className="text-brand-light">Numbers.</span></h3>
                              <p className="text-gray-400 font-medium leading-relaxed">We don't just recycle; we quantify every gram of impact to ensure a transparent circular loop.</p>
                           </div>
                           <div className="flex flex-col gap-4">
                              <a href="/#bin-form" className="group h-16 px-10 bg-brand text-white rounded-2xl flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand/40 hover:scale-[1.02] active:scale-95 transition-all">
                                 Become a Partner <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </a>
                              <button 
                                onClick={() => setIsFlipped(false)}
                                className="h-16 px-10 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all uppercase"
                              >
                                 Back to Calculator
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </Container>
      </section>
   </main>
  );
}
