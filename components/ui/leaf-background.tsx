"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface LeafData {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  animClass: string;
  parallaxSpeed: number;
  layer: number; // 0=far, 1=mid, 2=near – for depth
}

const LEAF_EMOJIS = ["🌿", "🍃", "🍂", "🌱", "☘️", "🍀"];

const ANIM_CLASSES = [
  "leaf-drift-1",
  "leaf-drift-2",
  "leaf-drift-3",
  "leaf-drift-4",
  "leaf-drift-5",
  "leaf-drift-6",
];

// Seeded random for SSR consistency
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function LeafBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate leaves deterministically so SSR and client match
  const leaves = useMemo<LeafData[]>(() => {
    const generated: LeafData[] = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const layer = i < 15 ? 0 : i < 35 ? 1 : 2;

      // Size by layer: far=small, near=larger
      const sizeMin = [10, 14, 18][layer];
      const sizeMax = [16, 22, 28][layer];
      const opacityMin = [0.04, 0.06, 0.08][layer];
      const opacityMax = [0.08, 0.12, 0.16][layer];

      generated.push({
        id: i,
        emoji: LEAF_EMOJIS[i % LEAF_EMOJIS.length],
        x: seededRandom(i * 7 + 1) * 100,
        y: seededRandom(i * 13 + 3) * 100,
        size: sizeMin + seededRandom(i * 17 + 5) * (sizeMax - sizeMin),
        rotation: seededRandom(i * 23 + 7) * 360,
        opacity: opacityMin + seededRandom(i * 29 + 11) * (opacityMax - opacityMin),
        animClass: ANIM_CLASSES[i % ANIM_CLASSES.length],
        parallaxSpeed: [0.15, 0.3, 0.5][layer] * (0.8 + seededRandom(i * 31 + 13) * 0.4),
        layer,
      });
    }
    return generated;
  }, []);

  // Use viewport scroll progress (no target needed)
  const { scrollYProgress } = useScroll();

  // Spring-smoothed scroll for organic feel
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  if (!isClient) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 dark:opacity-50"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {leaves.map((leaf) => (
        <LeafElement key={leaf.id} leaf={leaf} scrollProgress={smoothScroll} />
      ))}
    </div>
  );
}

// Individual leaf with parallax
function LeafElement({
  leaf,
  scrollProgress,
}: {
  leaf: LeafData;
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  // Each leaf moves differently based on parallax speed
  const y = useTransform(
    scrollProgress,
    [0, 1],
    [0, -120 * leaf.parallaxSpeed]
  );
  const x = useTransform(
    scrollProgress,
    [0, 1],
    [0, (leaf.id % 2 === 0 ? 1 : -1) * 30 * leaf.parallaxSpeed]
  );
  const rotate = useTransform(
    scrollProgress,
    [0, 1],
    [leaf.rotation, leaf.rotation + (leaf.id % 2 === 0 ? 15 : -15)]
  );

  return (
    <motion.span
      className={`absolute select-none ${leaf.animClass}`}
      style={{
        left: `${leaf.x}%`,
        top: `${leaf.y}%`,
        fontSize: `${leaf.size}px`,
        opacity: leaf.opacity,
        y,
        x,
        rotate,
        willChange: "transform",
        filter: leaf.layer === 0 ? "blur(1px)" : leaf.layer === 1 ? "blur(0.3px)" : "none",
      }}
    >
      {leaf.emoji}
    </motion.span>
  );
}
