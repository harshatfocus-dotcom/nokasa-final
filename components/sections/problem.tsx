"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "7.8M+", label: "Tonnes of textile waste generated in India each year." },
  { value: "1.3M+", label: "Tonnes of post-consumer clothes go directly to landfills." },
  { value: "<10%", label: "Of all textile waste is actually successfully recycled." },
];

export function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="pt-6 pb-20 md:pt-8 md:pb-32 bg-transparent relative overflow-hidden min-h-[95vh] flex items-center transition-colors duration-500" id="problem">




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
              <span className="text-[12px] font-black text-brand uppercase tracking-[0.4em]">The Wardrobe Crisis</span>
            </motion.div>

            <h2
              className="text-[32px] sm:text-[42px] md:text-[58px] lg:text-[74px] font-black leading-[0.95] tracking-tight text-gray-950 mb-8 md:mb-10"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Your closet is full,{"\n"}
              <span className="text-brand">but giving clothes</span>{"\n"}
              a second life <span className="italic font-normal opacity-20 ">isn&apos;t easy.</span>
            </h2>
            
            {/* Common alternatives and why they fail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[500px]">
              {[
                { title: "Give it to the maid/security", sub: "What if they don't fit or aren't needed?" },
                { title: "Give it to an NGO", sub: "But how do you know which one, and when to go?" },
                { title: "Participate in a donation drive", sub: "They happen so rarely." },
                { title: "Courier it to charities", sub: "That's more effort and cost than it should be." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="p-5 bg-card rounded-2xl border border-gray-100 shadow-sm"
                >
                  <p className="text-[15px] font-black text-gray-900 leading-snug mb-1.5">{item.title}</p>
                  <p className="text-[13px] text-gray-400 font-medium italic leading-snug">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Immersive Overlapping Composition */}
          <div className="relative w-full h-full min-h-[400px] sm:min-h-[520px] lg:min-h-[700px] flex items-center">
            {/* The "Anchor" Image - Bleeding Off Screen Right */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:absolute lg:-right-[15%] lg:w-[110%] aspect-square lg:h-[680px] rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.12)] border-[16px] border-white group"
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
                  "absolute z-30 p-4 md:p-7 rounded-[1.5rem] md:rounded-[2rem] bg-white/70 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-white/50 min-w-[140px] sm:min-w-[180px] max-w-[200px] sm:max-w-[240px]",
                  i === 0 && "top-[5%] left-[2%] sm:left-[5%] md:-left-[10%]",
                  i === 1 && "top-[30%] right-[2%] sm:right-[5%] md:-right-[5%]",
                  i === 2 && "bottom-[8%] left-[15%] sm:left-[20%] md:left-[5%]"
                )}
              >
                <p className="text-3xl md:text-4xl font-black text-gray-950 mb-2 tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
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
