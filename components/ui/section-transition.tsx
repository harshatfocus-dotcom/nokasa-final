"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wraps each section below the hero for a smooth scroll-reveal transition.
 * As the section enters the viewport, it fades up gently.
 */
export function SectionTransition({
  children,
  className = "",
  delay = 0,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
