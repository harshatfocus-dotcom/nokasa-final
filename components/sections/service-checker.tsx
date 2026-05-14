"use client";

import { useState, useMemo, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, XCircle, Search, Locate, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocationMap } from "@/components/ui/expand-map";

interface PincodeDetail {
  region: "North" | "South" | "East" | "West" | "Central";
  area: string;
}

const PINCODE_DATABASE: Record<string, PincodeDetail> = {
  // West Bangalore
  "560022": { region: "West", area: "Yeswanthpur" },
  "560086": { region: "West", area: "Vijayanagar/West of Chord Road" },
  "560040": { region: "West", area: "Vijayanagar" },
  "560026": { region: "West", area: "Deepanjalinagar" },
  "560079": { region: "West", area: "Nagarabhavi extensions" },
  "560091": { region: "West", area: "Vishwaneedam" },
  "560058": { region: "West", area: "Peenya" },
  "560057": { region: "West", area: "Peenya I Stage" },
  "560054": { region: "West", area: "Mallasandram west areas" },

  // East Bangalore
  "560066": { region: "East", area: "Whitefield/EPIP" },
  "560016": { region: "East", area: "Ramamurthy Nagar" },
  "560049": { region: "East", area: "Virgonagar" },
  "560038": { region: "East", area: "Marathahalli east" },
  "560067": { region: "East", area: "Bahreenvihar" },
  "560075": { region: "East", area: "Bellandur east" },

  // North Bangalore
  "560064": { region: "North", area: "Yelahanka" },
  "560097": { region: "North", area: "Vidyaranyapura" },
  "560077": { region: "North", area: "Dr. Shivarama Karanth Nagar" },
  "560073": { region: "North", area: "Nelakadiranahalli" },
  "560096": { region: "North", area: "Nandinilayout" },
  "560024": { region: "North", area: "H.A. Farm" },
  "560087": { region: "North", area: "Gunjur" },
  "560065": { region: "North", area: "GKVK" },
  "560094": { region: "North", area: "Doddenakundi north" },
  "560092": { region: "North", area: "Hagadur" },
  "560093": { region: "North", area: "Kadugodi" },

  // South Bangalore
  "560078": { region: "South", area: "Yelahanka Satellite south extensions/JP Nagar" },
  "560035": { region: "South", area: "Jayanagar" },
  "560070": { region: "South", area: "Jayanagar" },
  "560043": { region: "South", area: "Basavanagudi" },
  "560004": { region: "South", area: "Banshankari" },
  "560076": { region: "South", area: "Padmanabhanagar" },
  "560034": { region: "South", area: "Jayanagar 4th Block" },
  "560029": { region: "South", area: "Tavarekere" },
  "560109": { region: "South", area: "Thalaghattapura" },
  "560082": { region: "South", area: "Thataguni, nearby" },
  "560111": { region: "South", area: "Anjanapura extensions" },
  "560114": { region: "South", area: "Kudlu Gate south" },

  // Central Bangalore
  "560001": { region: "Central", area: "MG Road/Cubbon Road" },
  "560002": { region: "Central", area: "Bangalore City" },
  "560003": { region: "Central", area: "Vyalikaval/Palace Guttahalli" },
  "560011": { region: "Central", area: "Benson Town central" },
  "560010": { region: "Central", area: "Ulsoor Tank" },
  "560032": { region: "Central", area: "Jayanagar central" },
  "560061": { region: "Central", area: "R.T. Nagar central" },
  "560068": { region: "Central", area: "Kammanahalli central" },
  "560102": { region: "Central", area: "Domlur central" },
  "560103": { region: "Central", area: "Indiranagar central" },
  "560098": { region: "Central", area: "Rajarajeshwari Nagar central west edge" },
  "560060": { region: "Central", area: "Frazer Town central" },
};

