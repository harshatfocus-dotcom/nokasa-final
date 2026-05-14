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
    desc: "Instantly convert your unused wardrobe into rewards. Clear out your closet seamlessly and get fair value for your garments.",
    icon: "/images/i1.png",
    iconDark: "/images/i1_dark.png",
    cardSubtitle: "Get fair value for your garments instantly.",
  },
  {
    id: "marketplace",
    label: "Circular Fashion",
    title: "An upcycled marketplace.",
    desc: "Join a community dedicated to sustainable fashion. Discover unique, refreshed, and upcycled items breathing new life into classic styles.",
    icon: "/images/marketplace-app.jpeg",
    iconDark: "/images/marketplace-app.jpeg",
    cardSubtitle: "Discover unique refreshed garments in our network.",
    isPhoto: true,
  },
  {
    id: "buy",
    label: "Conscious Buying",
    title: "Buy pre-loved clothes.",
    desc: "Access a curated collection of high-quality verified pre-owned apparel. Look stunning while significantly shrinking your environmental footprint.",
    icon: "/images/feature_preloved_box.png",
    iconDark: "/images/feature_preloved_box.png",
    cardSubtitle: "Access curated verified pre-owned apparel easily.",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-[11px] font-bold text-brand uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            What NoKasa Offers
          </div>
          <h2
            className="text-[30px] sm:text-[40px] md:text-[54px] lg:text-[60px] font-black leading-[1.05] tracking-tight text-gray-950 "
            style={{ fontFamily: "var(--font-display)" }}
          >
            An entirely circular ecosystem.
          </h2>
        </motion.div>

        {/* Mobile: interleaved text + card per feature */}
        <div className="lg:hidden flex flex-col pt-4 pb-12">
          {FEATURES.map((feat, i) => (
            <div key={feat.id} className="flex flex-col gap-6 border-b border-gray-100 last:border-b-0 py-8 first:pt-0">
              <FeatureTextItem
                feat={feat}
                scrollYProgress={scrollYProgress}
                start={0}
                peak={0.5}
                end={1}
                index={i + 1}
              />
              <FeatureImageCard feat={feat} index={i + 1} />
            </div>
          ))}
        </div>

        {/* Desktop: sticky text + scrolling cards */}
        <div className="hidden lg:flex items-start w-full relative">

          {/* Left Sticky Content */}
          <div className="w-[45%] sticky top-[100px] h-[calc(100vh-100px)] flex flex-col justify-center py-0 pr-10 z-20">
            <div className="flex flex-col relative w-full">
              {FEATURES.map((feat, i) => {
                const itemProgress = i / (FEATURES.length - 1);
                return (
                  <FeatureTextItem
                    key={feat.id}
                    feat={feat}
                    scrollYProgress={scrollYProgress}
                    start={itemProgress - 0.25}
                    peak={itemProgress}
                    end={itemProgress + 0.25}
                    index={i + 1}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Scrolling Content */}
          <div className="w-[55%] py-[15vh] relative z-10 pl-[5%]">
            <div ref={rightColumnRef} className="flex flex-col gap-32 w-full">
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
  const opacity = useTransform(scrollYProgress, [start, peak, end], [0.15, 1, 0.15]);
  const scale = useTransform(scrollYProgress, [start, peak, end], [0.97, 1, 0.97]);

  return (
    <div className="relative hover-trigger border-b border-gray-100 py-3 lg:py-3.5 last:border-b-0 group">
      {/* Desktop view */}
      <motion.div className="hidden lg:flex flex-col items-center text-center relative origin-center" style={{ opacity, scale }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[9px] font-bold tracking-widest text-brand uppercase bg-brand/5 px-2 py-0.5 rounded-md">
            0{index}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {feat.label}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-gray-950 dark:text-gray-100 mb-2 tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
          {feat.title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-gray-600 dark:text-gray-400 font-medium leading-[1.6]">
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
        <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {feat.title}
        </h3>
        <p className="text-[15px] text-gray-500 font-medium leading-[1.6]">
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
      className="w-full flex-shrink-0 h-[420px] sm:h-[480px] lg:h-[600px] relative rounded-[2rem] sm:rounded-[2.5rem] bg-card border-2 border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-700 p-8 md:p-12 flex flex-col justify-between group z-20 overflow-hidden hover-trigger"
    >
      {/* Grid Pattern and Gradient Background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none mix-blend-multiply transition-opacity duration-500" />

      {/* Header of Card */}
      <div className="relative text-center z-10">
        <div className="text-[15px] md:text-[17px] font-medium text-gray-800 leading-snug max-w-[280px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-bold text-gray-950 ">NoKasa Offers </span> <br className="hidden md:block"/>
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
            className={`object-contain object-center group-hover:scale-[1.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${feat.isPhoto ? 'drop-shadow-2xl' : (!isDark ? 'mix-blend-multiply' : 'brightness-110 saturate-[1.1] contrast-[1.05]')}`}
            sizes="(max-width: 1024px) 80vw, 40vw"
            priority={index === 1}
          />
        </div>
      </motion.div>

      {/* Footer of Card */}
      <div className="relative flex items-end justify-between z-10 w-full mt-auto pt-6 border-t border-gray-100/60 ">
        <div className="text-[13px] md:text-[15px] font-medium text-gray-900 group-hover:text-gray-950 :text-white transition-colors duration-300 max-w-[260px] leading-snug">
          {feat.cardSubtitle}
        </div>
        
        <div className="relative flex flex-col items-end shrink-0 pl-4 gap-1">
           <span className="text-[14px] md:text-[16px] font-bold text-gray-300 group-hover:text-gray-400 :text-gray-500 transition-colors duration-300 font-mono tracking-tighter">
             0{index}
           </span>
           <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-300 uppercase leading-none">
             NoKasa
           </span>
        </div>
      </div>
    </motion.div>
  );
}
