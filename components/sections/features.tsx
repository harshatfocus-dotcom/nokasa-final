"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";

const FEATURES = [
  {
    id: "sell",
    label: "Earn Value",
    title: "Sell old clothes.",
    desc: "Instantly convert your unused wardrobe into rewards. Our intelligent pricing engine guarantees fair value for your premium garments.",
    icon: "/images/i1.png",
    iconDark: "/images/i1_dark.png",
    cardSubtitle: "Intelligent pricing guarantees fair value instantly.",
  },
  {
    id: "marketplace",
    label: "Circular Fashion",
    title: "An upcycled marketplace.",
    desc: "Join a community dedicated to sustainable fashion. Discover unique, refreshed, and upcycled items breathing new life into classic styles.",
    icon: "/images/i2.png",
    iconDark: "/images/i2_dark.png",
    cardSubtitle: "Discover unique refreshed garments in our network.",
  },
  {
    id: "buy",
    label: "Conscious Buying",
    title: "Buy pre-loved clothes.",
    desc: "Access a curated collection of high-quality verified pre-owned apparel. Look stunning while significantly shrinking your environmental footprint.",
    icon: "/images/i3.png",
    iconDark: "/images/i3_dark.png",
    cardSubtitle: "Access curated verified pre-owned apparel easily.",
  },
  {
    id: "impact",
    label: "Live Stats",
    title: "Eco-Impact Tracking.",
    desc: "Watch your contribution grow in real-time. Every item sold or purchased updates your personal dashboard with exact water and CO2 saved.",
    icon: "/images/i4.png",
    iconDark: "/images/i4_dark.png",
    cardSubtitle: "Monitor the exact water and CO2 emissions you've saved.",
  },
  {
    id: "pickup",
    label: "Zero Hassle",
    title: "Instant Doorstep Pickup.",
    desc: "No more trips to the post office. Box up your items, schedule a pickup date, and our trusted logistics partners handle the rest directly from your door.",
    icon: "/images/i5.png",
    iconDark: "/images/i5_dark.png",
    cardSubtitle: "Trusted carriers collect directly from your location.",
  },
];