export function ServiceChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "covered" | "not-covered">("idle");
  const [matchedArea, setMatchedArea] = useState<PincodeDetail | null>(null);

  const checkCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) return;
    setStatus("checking");
    setTimeout(() => {
      const detail = PINCODE_DATABASE[pincode];
      if (detail) { setMatchedArea(detail); setStatus("covered"); }
      else { setStatus("not-covered"); setMatchedArea(null); }
    }, 1000);
  };

  return (
    <section className="py-24 md:py-32 relative bg-background overflow-hidden" id="coverage">
      <Container>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold uppercase tracking-widest text-emerald-600 "
              >
                <Locate className="w-3 h-3" />
                <span>Service Readiness</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                See if we're on <br />
                <span className="text-emerald-500">your street.</span>
              </h2>
              
              <p className="text-lg text-gray-500 font-medium max-w-md leading-relaxed">
                Nokasa is deploying logistics nodes across the city. Enter your pin to check if we're active in your neighborhood.
              </p>
            </div>

            <form onSubmit={checkCoverage} className="relative max-w-md w-full">
               <div className={cn(
                 "group relative flex items-center p-1 rounded-2xl border transition-all duration-500",
                 status === "covered" ? "border-emerald-500 shadow-xl shadow-emerald-500/10" : "border-gray-200 bg-gray-50/50 "
               )}>
                  <div className="pl-5 pr-3">
                     <Search className={cn("w-5 h-5 transition-colors duration-500", status === "covered" ? "text-emerald-500" : "text-gray-400")} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => {
                       setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                       if (status !== "idle") setStatus("idle");
                    }}
                    className="flex-1 min-w-0 bg-transparent py-4 text-lg font-bold focus:outline-none placeholder:text-gray-300 :text-gray-700"
                  />
                  <button 
                    disabled={status === "checking" || pincode.length < 6}
                    className="px-6 h-12 rounded-xl bg-gray-950 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 mr-1 shadow-lg"
                  >
                    {status === "checking" ? "..." : "Check"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
               </div>

               <AnimatePresence mode="wait">
                  {status === "covered" && matchedArea && (
                    <motion.div 
                      key="covered"
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-8 space-y-8"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-xl capitalize">{matchedArea.area} is covered!</p>
                          <p className="text-sm text-gray-500 font-medium">Ready for your first circular pickup.</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-100 ">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">Start your sustainable journey:</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                           <a
                             href="https://apps.apple.com/in/app/nokasa-sell-your-old-clothes/id6745338136?l=hi"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black text-white shadow-lg shadow-black/10 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group border border-white/10 "
                           >
                             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                               <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-1.99.77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17.07 2.99 12.15 4.67 9.22c.84-1.45 2.31-2.36 3.91-2.38 1.21-.02 2.31.81 3.03.81.71 0 2.03-.99 3.44-.85 1.58.06 2.76.63 3.51 1.72-3.14 1.84-2.63 5.79.52 7.07a7.66 7.66 0 0 1-1.37 3.91zM14.95 5.15c.67-.81 1.11-1.94.99-3.07-1.01.04-2.13.66-2.85 1.5-.66.77-1.22 1.94-1.07 3.03 1.12.08 2.21-.61 2.93-1.46z" />
                             </svg>
                             <div className="flex flex-col items-start leading-tight text-left relative z-10">
                               <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider">Download on the</span>
                               <span className="text-base font-black">App Store</span>
                             </div>
                           </a>
                           
                           <a
                             href="https://play.google.com/store/apps/details?id=co.nokasa.user.nokasa_user"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black text-white shadow-lg shadow-black/10 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group border border-white/10 "
                           >
                             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                               <path d="M3.609 2.029C3.385 2.254 3.25 2.593 3.25 3.011v17.978c0 .418.135.757.359.982l.065.065L13.75 11.961v-.218L3.674 1.964l-.065.065zM17.144 15.352l-3.394-3.394v-.218l3.394-3.394.076.044 3.996 2.27c1.139.646 1.139 1.708 0 2.355l-3.996 2.27-.076.047zM17.144 15.352l-3.394-3.394v-.218l3.394-3.394.076.044 3.996 2.27c1.139.646 1.139 1.708 0 2.355l-3.996 2.27-.076.047zM13.75 11.743L3.674 1.964c.32-.32.846-.356 1.458-.008l12.012 6.824-3.47 3.47v.218zM13.75 12.257v-.218l3.47 3.47-12.012 6.824c-.612.348-1.138.312-1.458-.008l10.076-10.072.065-.214z" />
                             </svg>
                             <div className="flex flex-col items-start leading-tight text-left relative z-10">
                               <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider">GET IT ON</span>
                               <span className="text-base font-black">Google Play</span>
                             </div>
                           </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {status === "not-covered" && (
                    <motion.div 
                      key="not-covered"
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-8 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                         <XCircle className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                         <p className="font-bold text-gray-900 text-xl capitalize">Coming to {pincode} soon!</p>
                         <p className="text-sm text-gray-500 font-medium leading-relaxed">
                           We're expanding our logistics network rapidly. Your area is currently on our priority map for the next phase. 
                         </p>
                         <div className="pt-4">
                            <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-200 ">Follow for updates</span>
                         </div>
                      </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </form>
          </div>

          <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-gray-50/50 border-2 border-gray-100 shadow-2xl flex items-center justify-center">
              <AnimatePresence mode="wait">
                 {status !== "covered" ? (
                   <motion.div 
                     key="network-map"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                     className="absolute inset-0 p-12 lg:p-20"
                   >
                     <div className="w-full h-full relative flex items-center justify-center text-emerald-500">
                        <svg viewBox="0 0 320 320" className="w-full h-full">
                           <defs>
                              <pattern id="dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                 <circle cx="1.5" cy="1.5" r="0.8" fill="currentColor" fillOpacity="0.2" />
                              </pattern>
                              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                 <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                                 <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
                                 <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                              </linearGradient>
                           </defs>

                           <motion.path 
                             d="M160 30 C180 30, 200 60, 210 80 L240 110 C270 130, 290 160, 280 200 L250 230 C220 270, 180 290, 160 280 C130 290, 100 270, 80 250 L50 220 C30 180, 40 130, 60 100 L90 70 C110 40, 140 30, 160 30"
                             fill="url(#dot-pattern)"
                             stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"
                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
                           />
                           
                           <g>
                              {[
                                {start: {x: 160, y: 155}, end: {x: 100, y: 170}},
                                {start: {x: 160, y: 155}, end: {x: 210, y: 130}},
                                {start: {x: 160, y: 155}, end: {x: 140, y: 220}},
                                {start: {x: 160, y: 155}, end: {x: 180, y: 90}}
                              ].map((pair, i) => {
                                 const midX = (pair.start.x + pair.end.x) / 2;
                                 const midY = (pair.start.y + pair.end.y) / 2 - 20;
                                 const path = `M ${pair.start.x} ${pair.start.y} Q ${midX} ${midY} ${pair.end.x} ${pair.end.y}`;
                                 return (
                                    <g key={i}>
                                       <motion.path 
                                          d={path} fill="none" stroke="url(#curve-gradient)" strokeWidth="1"
                                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
                                          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
                                       />
                                       <circle cx={pair.start.x} cy={pair.start.y} r={2} fill="currentColor" />
                                       <g transform={`translate(${pair.end.x}, ${pair.end.y})`}>
                                          <circle r="2" fill="currentColor" />
                                          <motion.circle 
                                             r="2" fill="currentColor" opacity="0.5"
                                             animate={{ r: [2, 6], opacity: [0.5, 0] }}
                                             transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                                          />
                                       </g>
                                    </g>
                                 );
                              })}
                           </g>
                        </svg>
                     </div>
                   </motion.div>
                 ) : (
                   <motion.div 
                     key="detail-view"
                     initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                     className="relative flex items-center justify-center p-8 w-full h-full"
                   >
                      <LocationMap 
                        location={matchedArea?.area + ", Bangalore"} 
                        coordinates="12.9716° N, 77.5946° E"
                      />
                   </motion.div>
                 )}
              </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
