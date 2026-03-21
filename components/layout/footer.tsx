"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { motion, useInView, useAnimation } from "framer-motion";
import { Home, Leaf, RefreshCw } from "lucide-react";

/* ─── Link data ─────────────────────────────────────────────────────── */
const PLATFORM_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Impact", href: "/impact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "mailto:support@nokasa.co" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/saynokasa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nokasa/posts/?feedView=all",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/GoNoKasa",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" />
      </svg>
    ),
  },
];

/* ─── Minimalist Truck Animation ──────────────────────────────────── */
function MinimalistTruckTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isDriving, setIsDriving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [flora] = useState(() => 
    Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: 20 + (i * 4.6),
      size: 14 + Math.random() * 8,
      rotate: (Math.random() - 0.5) * 40,
    }))
  );

  const startAnimation = async () => {
    if (!inView) return;

    setIsDriving(false);
    await controls.set({ x: "-30vw" });

    // 1. Enter and reach Pickup
    await controls.start({
      x: "15vw",
      transition: { duration: 3.5, ease: [0.16, 1, 0.3, 1] }
    });

    // 2. Pause at Pickup
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Start Driving (this triggers leaf growth)
    setIsDriving(true);

    // 3. Drive across to Recycle (Takes 6 seconds)
    await controls.start({
      x: "85vw",
      transition: { duration: 6, ease: "linear" }
    });

    // Pause briefly at Recycle
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDriving(false);

    // Exit the screen (Faster exit for snappier reset)
    await controls.start({
      x: "135vw",
      transition: { duration: 1.5, ease: "easeIn" }
    });

    // Short wait before repeat (Substantially reduced)
    setTimeout(startAnimation, 200);
  };

  useEffect(() => {
    if (inView) {
      startAnimation();
    } else {
      controls.stop();
    }
  }, [inView]);

  return (
    <div ref={containerRef} className="relative w-full h-40 md:h-52 bg-transparent flex flex-col justify-end pb-12 overflow-hidden select-none px-4 md:px-0">
       {/* Sophisticated Path Shadow */}
       <div className="absolute bottom-12 left-[15%] right-[15%] h-[1px] bg-emerald-500/20 dark:bg-emerald-400/10 blur-[1px]" />
       
       {/* Single Minimal Road Line */}
       <div className="absolute bottom-[48px] left-0 right-0 h-[1px] bg-gray-100 dark:bg-white/5" />

       {/* Checkpoints */}
       <div className="absolute bottom-[28px] left-[15%] -translate-x-1/2 flex flex-col items-center z-30">
          <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
             <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">Pickup</span>
       </div>

       <div className="absolute bottom-[28px] right-[15%] translate-x-1/2 flex flex-col items-center z-30">
          <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
             <RefreshCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-[spin_8s_linear_infinite]" />
          </div>
          <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">Recycle</span>
       </div>

       {/* Premium Bloom Trail */}
       {mounted && flora.map((leaf) => {
         const travelStartPercent = 15;
         const travelEndPercent = 85;
         const normalizedX = (leaf.x - travelStartPercent) / (travelEndPercent - travelStartPercent);
         const growthDelay = isDriving ? Math.max(0, (normalizedX * 6) - 0.2) : 0; 

         return (
           <motion.div
             key={leaf.id}
             initial={{ opacity: 0, scale: 0, scaleY: 0.5 }}
             animate={isDriving ? { 
                opacity: 0.4, 
                scale: 1, 
                scaleY: 1
             } : { 
                opacity: 0, 
                scale: 0, 
                scaleY: 0.5 
             }}
             transition={{ 
                delay: growthDelay, 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1]
             }}
             className="absolute bottom-12 text-emerald-500/80 dark:text-emerald-400/40 pointer-events-none"
             style={{ 
               left: `${leaf.x}%`, 
               rotate: `${leaf.rotate}deg`,
             }}
           >
             <Leaf size={leaf.size} />
           </motion.div>
         );
       })}

       {/* Precision Logistics Truck */}
       <motion.div
        className="absolute bottom-12 z-20"
        animate={controls}
       >
         <motion.div 
           className="relative"
           animate={{ y: [0, -0.8, 0] }}
           transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
         >
            <svg width="56" height="34" viewBox="0 0 64 40" fill="none" className="text-gray-950 dark:text-white filter drop-shadow-md">
               <rect x="2" y="4" width="38" height="26" rx="4" fill="currentColor" />
               <path d="M41 12H54C58 12 62 16 62 20V30H41V12Z" fill="currentColor" />
               <path d="M48 16H54C56 16 58 18 58 20V24H48V16Z" fill="white" fillOpacity="0.8" className="dark:fill-gray-950" />
               <circle cx="12" cy="34" r="5" fill="currentColor" />
               <circle cx="52" cy="34" r="5" fill="currentColor" />
               <motion.g
                 animate={{ rotate: 360 }}
                 transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                 style={{ originX: "12px", originY: "34px" }}
               >
                 <rect x="11.5" y="30" width="1" height="8" fill="white" fillOpacity="0.4" className="dark:fill-gray-950" />
               </motion.g>
               <motion.g
                 animate={{ rotate: 360 }}
                 transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                 style={{ originX: "52px", originY: "34px" }}
               >
                 <rect x="51.5" y="30" width="1" height="8" fill="white" fillOpacity="0.4" className="dark:fill-gray-950" />
               </motion.g>
            </svg>
         </motion.div>
       </motion.div>
    </div>
  );
}

