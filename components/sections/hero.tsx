"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Recycle, Package, Shirt, Truck, Leaf, ShoppingBag, Sparkles, Apple, Play } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const WORDS = ["make impact", "make space", "earn rewards"];

const LOCALITIES = [
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "Jayanagar",
  "HSR Layout",
  "Malleshwaram",
  "Bellandur",
  "Marathahalli",
  "Rajajinagar",
  "Basavanagudi",
  "JP Nagar",
  "Electronic City",
  "Bannerghatta Road",
  "Sarjapur Road",
  "Yelahanka",
  "BTM Layout",
  "Hebbal",
  "Kalyan Nagar",
];

const DOT = (
  <span className="w-1.5 h-1.5 rounded-full bg-brand/30 dark:bg-brand-light/80 inline-block mx-6 flex-shrink-0" />
);

function CityItem({ city }: { city: string }) {
  return (
    <span className="inline-flex items-center text-sm font-semibold text-gray-500 tracking-wide whitespace-nowrap flex-shrink-0">
      {DOT}
      {city}
    </span>
  );
}

const FloatingIcon = ({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div
    className={`absolute pointer-events-none select-none opacity-[0.22] dark:opacity-[0.45] text-brand dark:text-brand-light transition opacity transition-colors duration-500 ${className}`}
    style={style}
  >
    {children}
  </div>
);

/* ── Left cutout image frame ───── */
function LeftFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, rotate: -4 }}
      animate={{ opacity: 1, x: 0, rotate: -4 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="hidden lg:block relative"
      style={{ transformOrigin: "center center" }}
    >
      <div className="w-[180px] xl:w-[220px] h-[260px] xl:h-[300px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(44,76,59,0.25)] border-[5px] border-background relative z-10 bg-brand-muted/20 hover:scale-[1.03] transition-transform duration-500 ease-out">
        <Image
          src="/images/hero-img-1.png"
          alt="Folded Sweaters"
          fill
          className="object-cover"
        />
      </div>
      {/* Floating accent icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-white dark:bg-card shadow-xl shadow-brand/10 border border-brand/10 dark:border-white/10 flex flex-col items-center justify-center z-20 group"
      >
        <Recycle className="w-6 h-6 text-brand dark:text-brand-light" strokeWidth={1.8} />
        <span className="text-[9px] font-bold text-brand dark:text-brand-light mt-0.5">Recycle</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Right circular frame ─────── */
function RightFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="hidden lg:block relative"
    >
      <div className="w-[160px] xl:w-[200px] h-[160px] xl:h-[200px] rounded-full overflow-hidden shadow-[0_20px_50px_-12px_rgba(44,76,59,0.3)] border-[5px] border-background relative z-10 bg-brand-muted/20 hover:scale-[1.03] transition-transform duration-500 ease-out">
        <Image
          src="/images/community-hero.png"
          alt="Community Member"
          fill
          className="object-cover"
        />
      </div>
      {/* Floating accent icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-4 -right-4 w-[72px] h-[72px] rounded-2xl bg-brand dark:bg-brand shadow-lg flex flex-col items-center justify-center z-20"
      >
        <Truck className="w-6 h-6 text-white" strokeWidth={1.8} />
        <span className="text-[9px] font-bold text-white mt-1">Pickup</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 4500);
    return () => clearInterval(id);
  }, []);



  return (
    <section className="relative overflow-hidden bg-background md:min-h-[90vh] flex flex-col justify-center pt-20 lg:pt-28 pb-4 md:pb-12 lg:pb-16 transition-colors duration-500">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.8] dark:opacity-[0.65] mask-image-gradient-b z-0 pointer-events-none transition-opacity duration-500" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }} />

      {/* Floating background icons */}
      <FloatingIcon className="animate-float-b" style={{ top: "8%", left: "4%" }}><Recycle className="w-16 h-16 md:w-20 md:h-20" strokeWidth={0.8} /></FloatingIcon>
      <FloatingIcon className="animate-float-a" style={{ top: "12%", right: "6%" }}><Package className="w-14 h-14 md:w-16 md:h-16" strokeWidth={0.8} /></FloatingIcon>
      <FloatingIcon className="animate-float-c" style={{ bottom: "12%", left: "8%" }}><Shirt className="w-20 h-20 md:w-24 md:h-24" strokeWidth={0.8} /></FloatingIcon>
      <FloatingIcon className="animate-float-a" style={{ top: "45%", right: "3%" }}><Truck className="w-12 h-12 md:w-14 md:h-14" strokeWidth={0.8} /></FloatingIcon>
      <FloatingIcon className="animate-float-b" style={{ bottom: "8%", right: "12%" }}><Leaf className="w-10 h-10 md:w-12 md:h-12" strokeWidth={0.8} /></FloatingIcon>
      <FloatingIcon className="animate-float-c" style={{ top: "4%", left: "35%" }}><ShoppingBag className="w-12 h-12 md:w-14 md:h-14" strokeWidth={0.8} /></FloatingIcon>

      <Container className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10 w-full py-8"
          >
            {/* Left image */}
            <LeftFrame />

            {/* Centre content */}
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-brand/20 text-xs font-semibold text-brand dark:text-brand-light tracking-wide mb-6 shadow-sm hover:shadow-md transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Give Your Clothes a Second Life
              </div>


              {/* Headline */}
              <h1
                className="text-display-xl font-extrabold text-gray-950 dark:text-gray-100 mb-6 leading-[1.05]"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                {["Declutter", "your", "wardrobe", "to"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                
                <span className="inline-block relative whitespace-nowrap mt-2 md:mt-0">
                  <AnimatePresence mode="wait">
                    <Magnetic key={wordIdx}>
                      <motion.span
                        initial={{ opacity: 0, y: 20, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -20, rotateX: 90 }}
                        transition={{ type: "spring", damping: 15, stiffness: 150 }}
                        className="word-highlight-pill shadow-xl shadow-brand/20 bg-brand font-bold px-4 py-1.5 flex items-center gap-2 group cursor-pointer"
                      >
                        {WORDS[wordIdx]}
                        <motion.span
                           animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
                           transition={{ duration: 2, repeat: Infinity }}
                        >
                           <Sparkles className="w-4 h-4 text-white/50" />
                        </motion.span>
                      </motion.span>
                    </Magnetic>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Sub */}
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-[480px] mx-auto leading-relaxed mb-8">
                NoKasa takes your closet cleanout and turns it into a second life for every garment, with one doorstep pickup.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Magnetic>
                  <a
                    href="https://apps.apple.com/in/app/nokasa-sell-your-old-clothes/id6745338136?l=hi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group border border-white/10 dark:border-black/10"
                  >
                    <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-1.99.77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17.07 2.99 12.15 4.67 9.22c.84-1.45 2.31-2.36 3.91-2.38 1.21-.02 2.31.81 3.03.81.71 0 2.03-.99 3.44-.85 1.58.06 2.76.63 3.51 1.72-3.14 1.84-2.63 5.79.52 7.07a7.66 7.66 0 0 1-1.37 3.91zM14.95 5.15c.67-.81 1.11-1.94.99-3.07-1.01.04-2.13.66-2.85 1.5-.66.77-1.22 1.94-1.07 3.03 1.12.08 2.21-.61 2.93-1.46z" />
                    </svg>
                    <div className="flex flex-col items-start leading-tight text-left relative z-10">
                      <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider">Download on the</span>
                      <span className="text-base font-black">App Store</span>
                    </div>
                  </a>
                </Magnetic>
                
                <Magnetic>
                  <a
                    href="https://play.google.com/store/apps/details?id=co.nokasa.user.nokasa_user"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group border border-white/10 dark:border-black/10"
                  >
                    <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                      <path d="M3.609 2.029C3.385 2.254 3.25 2.593 3.25 3.011v17.978c0 .418.135.757.359.982l.065.065L13.75 11.961v-.218L3.674 1.964l-.065.065zM17.144 15.352l-3.394-3.394v-.218l3.394-3.394.076.044 3.996 2.27c1.139.646 1.139 1.708 0 2.355l-3.996 2.27-.076.047zM17.144 15.352l-3.394-3.394v-.218l3.394-3.394.076.044 3.996 2.27c1.139.646 1.139 1.708 0 2.355l-3.996 2.27-.076.047zM13.75 11.743L3.674 1.964c.32-.32.846-.356 1.458-.008l12.012 6.824-3.47 3.47v.218zM13.75 12.257v-.218l3.47 3.47-12.012 6.824c-.612.348-1.138.312-1.458-.008l10.076-10.072.065-.214z" />
                    </svg>
                    <div className="flex flex-col items-start leading-tight text-left relative z-10">
                      <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider">GET IT ON</span>
                      <span className="text-base font-black">Google Play</span>
                    </div>
                  </a>
                </Magnetic>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest mt-2">Schedule a pickup in under 30 seconds</p>
            </motion.div>

            {/* Right image */}
            <RightFrame />
          </motion.div>
        </div>
      </Container>

      {/* Integrated Trust Bar / Marquee */}
      <div className="relative mt-4 lg:mt-8 w-full border-t border-gray-100 dark:border-white/5 bg-bg-muted/50 dark:bg-black/20 py-4 transition-colors">
        <Container className="absolute left-0 right-0 -top-3 flex justify-center w-full z-20">
          <span className="bg-background px-4 text-[10px] font-bold text-gray-400 dark:text-gray-200 uppercase tracking-widest border border-gray-100 dark:border-white/5 rounded-full shadow-sm transition-colors">
            Serving Across Bangalore
          </span>
        </Container>
        
        {/* Marquee */}
        <div className="relative overflow-hidden flex items-center pt-2">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Two identical strips side-by-side for seamless loop */}
          <div className="flex shrink-0 animate-marquee" aria-hidden="false">
            {LOCALITIES.map((city, i) => (
              <CityItem key={`a-${city}-${i}`} city={city} />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee" aria-hidden="true">
            {LOCALITIES.map((city, i) => (
              <CityItem key={`b-${city}-${i}`} city={city} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
