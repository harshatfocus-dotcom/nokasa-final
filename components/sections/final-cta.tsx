"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { Apple, Play } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

export function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden transition-colors duration-500" id="download">

      {/* Floating ambient elements */}
      <div className="absolute top-[10%] left-[20%] text-brand transform -rotate-12 select-none animate-float-a z-10 w-4 h-4 opacity-80 backdrop-blur-md transition-opacity">🌿</div>
      <div className="absolute bottom-[20%] right-[15%] text-brand transform rotate-45 select-none animate-float-b z-10 w-4 h-4 opacity-80 backdrop-blur-md transition-opacity">🍃</div>

      <Container className="relative z-10 max-w-6xl mx-auto">
        
        {/* The Dark Premium Banner */}
        <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8 }}
           className="relative w-full max-w-5xl mx-auto min-h-[380px] md:h-[460px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 rounded-[2.5rem] md:rounded-[3rem] bg-gray-950 px-8 sm:px-12 md:px-16 py-16 md:py-0 transition-all duration-500 shadow-2xl border border-white/5 "
        >


          {/* Left Side: Image */}
          <div className="relative w-full md:w-auto flex items-center justify-center pointer-events-none shrink-0">
             <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                <Image
                  src="/images/blog-declutter.png"
                  alt="NoKasa Happy Community Members"
                  fill
                  className="object-cover rotate-[-3deg] transition-transform duration-700 rounded-[2rem] border border-white/10"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
             </div>
          </div>

          {/* Right Side: Typography & Button */}
          <div className="relative z-20 w-full md:w-auto flex flex-col items-center text-center mt-4 md:mt-0">
             <p className="text-gray-400 font-bold text-[12px] md:text-[13px] uppercase tracking-widest mb-4">
                Declutter Responsibly
             </p>
             <h2 
                className="text-[28px] sm:text-[36px] md:text-[54px] text-white font-black leading-[1.05] tracking-tight mb-5" 
                style={{ fontFamily: "var(--font-display)" }}
             >
                Join the ecosystem.
             </h2>
             <p className="text-gray-400 text-[15px] md:text-[17px] leading-[1.6] max-w-[400px] mb-10 font-medium transition-colors">
                We invite you to embark on a sustainable journey that seamlessly transforms your unused wardrobe into a thriving circular economy.
             </p>

             {/* Store Buttons */}
             <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 w-full sm:w-auto justify-center">
                 <Magnetic>
                   <a 
                     href="https://apps.apple.com/in/app/nokasa-sell-your-old-clothes/id6745338136?l=hi" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white text-black shadow-lg shadow-black/5 hover:shadow-black/10 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                   >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-1.99.77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17.07 2.99 12.15 4.67 9.22c.84-1.45 2.31-2.36 3.91-2.38 1.21-.02 2.31.81 3.03.81.71 0 2.03-.99 3.44-.85 1.58.06 2.76.63 3.51 1.72-3.14 1.84-2.63 5.79.52 7.07a7.66 7.66 0 0 1-1.37 3.91zM14.95 5.15c.67-.81 1.11-1.94.99-3.07-1.01.04-2.13.66-2.85 1.5-.66.77-1.22 1.94-1.07 3.03 1.12.08 2.21-.61 2.93-1.46z" />
                     </svg>
                     <div className="flex flex-col items-start leading-none text-left">
                       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Download on the</span>
                       <span className="text-[17px] font-black mt-[2px]">App Store</span>
                     </div>
                   </a>
                 </Magnetic>
                 <Magnetic>
                   <a 
                     href="https://play.google.com/store/apps/details?id=co.nokasa.user.nokasa_user" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white text-black shadow-lg shadow-black/5 hover:shadow-black/10 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                   >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M3.609 2.029C3.385 2.254 3.25 2.593 3.25 3.011v17.978c0 .418.135.757.359.982l.065.065L13.75 11.961v-.218L3.674 1.964l-.065.065zM17.144 15.352l-3.394-3.394v-.218l3.394-3.394.076.044 3.996 2.27c1.139.646 1.139 1.708 0 2.355l-3.996 2.27-.076.047zM13.75 11.743L3.674 1.964c.32-.32.846-.356 1.458-.008l12.012 6.824-3.47 3.47v.218zM13.75 12.257v-.218l3.47 3.47-12.012 6.824c-.612.348-1.138.312-1.458-.008l10.076-10.072.065-.214z" />
                     </svg>
                     <div className="flex flex-col items-start leading-none text-left">
                       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">GET IT ON</span>
                       <span className="text-[17px] font-black mt-[2px]">Google Play</span>
                     </div>
                   </a>
                 </Magnetic>
             </div>
          </div>

        </motion.div>

      </Container>
    </section>
  );
}
