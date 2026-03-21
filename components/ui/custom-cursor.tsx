"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with a real pointer
    if (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches) return;

    // Small hack to hide the default cursor on the body to enforce custom cursor feel globally
    document.body.style.cursor = "none";
    
    // Fallback: restore default cursor when hovering text or specific inputs
    const applyGlobalCursor = () => {
        document.querySelectorAll('a, button, input, textarea, [class*="hover-trigger"]').forEach((el) => {
            (el as HTMLElement).style.cursor = "none";
        });
    }
    applyGlobalCursor();
    const observer = new MutationObserver(applyGlobalCursor);
    observer.observe(document.body, { childList: true, subtree: true });

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".hover-trigger")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand/80 dark:border-white/90 pointer-events-none z-[99999] flex items-center justify-center bg-brand/5 dark:bg-white/5 backdrop-blur-[2px] hidden lg:flex shadow-lg transition-colors duration-500"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovered ? 1.6 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 35,
        mass: 0.8
      }}
    >
      <motion.div
        animate={{ scale: isHovered ? 0 : 1, opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full bg-brand dark:bg-white transition-colors duration-500"
      />
    </motion.div>
  );
}
