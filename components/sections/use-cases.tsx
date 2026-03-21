"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";

const PERSONAS = [
  {
    title: "Busy Professionals",
    desc: "Declutter without spending hours reselling. One pickup, and your minimalist workspace is restored.",
    image: "/images/p1.png",
  },
  {
    title: "Families",
    desc: "Seamlessly cycle through clothes as kids outgrow them faster than you can manage.",
    image: "/images/p2.png",
  },
  {
    title: "Minimalists",
    desc: "Maintain a clean, highly curated wardrobe. Ensure garments find a life beyond your closet.",
    image: "/images/p3.png",
  },
  {
    title: "Apartment Communities",
    desc: "Enable sustainable recycling for all residents, making responsible disposal the elegant default.",
    image: "/images/p4.png",
  },
];

export function UseCases() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });

  return (
    <section className="py-20 md:py-32 bg-transparent relative overflow-hidden transition-colors duration-500" id="use-cases">
      <Container>
        {/* Bento Grid layout */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Header Block (Spans 2 columns on lg) */}
          <motion.div
            ref={ref}
            className="lg:col-span-2 flex flex-col justify-center bg-transparent rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 lg:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 dark:bg-white/5 border border-brand/10 dark:border-white/10 text-[11px] font-bold text-brand dark:text-brand-light uppercase tracking-widest mb-6 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Who It's For
            </div>
            <h2 
              className="text-[40px] sm:text-[46px] lg:text-[54px] font-black tracking-tight text-gray-950 dark:text-gray-100 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for people who care about their space and the planet
            </h2>
            <p className="mt-4 text-[16px] font-medium text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              Whether you're rotating an entire family's wardrobe or strictly curating a minimalist lifestyle, NoKasa fits flawlessly into your routine.
            </p>
          </motion.div>

          {/* Card 1: Right of Headline (Spans 1 col on lg) */}
          <UseCaseCard persona={PERSONAS[0]} index={0} inView={gridInView} className="lg:col-span-1" />

          {/* Card 2: Below Headline Col 1 */}
          <UseCaseCard persona={PERSONAS[1]} index={1} inView={gridInView} className="lg:col-span-1 md:col-span-1" />

          {/* Card 3: Below Headline Col 2 */}
          <UseCaseCard persona={PERSONAS[2]} index={2} inView={gridInView} className="lg:col-span-1 md:col-span-1" />

          {/* Card 4: Below Card 1 Col 3 */}
          <UseCaseCard persona={PERSONAS[3]} index={3} inView={gridInView} className="lg:col-span-1 md:col-span-2 lg:col-span-1" />

        </div>
      </Container>
    </section>
  );
}

function UseCaseCard({ persona, index, inView, className }: { persona: any, index: number, inView: boolean, className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full h-[280px] md:h-[340px] rounded-[2rem] overflow-hidden group hover-trigger transition-transform duration-500 ${className}`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full bg-gray-900 border border-transparent dark:border-white/5 rounded-[2rem] overflow-hidden">
        <Image 
          src={persona.image} 
          alt={persona.title} 
          fill 
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] opacity-90 dark:opacity-70 group-hover:opacity-100" 
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Soft shadow overlay for text that intensifies slightly on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/0 opacity-80 group-hover:opacity-95 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* Content wrapper pins to bottom */}
      <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end z-10">
        {/* The block that slides up slightly */}
        <div className="transform translate-y-3 group-hover:-translate-y-2 transition-transform duration-500 ease-[0.16,1,0.3,1]">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-0 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            {persona.title}
          </h3>
          {/* Text reveal by expanding max-height smoothly */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[0.16,1,0.3,1] opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-2">
            <p className="overflow-hidden text-[13px] md:text-sm font-medium text-white/80 leading-relaxed max-w-[95%]">
              {persona.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
