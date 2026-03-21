"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Particles } from "@/components/ui/particles";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "7.8M+", label: "Tonnes of textile waste generated in India each year." },
  { value: "1.3M+", label: "Tonnes of post-consumer clothes go directly to landfills." },
  { value: "<10%", label: "Of all textile waste is actually successfully recycled." },
  { value: "0", label: "Effort required from you with our doorstep pickup." },
];

export function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-32 bg-transparent relative overflow-hidden min-h-[95vh] flex items-center transition-colors duration-500" id="problem">




      <Container className="relative z-10 w-full max-w-[1300px]">
        <div ref={ref} className="relative grid lg:grid-cols-[45%_55%] items-start gap-12 lg:gap-0">
          
          {/* Left Column: Bold Narrative */}
          <div className="pt-8 lg:pt-16 max-w-[580px] z-20">
             <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-[2px] w-8 bg-brand/60" />
              <span className="text-[12px] font-black text-brand dark:text-brand-light uppercase tracking-[0.4em]">The Wardrobe Crisis</span>
            </motion.div>

            <h2
              className="text-[48px] md:text-[74px] font-black leading-[0.95] tracking-tight text-gray-950 dark:text-gray-100 mb-10"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Your closet is full,{"\n"}
              <span className="text-brand">but giving clothes</span>{"\n"}
              a second life <span className="italic font-normal opacity-20 dark:opacity-40">isn&apos;t easy.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-[1.5] mb-12 max-w-[500px]">
              Millions of wearable clothes sit unused because responsible disposal is 
              <span className="text-gray-950 dark:text-white font-black relative inline-block">
                 complicated
              </span> and rarely accessible.
            </p>

            {/* Narrative Article Bridge */}
            <motion.a
              href="https://www.bbc.com/future/article/20200710-why-clothes-are-so-hard-to-recycle"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 md:p-8 bg-card rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex gap-6 items-center group cursor-pointer hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 max-w-[460px]"
            >
                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden relative shrink-0">
                   <Image src="/images/wardrobe-crisis-deep-dive.png" alt="Insight" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex flex-col">
                   <div className="flex items-center gap-2 mb-1.5">
                     <span className="text-[9px] font-black text-white px-2.5 py-1 bg-brand rounded-full uppercase tracking-widest">Deep Dive</span>
                     <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-tight">8 minute read</span>
                   </div>
                   <h4 className="text-base md:text-lg font-black text-gray-950 dark:text-gray-100 leading-tight group-hover:text-brand transition-colors">The Global Wardrobe Crisis: Why Recycling is Hard</h4>
                </div>
            </motion.a>
          </div>

          {/* Right Column: Immersive Overlapping Composition */}
          <div className="relative w-full h-full lg:min-h-[700px] flex items-center">
            {/* The "Anchor" Image - Bleeding Off Screen Right */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:absolute lg:-right-[15%] lg:w-[110%] aspect-square lg:h-[680px] rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.12)] border-[16px] border-white dark:border-white/5 group"
            >
              <Image 
                src="/images/closet-full-2.png" 
                alt="Cluttered lifestyle" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-[6s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            </motion.div>

            {/* Floating Glassmorphic Stat Shards */}
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.15, type: "spring" }}
                className={cn(
                  "absolute z-30 p-5 md:p-7 rounded-[2rem] bg-white/70 dark:bg-card/70 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-white/50 dark:border-white/10 min-w-[180px] max-w-[240px]",
                  i === 0 && "top-[5%] left-[5%] md:-left-[10%]",
                  i === 1 && "top-[25%] right-[5%] md:-right-[5%]",
                  i === 2 && "bottom-[15%] left-[20%] md:left-[5%]",
                  i === 3 && "bottom-[5%] right-[10%] md:right-[0%]"
                )}
              >
                <p className="text-3xl md:text-4xl font-black text-gray-950 dark:text-gray-100 mb-2 tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            ))}

            {/* Decorative Centered Icon */}
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-brand/10 z-0 pointer-events-none"
              />
          </div>
        </div>
      </Container>
    </section>
  );
}
