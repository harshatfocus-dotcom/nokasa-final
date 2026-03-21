"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Particles } from "@/components/ui/particles";

const STEPS = [
  {
    n: "01",
    title: "Schedule a pickup",
    desc: "Open the app and choose a date and time slot. We make it simple — no need to count each item.",
    image: "/images/step-1.png",
  },
  {
    n: "02",
    title: "Pack your clothes",
    desc: "Neatly fold and place your unused clothes in a clean cardboard box. Ready for a new life.",
    image: "/images/step-2.png",
  },
  {
    n: "03",
    title: "Earn rewards instantly",
    desc: "Our delivery agent collects the box and you receive your rewards on the spot. No paperwork.",
    image: "/images/step-3.png",
  },
];

const LeafParticles = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => {
        const size = 16 + Math.random() * 24;
        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 10;
        const startX = Math.random() * 100;
        
        // Natural leaf shapes/icons
        const leaves = ["🌿", "🍃", "🍁", "🌱", "🍀"];
        const leaf = leaves[i % leaves.length];
        
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: "110%", 
              x: `${startX}%`,
              rotate: Math.random() * 360,
              scale: 0.5 + Math.random() * 0.5
            }}
            animate={{ 
              opacity: [0, 0.4, 0.4, 0],
              y: "-20%",
              rotate: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360),
              x: [`${startX}%`, `${startX + (Math.sin(i) * 15)}%`, `${startX - (Math.cos(i) * 10)}%`]
            }}
            transition={{ 
              duration: duration, 
              repeat: Infinity, 
              delay: delay,
              ease: "linear"
            }}
            className="absolute select-none filter blur-[0.5px]"
            style={{ fontSize: size }}
          >
            {leaf}
          </motion.div>
        );
      })}
    </div>
  );
};

export function Solution() {
  const ref = useRef(null);
  const stepsRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="how-it-works" className="pt-8 md:pt-12 pb-12 md:pb-16 bg-transparent relative overflow-hidden transition-colors duration-500">
      <LeafParticles />

      <Container>
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card dark:bg-white/5 border border-brand/10 dark:border-brand/20 text-[11px] font-bold text-brand dark:text-brand-light uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            How It Works
          </div>
          <h2
            className="text-[40px] md:text-[56px] font-black text-gray-950 dark:text-gray-100 mb-6 leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A simple way to give your clothes a second life.
          </h2>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium leading-[1.6]">
            NoKasa connects households with responsible recycling and resale networks without any hassle from your end.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div ref={stepsRef} className="relative w-full max-w-[1280px] mx-auto">
          {/* Connecting Roadway Line */}
          <div className="hidden lg:block absolute top-[160px] left-[15%] right-[15%] z-0">
             <svg width="100%" height="40" viewBox="0 0 1000 40" preserveAspectRatio="none" fill="none">
               <path d="M0,20 C250,45 750,-5 1000,20" className="stroke-brand dark:stroke-brand-light opacity-30" strokeWidth="3" strokeDasharray="8 8" />
             </svg>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                className="relative flex flex-col bg-card rounded-[2.5rem] p-3 md:p-4 pb-8 md:pb-10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] border border-gray-200/80 dark:border-white/15 group z-10 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                {/* Image Cutout Box */}
                <div className="w-full h-[240px] md:h-[300px] rounded-[1.5rem] overflow-hidden bg-muted relative mb-6 md:mb-8">
                   <Image src={step.image} alt={step.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                   {/* Step Badge */}
                   <div className="absolute top-4 left-4 bg-background/95 dark:bg-card/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-widest text-brand dark:text-brand-light shadow border border-white/20 dark:border-white/10">
                     STEP {step.n}
                   </div>
                </div>

                {/* Text content */}
                <div className="px-3 md:px-5 text-left">
                  <h3 className="text-[22px] md:text-2xl font-black text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {step.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-gray-500 dark:text-gray-400 leading-[1.6] font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