export function Features() {
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rightColumnRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="bg-transparent relative w-full pb-20 lg:pb-0 transition-colors duration-500" id="features">
      <Container className="relative w-full">
        {/* Top Header */}
        <motion.div
          className="text-center pt-16 md:pt-24 pb-12 lg:pb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 dark:bg-brand/10 border border-brand/10 dark:border-brand/20 text-[11px] font-bold text-brand dark:text-brand-light uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            What NoKasa Offers
          </div>
          <h2
            className="text-[40px] md:text-[54px] lg:text-[60px] font-black leading-[1.05] tracking-tight text-gray-950 dark:text-gray-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            An entirely circular ecosystem.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start w-full relative">
          
          {/* Left Sticky Content: Text section that pins to the screen */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-[100px] h-auto flex flex-col justify-start pb-12 lg:py-0 pr-0 lg:pr-10 z-20">

            {/* Feature Text List */}
            <div className="flex flex-col relative w-full pt-4 lg:pt-0">
              {FEATURES.map((feat, i) => {
                const itemProgress = i / (FEATURES.length - 1);
                const MathStart = itemProgress - 0.25;
                const MathPeak = itemProgress;
                const MathEnd = itemProgress + 0.25;

                return (
                  <FeatureTextItem 
                    key={feat.id} 
                    feat={feat} 
                    scrollYProgress={scrollYProgress} 
                    start={MathStart} 
                    peak={MathPeak} 
                    end={MathEnd}
                    index={i + 1}
                  />
                )
              })}
            </div>
          </div>

          {/* Right Scrolling Content: Clean Skeuomorphic Cards */}
          <div className="w-full lg:w-[55%] py-10 lg:py-[15vh] relative z-10 lg:pl-[5%]">
            <div ref={rightColumnRef} className="flex flex-col gap-10 lg:gap-32 w-full">
              {FEATURES.map((feat, i) => (
                <FeatureImageCard key={feat.id} feat={feat} index={i + 1} />
              ))}
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}

function FeatureTextItem({ feat, scrollYProgress, start, peak, end, index }: any) {
  // Desktop scroll-driven animation
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [start, peak, end], [0.98, 1, 0.98]);

  return (
    <div className="relative hover-trigger border-b border-gray-100 dark:border-white/5 py-3 lg:py-3.5 last:border-b-0 group">
      {/* Desktop view */}
      <motion.div className="hidden lg:flex flex-col relative origin-left" style={{ opacity, scale }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-bold tracking-widest text-brand dark:text-brand-light uppercase bg-brand/5 dark:bg-brand/10 px-2 py-0.5 rounded-md">
            0{index}
          </span>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {feat.label}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100 mb-1.5 tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
          {feat.title}
        </h3>
        <p className="text-[13px] md:text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-[1.5]">
          {feat.desc}
        </p>
      </motion.div>

      {/* Mobile view */}
      <motion.div 
        className="flex lg:hidden flex-col"
        initial={{ opacity: 0.2, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {feat.title}
        </h3>
        <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium leading-[1.6]">
          {feat.desc}
        </p>
      </motion.div>
    </div>
  );
}

function FeatureImageCard({ feat, index }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const imageSrc = isDark ? feat.iconDark : feat.icon;
  
  // Subtle elegant parallax inside card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const iconY = useTransform(scrollYProgress, [0, 1], ["-8px", "8px"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 80 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-shrink-0 h-[480px] lg:h-[600px] sticky lg:relative top-[10vh] lg:top-0 rounded-[2.5rem] bg-card border-2 border-gray-200/80 dark:border-white/5 shadow-md hover:shadow-xl transition-all duration-700 p-8 md:p-12 flex flex-col justify-between group z-20 overflow-hidden hover-trigger"
    >
      {/* Grid Pattern and Gradient Background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none dark:opacity-10 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500" />

      {/* Header of Card */}
      <div className="relative text-center z-10">
        <div className="text-[15px] md:text-[17px] font-medium text-gray-800 dark:text-gray-200 leading-snug max-w-[280px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-bold text-gray-950 dark:text-white">NoKasa Offers </span> <br className="hidden md:block"/>
          {feat.title}
        </div>
      </div>

      {/* Center 3D Skeuomorphic Icon */}
      <motion.div 
        style={{ y: iconY }}
        className="relative w-full h-[220px] md:h-[300px] my-auto flex items-center justify-center z-10"
      >
        <div className="relative w-full h-full max-w-[280px] md:max-w-[340px]">
          <Image 
            src={imageSrc} 
            alt={feat.title} 
            fill 
            className={`object-contain object-center group-hover:scale-[1.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isDark ? 'mix-blend-multiply' : 'brightness-110 saturate-[1.1] contrast-[1.05]'}`} 
            sizes="(max-width: 1024px) 80vw, 40vw"
            priority={index === 1}
          />
        </div>
      </motion.div>

      {/* Footer of Card */}
      <div className="relative flex items-end justify-between z-10 w-full mt-auto pt-6 border-t border-gray-100/60 dark:border-white/5">
        <div className="text-[13px] md:text-[15px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-gray-950 dark:group-hover:text-white transition-colors duration-300 max-w-[260px] leading-snug">
          {feat.cardSubtitle}
        </div>
        
        <div className="relative flex flex-col items-end shrink-0 pl-4 gap-1">
           <span className="text-[14px] md:text-[16px] font-bold text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors duration-300 font-mono tracking-tighter">
             0{index}
           </span>
           <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-300 dark:text-gray-600 uppercase leading-none">
             NoKasa
           </span>
        </div>
      </div>
    </motion.div>
  );
}
