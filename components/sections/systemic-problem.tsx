"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { AlertCircle, Users, Activity, Shovel } from "lucide-react";

const SYSTEMIC_ISSUES = [
  {
    icon: Users,
    title: "Marginalized Community Risk",
    description: "The unorganized waste sector lacks safety, dignity, and fair pay, bearing the weight of our disposal habits.",
  },
  {
    icon: Activity,
    title: "Environmental Health Drain",
    description: "Leachate from textile-heavy landfills contaminates local groundwater, risking the health of thousands.",
  },
  {
    icon: Shovel,
    title: "Systemic Resource Loss",
    description: "Valuable raw materials are buried forever, driving the need for more energy-intensive production elsewhere.",
  },
];

export function SystemicProblem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 md:py-32 bg-transparent relative overflow-hidden transition-colors duration-500" id="systemic-problem">


      <Container className="relative z-10">
        <div ref={ref} className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-card dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm mb-10"
          >
            <AlertCircle className="w-4 h-4 text-brand dark:text-brand-light" />
            <span className="text-[10px] font-black text-gray-950 dark:text-gray-200 uppercase tracking-[0.2em]">The Systemic Impact</span>
          </motion.div>

          <h2 
            className="text-[40px] md:text-[54px] font-black text-gray-950 dark:text-gray-100 leading-[1.05] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
          >
            A problem shared by the <span className="text-brand">entire ecosystem.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mb-16">
            The crisis extends beyond individual wardrobes. It affects our soil, our water, and the most vulnerable members of our society.
          </p>
        </div>

        {/* Feature Grid: Apple Style Cards */}
        <div className="grid md:grid-cols-3 gap-8">
           {SYSTEMIC_ISSUES.map((issue, i) => (
             <motion.div
               key={issue.title}
               initial={{ opacity: 0, y: 20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
               className="group p-8 rounded-[2.5rem] bg-card border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
             >
                <div className="w-14 h-14 rounded-2xl bg-muted dark:bg-white/5 text-brand dark:text-brand-light flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-500">
                   <issue.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-black text-gray-950 dark:text-gray-100 mb-3 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {issue.title}
                </h3>
                <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {issue.description}
                </p>
             </motion.div>
           ))}
        </div>

        {/* Closing Narrative Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex -space-x-3">
             {[
               "/images/avatar_1_1774014610488.png",
               "/images/avatar_2_1774014629711.png",
               "/images/avatar_3_1774014649548.png",
               "/images/avatar_4_1774014668313.png",
             ].map((src, i) => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-muted transition-colors relative">
                 <Image src={src} alt="Impact" fill className="object-cover" />
               </div>
             ))}
             <div className="w-10 h-10 rounded-full border-2 border-background bg-brand flex items-center justify-center text-[10px] text-white font-black z-10 transition-colors">
               +10k
             </div>
          </div>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest max-w-[400px] text-center md:text-right">
            We are building a future where zero clothing ends up in a landfill. Together.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
