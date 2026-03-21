"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Particles } from "@/components/ui/particles";
import { LeafBackground } from "@/components/ui/leaf-background";
import { Magnetic } from "@/components/ui/magnetic";
import { 
  Camera, 
  Sparkles, 
  ChevronRight, 
  Star, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Upload,
  Zap,
  ShieldCheck,
  ZapIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const OCCASIONS = [
  "Casual Hangout",
  "Business Meeting",
  "Date Night",
  "Wedding Guest",
  "Formal Event",
  "Gym / Athletic",
  "Airport Look",
  "Beach Day",
];

const STYLES = [
  "Minimalist",
  "Streetwear",
  "Ethnic / Traditional",
  "Old Money",
  "Grunge",
  "Y2K",
  "Preppy",
  "Avant-Garde",
];

export default function FitCheckPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
      setError(null);
    }
  };

  const runAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);

    // Prepare form data
    const formData = new FormData();
    formData.append("image", file);
    formData.append("occasion", occasion);
    formData.append("style", style);

    try {
      const res = await fetch("/api/fit-check", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setResult(data); // Store the error data to show 'details'
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 relative bg-background overflow-hidden transition-colors">
      <LeafBackground />
      <Particles count={70} className="opacity-60 dark:opacity-80" />

      {/* Hero Header */}
      <section className="relative z-10 pt-10 pb-16 overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 px-4">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 dark:bg-brand/10 border border-brand/10 dark:border-brand/20 text-[11px] font-bold text-brand dark:text-brand-light uppercase tracking-widest mb-6"
             >
                <Zap className="w-3.5 h-3.5 fill-current" />
                AI Powered Styling
             </motion.div>
             <h1 
               className="text-[52px] md:text-[72px] font-black text-gray-950 dark:text-gray-100 leading-[0.95] mb-6 tracking-tighter"
               style={{ fontFamily: "var(--font-display)" }}
             >
                Elevate your<br />
                <span className="text-brand">attire instantly.</span>
             </h1>
             <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
                NoKasa FitCheck uses advanced AI to analyze your outfit and provide professional styling recommendations in seconds.
             </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
             
             {/* Left: Input / Upload */}
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-card/50 backdrop-blur-3xl rounded-[3rem] border border-gray-100 dark:border-white/5 p-8 md:p-12 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.12)] relative z-20"
             >
                {!preview ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-[4/5] rounded-[2.5rem] border-2 border-dashed border-gray-100/10 dark:border-white/5 bg-gray-50/10 dark:bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/20 dark:hover:bg-white/10 transition-all group overflow-hidden relative shadow-inner"
                  >
                     <div className="p-10 rounded-full bg-brand/5 dark:bg-brand/10 text-brand dark:text-brand-light mb-8 group-hover:scale-110 transition-transform duration-500">
                        <Camera className="w-14 h-14" strokeWidth={1.2} />
                     </div>
                     <p className="text-2xl font-black text-gray-950 dark:text-gray-100 mb-2 tracking-tight">Upload Your Fit</p>
                     <p className="text-gray-500 text-sm font-medium tracking-wide">Drag and drop or click to browse</p>
                     <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-900 group shadow-2xl">
                     <Image src={preview} alt="Fit Preview" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <button 
                       onClick={reset}
                       className="absolute top-6 right-6 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-black/70 transition-colors z-30"
                     >
                        <RotateCcw className="w-5 h-5" />
                     </button>
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />

                <div className="mt-12 space-y-10">
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Target Occasion</label>
                      <div className="grid grid-cols-2 gap-3 pb-2">
                        {OCCASIONS.map(oc => (
                          <button
                            key={oc}
                            onClick={() => setOccasion(oc)}
                            className={cn(
                              "px-4 py-2.5 rounded-2xl text-[13px] font-bold border-2 transition-all duration-300",
                              occasion === oc 
                                ? "bg-brand border-brand text-white shadow-lg shadow-brand/20" 
                                : "bg-transparent border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:border-brand/40"
                            )}
                          >
                            {oc}
                          </button>
                        ))}
                      </div>
                   </div>

                   <button
                     disabled={!file || isAnalyzing}
                     onClick={runAnalysis}
                     className={cn(
                       "w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all duration-500 active:scale-[0.98]",
                       !file || isAnalyzing
                         ? "opacity-50 cursor-not-allowed bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-gray-600"
                         : "bg-brand text-white hover:bg-brand/90 hover:shadow-brand/25"
                     )}
                   >
                     {isAnalyzing ? (
                       <Sparkles className="w-6 h-6 animate-spin" />
                     ) : (
                       <Sparkles className="w-6 h-6" />
                     )}
                     {isAnalyzing ? "Analyzing Texture & Fit..." : "Run AI Analysis"}
                   </button>

                   {error && (
                     <div className="text-center space-y-2">
                        <p className="text-red-500 font-bold text-sm tracking-tight">{error}</p>
                        <p className="text-[10px] text-red-400 opacity-60 font-medium">Technical details: {result?.details || "Unknown error"}</p>
                     </div>
                   )}
                </div>
             </motion.div>

             {/* Right: Results / Info */}
             <div className="relative">
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      className="bg-brand/[0.03] dark:bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] border border-brand/10 dark:border-white/10 p-10 md:p-14 min-h-[600px] flex flex-col shadow-inner"
                    >
                       <div className="flex items-center justify-between mb-16">
                          <div>
                            <p className="text-[12px] font-black tracking-[0.2em] text-brand/60 dark:text-brand-light/60 uppercase mb-2">Style Metric</p>
                            <h3 className="text-4xl font-black text-gray-950 dark:text-gray-100 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Fit Analysis</h3>
                          </div>
                          <div className="relative flex items-center justify-center w-28 h-28">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle 
                                  cx="56" cy="56" r="48" 
                                  className="stroke-gray-100 dark:stroke-white/5 fill-none" 
                                  strokeWidth="10" 
                                />
                                <motion.circle 
                                  cx="56" cy="56" r="48" 
                                  className="stroke-brand fill-none" 
                                  strokeWidth="10"
                                  strokeLinecap="round"
                                  initial={{ strokeDasharray: "301.59", strokeDashoffset: "301.59" }}
                                  animate={{ strokeDashoffset: 301.59 - (301.59 * (result.score || 85)) / 100 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                              </svg>
                              <div className="absolute text-center">
                                <span className="text-4xl font-black text-gray-950 dark:text-gray-100 leading-none">{result.score || 85}</span>
                                <span className="text-[10px] font-bold block text-gray-400 dark:text-gray-500 uppercase">Score</span>
                              </div>
                          </div>
                       </div>

                       <div className="space-y-12 flex-1">
                          <section>
                             <div className="flex items-center gap-3 mb-4">
                                <span className="p-2 rounded-xl bg-brand/10 text-brand">
                                  <CheckCircle2 className="w-5 h-5" />
                                </span>
                                <h4 className="text-lg font-black text-gray-900 dark:text-gray-100">The Verdict</h4>
                             </div>
                             <p className="text-[17px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed pl-1">
                                {result.verdict || "This silhouette perfectly handles the urban casual aesthetic. The tonal balance between the upper and lower layers creates a sophisticated yet relaxed feel."}
                             </p>
                          </section>

                          <section>
                             <div className="flex items-center gap-3 mb-6">
                                <span className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                                  <ZapIcon className="w-5 h-5" />
                                </span>
                                <h4 className="text-lg font-black text-gray-900 dark:text-gray-100">Refinement Strategy</h4>
                             </div>
                             <div className="space-y-4 pl-1">
                                {(result.changes || ["Swap the white sneakers for a darker boot to ground the look.", "Consider a silver-toned watch to match the cool undertones of the fabric."]).map((change: string, idx: number) => (
                                  <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm group hover:border-brand/30 transition-all duration-300">
                                     <ArrowRight className="w-5 h-5 text-brand shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                                     <span className="text-[15px] font-bold text-gray-700 dark:text-gray-300">{change}</span>
                                  </div>
                                ))}
                             </div>
                          </section>
                       </div>

                       <div className="mt-12 pt-8 border-t border-brand/10 dark:border-white/10 flex items-center justify-between">
                          <div className="flex -space-x-3">
                            {[1,2,3].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-950 bg-gray-200 overflow-hidden relative">
                                <Image src={`/images/hero-img-${i}.png`} alt={`User ${i}`} fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed text-right">
                             Verified by NoKasa Styling AI v2.4
                          </p>
                       </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-12 pt-8 lg:pt-16"
                    >
                       <div className="space-y-8">
                          <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                             Why use FitCheck?
                          </h3>
                          <div className="space-y-8">
                             {[
                               { 
                                 title: "Precision Analysis", 
                                 desc: "Our AI understands fabric textures, proportions, and color theories.",
                                 icon: <Sparkles className="w-5 h-5" />
                               },
                               { 
                                 title: "Context Aware", 
                                 desc: "Whether it's a beach day or a board meeting, the advice adapts.",
                                 icon: <CheckCircle2 className="w-5 h-5" />
                               },
                               { 
                                 title: "Zero Bias", 
                                 desc: "Get an honest, data-driven second opinion on any outfit Choice.",
                                 icon: <ShieldCheck className="w-5 h-5" />
                               }
                             ].map((trait, i) => (
                               <div key={i} className="flex gap-6 group">
                                  <div className="w-14 h-14 rounded-3xl bg-brand/5 dark:bg-white/5 border border-brand/10 dark:border-white/10 flex items-center justify-center text-brand dark:text-brand-light group-hover:bg-brand group-hover:text-white transition-all duration-500">
                                     {trait.icon}
                                  </div>
                                  <div>
                                     <h5 className="text-lg font-black text-gray-950 dark:text-gray-100 mb-1">{trait.title}</h5>
                                     <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-[320px]">{trait.desc}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="p-8 rounded-[3rem] bg-gray-950 dark:bg-white relative overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-brand/10 group mb-8">
                          <div className="relative z-10">
                             <h4 className="text-2xl font-black mb-3 text-white dark:text-gray-950">Upgrade your wardrobe 🌿</h4>
                             <p className="text-[15px] font-medium leading-relaxed mb-8 max-w-[280px] text-gray-400 dark:text-gray-600">
                                Use FitCheck daily to discover what items work best for your unique style.
                             </p>
                             <button className="px-8 py-3 bg-brand text-white dark:bg-gray-950 dark:text-gray-100 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 transition-transform">
                                Get Started
                             </button>
                          </div>
                          {/* Inner decor */}
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/30 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand/50 transition-colors" />
                          <div className="absolute bottom-0 right-0 p-6 opacity-10 dark:opacity-20 group-hover:rotate-12 transition-transform">
                             <Sparkles className="w-20 h-20 text-white dark:text-gray-950" />
                          </div>
                       </div>

                       {/* New: Style DNA Visualization to fill space */}
                       <div className="p-8 rounded-[3rem] border border-gray-100 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-xl relative overflow-hidden group">
                          <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">Your Style DNA</h5>
                          <div className="flex items-end gap-3 h-32 mb-6">
                             {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                <motion.div 
                                   key={i}
                                   initial={{ height: 0 }}
                                   animate={{ height: `${h}%` }}
                                   transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                                   className="flex-1 bg-brand/20 dark:bg-white/10 rounded-t-lg group-hover:bg-brand transition-colors relative"
                                >
                                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-brand dark:text-gray-400">
                                      {h}%
                                   </div>
                                </motion.div>
                             ))}
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-bold text-gray-400">Jan</span>
                             <div className="h-[1px] flex-1 mx-4 bg-gray-100 dark:bg-white/5" />
                             <span className="text-[10px] font-bold text-gray-400">Dec</span>
                          </div>
                          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand/5 blur-[50px] rounded-full" />
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </Container>
      </section>

      {/* --- New Sections to add life --- */}

      {/* 1. How it works (Interactive Steps) */}
      <section className="py-24 relative overflow-hidden bg-brand/[0.02] dark:bg-white/[0.01]">
         <Container>
            <div className="text-center max-w-2xl mx-auto mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-gray-100 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Style Intelligence in 3 steps.
               </h2>
               <p className="text-gray-500 dark:text-gray-400 font-medium">Professional styling advice used to take weeks. We reduced it to seconds.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
               {[
                 { 
                   step: "01",
                   title: "The Vision",
                   desc: "Capture a full-body shot of your outfit in good lighting for the most accurate fabric analysis.",
                   icon: <Camera className="w-6 h-6" />
                 },
                 { 
                   step: "02",
                   title: "The Context",
                   desc: "Specify your destination. Our AI adjusts its logic based on social norms and style theories.",
                   icon: <Zap className="w-6 h-6" />
                 },
                 { 
                   step: "03",
                   title: "The Evolution",
                   desc: "Receive your score and actionable refinements to transform a good outfit into a great one.",
                   icon: <Sparkles className="w-6 h-6" />
                 }
               ].map((item, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-10 rounded-[2.5rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-shadow group"
                 >
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-4xl font-black text-brand/10 dark:text-white/10">{item.step}</span>
                       <div className="w-12 h-12 rounded-2xl bg-brand/5 dark:bg-white/5 flex items-center justify-center text-brand dark:text-brand-light group-hover:bg-brand group-hover:text-white transition-all duration-500">
                          {item.icon}
                       </div>
                    </div>
                    <h4 className="text-xl font-black text-gray-950 dark:text-gray-100 mb-4">{item.title}</h4>
                    <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
         </Container>
      </section>

      {/* 2. Interactive Tip Section */}
      <section className="py-20">
         <Container>
            <div className="flex flex-col md:flex-row items-center gap-12 p-12 md:p-20 rounded-[4rem] bg-gray-950 text-white relative overflow-hidden group shadow-2xl">
               <div className="relative z-10 md:w-1/2">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest mb-6">Pro Stylist Tip</div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}> 
                    Proportions <br/> over Trends. 
                  </h3>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 max-w-[400px]">
                    "FitCheck isn't just about what you wear, but how you wear it. Master the 1/3 to 2/3 rule for an instant silhouette upgrade."
                  </p>
                  <button className="flex items-center gap-3 text-brand font-black hover:gap-5 transition-all">
                     Explore Style Theories <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
               <div className="md:w-1/2 relative h-[300px] md:h-[450px] w-full">
                  <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full" />
                  <div className="absolute inset-0 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
                     <Image src="/images/pro-stylist-studio.png" alt="Styling" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
                  </div>
               </div>
               {/* Animated background shape */}
               <motion.div 
                 animate={{ rotate: [0, 360] }}
                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                 className="absolute -top-40 -left-40 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" 
               />
            </div>
         </Container>
      </section>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 left-10 opacity-5 pointer-events-none select-none">
         <span className="text-[180px] font-black tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>Fit</span>
      </div>
      <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none select-none">
         <span className="text-[180px] font-black tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>Check</span>
      </div>
    </main>
  );
}