/* ─── Footer Section ────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="bg-background border-t border-gray-100 dark:border-white/5 pb-8 transition-colors duration-500">
      <div className="pt-4 border-b border-gray-50/50 dark:border-white/5 bg-bg-muted/30">
         <Container>
            <MinimalistTruckTrail />
         </Container>
      </div>

      <Container>
        <div className="pt-12 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-24">
            {/* Branding */}
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-4 group">
                <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 border-2 border-brand/10 dark:border-white/10 shadow-lg overflow-hidden">
                   <svg width="28" height="28" viewBox="0 0 230 230" fill="none">
                      <circle cx="115" cy="115" r="115" fill="#00463C"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M115.06 40.7C106.054 40.7 97.2482 42.3 88.9426 45.4C80.6371 48.5 73.2322 53.1 66.928 58.8C60.6238 64.5 55.7205 71.3 52.3182 78.6C48.9159 86 47.2148 93.9 47.2148 101.9C47.2148 109.9 45.0133 106.9 42.2115 106.9C39.4096 106.9 37.2081 104.7 37.2081 101.9C37.2081 92.5 39.2095 83.2 43.2121 74.5C47.1147 65.8 52.9186 58 60.2235 51.4C67.4283 44.8 76.034 39.6 85.4403 36.1C94.8466 32.6 104.953 30.7 115.06 30.7C125.167 30.7 135.274 32.5 144.68 36.1C154.086 39.6 162.692 44.8 169.897 51.4C177.101 58 182.905 65.8 186.908 74.5C190.811 83.2 192.912 92.5 192.912 101.9C192 105.5 190.711 106.9 187.909 106.9C185.107 106.9 182.905 104.7 182.905 101.9C182.905 93.9 181.204 86 177.802 78.6C174.4 71.2 169.496 64.5 163.192 58.8C156.888 53.1 149.383 48.5 141.177 45.4C132.872 42.3 124.066 40.7 115.06 40.7Z" fill="#FCF1DC"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M115.06 189.6C124.066 189.6 132.872 188 141.177 184.9C149.483 181.8 156.888 177.2 163.192 171.5C169.496 165.8 174.4 159 177.802 151.7C181.204 144.3 182.905 136.4 182.905 128.4C182.905 120.4 185.107 123.4 187.909 123.4C190.711 123.4 192.912 125.6 192.912 128.4C192.912 137.8 190.911 147.1 186.908 155.8C183.005 164.5 177.202 172.3 169.897 178.9C162.692 185.5 154.086 190.7 144.68 194.2C135.274 197.7 125.167 199.6 115.06 199.6C104.953 199.6 94.8466 197.8 85.4403 194.2C76.034 190.7 67.4283 185.5 60.2235 178.9C53.0187 172.3 47.2148 164.5 43.2121 155.8C39.3095 147.1 37.2081 137.8 37.2081 128.4C37.2081 119 39.4096 123.4 42.2115 123.4C45.0133 123.4 47.2148 125.6 47.2148 128.4C47.2148 136.4 48.9159 144.3 52.3182 151.7C55.7205 159.1 60.6238 165.8 66.928 171.5C73.2322 177.2 80.7372 181.8 88.9426 184.9C97.2482 188 106.054 189.6 115.06 189.6Z" fill="#FCF1DC"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M172.598 86.1C173.999 85 176.101 85.2 177.302 86.6L187.909 99.9L198.516 86.6C199.617 85.2 201.718 84.9 203.219 86.1C204.62 87.2 204.92 89.3 203.719 90.8L190.51 107.3C189.91 108.1 188.909 108.5 187.909 108.5C186.908 108.5 185.907 108 185.307 107.3L172.098 90.8C170.997 89.4 171.198 87.3 172.598 86.1Z" fill="#FCF1DC"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M57.5217 140.9C56.1208 142 54.0194 141.8 52.8186 140.4L42.2115 127.1L31.6044 140.4C30.5037 141.8 28.4023 142.1 26.9013 140.9C25.5003 139.8 25.2001 137.7 26.4009 136.2L39.6097 119.7C40.2101 118.9 41.2108 118.5 42.2115 118.5C43.2121 118.5 44.2128 119 44.8132 119.7L58.022 136.2C59.1228 137.6 58.9226 139.7 57.5217 140.9Z" fill="#FCF1DC"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M115.06 68.1C89.0427 68.1 68.0287 89.2 68.0287 115.1C68.0287 141 89.1428 162.1 115.06 162.1C140.977 162.1 162.091 141 162.091 115.1C162.091 89.2 140.977 68.1 115.06 68.1ZM57.2215 115.2C57.2215 83.3 83.1388 57.4 115.06 57.4C146.981 57.4 172.899 83.3 172.899 115.2C172.899 147.1 146.981 173 115.06 173C83.1388 173 57.2215 147.1 57.2215 115.2Z" fill="#FCF1DC"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M145.881 129.4L130.37 135.8L129.27 143.2L140.077 146C141.778 146.4 143.279 147.3 144.48 148.5L149.583 153.6C151.685 155.7 151.685 159.1 149.583 161.2C147.482 163.3 144.079 163.3 141.978 161.2L137.075 156.3L125.667 153.3C123.366 152.7 121.364 151.2 119.963 149.2C118.663 147.2 118.062 144.8 118.462 142.4L119.763 133.6C119.963 131.9 120.664 130.4 121.765 129C122.765 127.7 124.166 126.6 125.667 126L142.278 119.1C143.979 118.4 145.881 118.2 147.682 118.5C149.483 118.8 151.284 119.9 152.685 121.1M152.685 121.1L166.194 133.4C168.396 135.4 168.496 138.8 166.494 141C164.493 143.2 161.091 143.3 158.889 141.3L145.881 129.4" fill="#FCF1DC"/>
                      <path d="M73.1321 149.9C71.6311 149.9 70.1301 149.1 69.3296 147.7C68.1288 145.6 68.8293 142.9 70.9307 141.6L75.7339 138.8V119.1C75.7339 117.4 76.3343 115.7 77.3349 114.3L88.7425 97.2C89.443 96.2 90.2435 95.4 91.2442 94.7C92.2449 94.1 93.3456 93.6 94.5464 93.4C95.7472 93.2 96.948 93.2 98.0487 93.4C99.1495 93.7 100.25 94.1 101.151 94.8L111.858 101.8C111.858 101.8 111.958 101.8 112.058 101.9L129.17 99.6L141.278 85.5V72.5C141.278 70 143.279 68.1 145.681 68.1C148.082 68.1 150.083 70.1 150.083 72.5V85.6C150.083 87.7 149.283 89.7 147.982 91.3L135.874 105.4C134.473 107 132.472 108.1 130.37 108.4L113.159 110.7C110.957 111 108.756 110.5 106.955 109.2L96.2475 102.1C96.2475 102.1 96.2475 102.1 96.1475 102.1L84.7399 119.1V138.8C84.6398 140.2 84.2395 141.7 83.5391 142.9C82.8386 144.2 81.8379 145.3 80.6371 146.1C80.6371 146.1 80.5371 146.1 80.437 146.2L75.4337 149.1C74.7332 149.5 73.9327 149.7 73.2322 149.7L73.1321 149.9Z" fill="#FCF1DC"/>
                   </svg>
                </div>
                <span className="text-xl font-black tracking-tight text-gray-900 dark:text-gray-100" style={{ fontFamily: "var(--font-display)" }}>
                  NoKasa<span className="text-brand">.</span>
                </span>
              </Link>
              <p className="text-[14px] leading-relaxed text-gray-400 font-medium">
                Pioneering sustainable logistics for a circular economy. We make recycling as effortless as a single pickup.
              </p>
              <div className="flex gap-2">
                {SOCIAL.map((s) => (
                   <a
                     key={s.label}
                     href={s.href}
                     className="w-10 h-10 border border-gray-100 dark:border-white/10 rounded-xl flex items-center justify-center text-gray-300 dark:text-gray-500 hover:text-gray-950 dark:hover:text-white hover:border-gray-950/20 dark:hover:border-white/20 transition-all duration-300"
                   >
                     {s.icon}
                   </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-900 dark:text-gray-100 border-l-[3px] border-brand pl-3 h-3 flex items-center">
                Platform
              </h4>
              <ul className="space-y-4">
                {PLATFORM_LINKS.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[14px] font-bold text-gray-500 dark:text-gray-300 hover:text-brand transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-900 dark:text-gray-100 border-l-[3px] border-brand pl-3 h-3 flex items-center">
                Support
              </h4>
              <ul className="space-y-4">
                {LEGAL_LINKS.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] font-bold text-gray-500 dark:text-gray-300 hover:text-brand transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-card p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/15 flex flex-col justify-between shadow-2xl dark:shadow-none shadow-gray-100">
              <div>
                 <h4 className="text-[17px] font-black text-gray-950 dark:text-gray-100 mb-3 tracking-tight">Eco-logistics.</h4>
                 <p className="text-[13px] text-gray-400 dark:text-gray-500 leading-relaxed font-medium">
                   Ready to transform your unused clothes into sustainable value?
                 </p>
              </div>
              <Link 
                href="/install-bin" 
                className="mt-8 w-full py-4 bg-gray-950 dark:bg-brand text-white rounded-2xl text-[12px] font-black uppercase tracking-widest text-center hover:bg-brand transition-all duration-300 shadow-xl shadow-gray-200 dark:shadow-none"
              >
                Start Pickup
              </Link>
            </div>
          </div>
        </div>

        {/* Global Bottom */}
        <div className="py-6 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-[12px] text-gray-300 font-medium">© {new Date().getFullYear()} NoKasa Private Limited. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
