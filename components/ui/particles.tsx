"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Particles({ 
  className = "", 
  count = 20, 
  color = "currentColor" 
}: { 
  className?: string; 
  count?: number;
  color?: string;
}) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const SHAPES = ["square", "circle", "triangle", "line", "dot"];
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 8,
      duration: Math.random() * 20 + 25,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotate: Math.random() * 360,
      moveX: (Math.random() - 0.5) * 100,
      moveY: (Math.random() - 0.5) * 150,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute dark:text-brand-light text-brand"
          style={{ 
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.shape === "line" ? p.size * 3 : p.size, 
            height: p.shape === "line" ? 1 : p.size,
            rotate: p.rotate,
          }}
          animate={{
            x: [0, p.moveX, 0],
            y: [0, p.moveY, 0],
            rotate: [p.rotate, p.rotate + 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.shape === "circle" || p.shape === "dot" ? (
             <div className="w-full h-full rounded-full bg-current" />
          ) : p.shape === "square" ? (
             <div className="w-full h-full bg-current" />
          ) : p.shape === "triangle" ? (
             <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent border-b-current" 
                  style={{ borderBottomWidth: p.size, borderLeftWidth: p.size/2, borderRightWidth: p.size/2 }} 
             />
          ) : (
             <div className="w-full h-[1px] bg-current" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
