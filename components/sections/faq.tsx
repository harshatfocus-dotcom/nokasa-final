"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";

const FAQS = [
  {
    q: "What clothes does NoKasa accept?",
    a: "We accept most wearable clothing including shirts, pants, dresses, jackets, sarees, kurtas, and more. Clothes should be reasonably clean. We do not accept undergarments or heavily damaged items.",
  },
  {
    q: "How are rewards calculated?",
    a: "Rewards are calculated at ₹20 per kg for wearable, resaleable items only. Items accepted for recycling do not earn any rewards. A one-time pickup charge of ₹50 applies per slot. Our agent weighs and evaluates everything on the spot.",
  },
  {
    q: "How long does pickup take to arrive?",
    a: "Pickup is scheduled based on available slots,you choose the date and time that works best for you. We work entirely around your convenience.",
  },
  {
    q: "What happens to the clothes after pickup?",
    a: "Clothes in good condition are resold through our resale network. Items not suitable for resale are donated or sent to certified recycling facilities,never to a landfill.",
  },
  {
    q: "Is there a minimum quantity?",
    a: "Yes, we require a minimum of 25 clothes per pickup. This helps us keep the service efficient and worthwhile for both parties.",
  },
  {
    q: "Is the service available in my city?",
    a: "We currently serve Bangalore. We're actively expanding to more cities soon,stay tuned!",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-12 md:py-16 bg-transparent relative transition-colors duration-500" id="faq">
      <Container>
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 md:gap-12 lg:gap-20 items-start">
          {/* Left: Header & Image */}
          <motion.div
            ref={ref}
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 px-3 py-1 bg-brand/5 border border-brand/10 w-max rounded-full">
              FAQ
            </p>
            <h2
              className="text-[28px] sm:text-[34px] md:text-[44px] font-black text-gray-950 tracking-tight leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Common questions answered.
            </h2>
            <p className="text-gray-500 text-[15px] font-medium leading-relaxed mb-6">
              Can&apos;t find what you&apos;re looking for? Reach out to us directly.
            </p>
            <a
              href="mailto:support@nokasa.co"
              className="inline-flex items-center gap-2 text-[15px] font-bold text-brand hover:brightness-110 transition-colors mb-10"
            >
              support@nokasa.co →
            </a>

            {/* Added Image */}
            <div className="relative w-full h-[280px] md:h-[340px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm hidden md:block">
              <Image 
                src="/images/faq-sweater.png" 
                alt="Colorful sweater being folded" 
                fill 
                className="object-cover "
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-brand/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="divide-y divide-gray-100 "
          >
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="py-5">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                  aria-expanded={open === i}
                >
                  <span
                    className={`text-sm font-semibold transition-colors duration-150 ${
                      open === i ? "text-brand " : "text-gray-950 group-hover:text-brand :text-brand-light"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-xl leading-none flex-shrink-0 ${
                      open === i ? "text-brand " : "text-gray-400 "
                    }`}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-500 leading-relaxed pt-3 pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
