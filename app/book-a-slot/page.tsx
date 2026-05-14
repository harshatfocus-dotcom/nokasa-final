"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CheckCircle2, XCircle, Shirt, Ban } from "lucide-react";

/* ─── What We Accept ───────────────────────────────────────────────── */
const ACCEPTED = [
  { label: "Shirts", emoji: "👔" },
  { label: "T-Shirts", emoji: "👕" },
  { label: "Kurtis", emoji: "🥻" },
  { label: "Salwar", emoji: "👗" },
  { label: "Pants", emoji: "👖" },
  { label: "Western Wear", emoji: "🧥" },
  { label: "Sarees", emoji: "🪡" },
  { label: "Jackets", emoji: "🧣" },
];

const REJECTED = [
  { label: "Children Wear", emoji: "🧒" },
  { label: "Torn Clothes", emoji: "🧵" },
  { label: "Undergarments", emoji: "🩲" },
  { label: "Stained Clothes", emoji: "🫧" },
  { label: "Bedsheets", emoji: "🛏️" },
  { label: "Curtains", emoji: "🪟" },
  { label: "Towels", emoji: "🛁" },
  { label: "Floor Mats", emoji: "🟫" },
];

/* ─── Steps ────────────────────────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    title: "Install the app",
    desc: "Download the NoKasa app, pick a date and time that works for you, and schedule your pickup in seconds.",
    image: "/images/step-1.png",
  },
  {
    n: "02",
    title: "Segregate your clothes",
    desc: "Sort your clothes into two piles: wearable and non-wearable. Use any bag you have at home. No special packaging needed.",
    image: "/images/step-2.png",
  },
  {
    n: "03",
    title: "Earn rewards instantly",
    desc: "Our delivery agent collects the clothes and you receive your rewards on the spot.",
    image: "/images/step-3.png",
  },
];

/* ─── FAQs ─────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "What clothes does NoKasa accept?",
    a: "We accept most wearable adult clothing including shirts, pants, dresses, jackets, sarees, kurtas, and more. Clothes should be reasonably clean. We do not accept undergarments, heavily damaged, or stained items.",
  },
  {
    q: "How are rewards calculated?",
    a: "Rewards are based on the weight and condition of the clothes. Wearable, resaleable items typically earn more than items meant for recycling. Our agent weighs everything on the spot.",
  },
  {
    q: "How long does pickup take to arrive?",
    a: "We typically schedule pickups within 3–7 days depending on your location and availability. We're constantly expanding coverage to reduce this window.",
  },
  {
    q: "What happens to the clothes after pickup?",
    a: "Clothes in good condition are resold through our resale network. Items not suitable for resale are sent to certified recycling facilities, never to a landfill.",
  },
  {
    q: "Is there a minimum quantity?",
    a: "Yes, we require a minimum of 25 pieces of clothing per pickup to keep the service efficient and worthwhile for both parties.",
  },
  {
    q: "Is the service available in my city?",
    a: "We currently serve Bangalore only. Stay tuned as we expand to more cities soon.",
  },
];

/* ─── Clothes Grid ─────────────────────────────────────────────────── */
function ClothesGrid({
  items,
  accepted,
  inView,
}: {
  items: typeof ACCEPTED;
  accepted: boolean;
  inView: boolean;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 group cursor-default ${
            accepted
              ? "bg-emerald-50/60 dark:bg-emerald-500/5 border-emerald-200/80 dark:border-emerald-500/20 hover:border-emerald-400/60 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
              : "bg-red-50/60 dark:bg-red-500/5 border-red-200/80 dark:border-red-500/20 hover:border-red-400/60 hover:bg-red-50 dark:hover:bg-red-500/10"
          }`}
        >
          {/* Status badge */}
          <div className={`absolute top-2 right-2 ${accepted ? "text-emerald-500" : "text-red-400"}`}>
            {accepted ? <CheckCircle2 size={12} strokeWidth={2.5} /> : <XCircle size={12} strokeWidth={2.5} />}
          </div>

          <span
            className="text-3xl select-none group-hover:scale-110 transition-transform duration-200"
            role="img"
            aria-label={item.label}
          >
            {item.emoji}
          </span>
          <span
            className={`text-[11px] font-black uppercase tracking-[0.08em] text-center leading-tight ${
              accepted ? "text-emerald-800 dark:text-emerald-300" : "text-red-700 dark:text-red-400"
            }`}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function BookASlotPage() {
  const howRef = useRef(null);
  const clothesRef = useRef(null);
  const faqRef = useRef(null);
  const howInView = useInView(howRef, { once: true, amount: 0.15 });
  const clothesInView = useInView(clothesRef, { once: true, amount: 0.1 });
  const faqInView = useInView(faqRef, { once: true, amount: 0.15 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="flex-1 flex flex-col bg-background transition-colors duration-500">
      {/* ── Hero ── */}
      <section className="min-h-screen pt-36 md:pt-44 pb-16 md:pb-24 relative overflow-hidden flex items-center">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/8 dark:bg-brand/10 border border-brand/15 text-[11px] font-bold text-brand uppercase tracking-widest mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Now accepting pickups
              </div>
              <h1
                className="text-[32px] sm:text-[42px] md:text-[56px] lg:text-[60px] font-black text-gray-950 dark:text-gray-100 leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Book your free<br />
                <span className="text-brand">clothing pickup</span><br />
                today.
              </h1>
              <p className="text-[17px] md:text-[19px] text-gray-500 dark:text-gray-400 font-medium leading-[1.6] mb-8 max-w-lg mx-auto lg:mx-0">
                Scan the QR code to download the NoKasa app and schedule your first pickup in under 30 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 px-6 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.37.21.8.22 1.19.01l12.19-6.87-2.64-2.64-10.74 9.5zM.5 1.83C.19 2.17 0 2.68 0 3.33v17.34c0 .65.19 1.16.51 1.49l.08.07 9.72-9.72v-.23L.58 1.76l-.08.07zM20.34 10.28l-2.77-1.56-2.95 2.95 2.95 2.95 2.78-1.57c.79-.45.79-1.32-.01-1.77zM4.37.24L16.56 7.1 13.92 9.74 3.18.24C3.57.03 4 .04 4.37.24z" />
                  </svg>
                  Get on Google Play
                </a>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 px-6 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </a>
              </div>
            </motion.div>

            {/* Right: QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-brand/20 rounded-[2rem] blur-2xl scale-110" />
                <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-2xl border border-gray-100 dark:border-white/10">
                  <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]">
                    <Image
                      src="/images/app-qr.png"
                      alt="Scan to download NoKasa app"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <p className="text-[13px] font-black text-gray-900 dark:text-gray-100 tracking-tight">Scan to book a pickup</p>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">Works on iOS & Android</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
        <Container>
          <motion.div
            ref={howRef}
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card dark:bg-white/5 border border-brand/10 dark:border-brand/20 text-[11px] font-bold text-brand uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              How It Works
            </div>
            <h2
              className="text-[40px] md:text-[56px] font-black text-gray-950 dark:text-gray-100 mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three steps to a cleaner closet.
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-[1.6]">
              From your closet to a new owner, in three effortless steps.
            </p>
          </motion.div>

          <div className="relative w-full max-w-[1280px] mx-auto">
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
                  animate={howInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                  className="relative flex flex-col bg-card rounded-[2.5rem] p-3 md:p-4 pb-8 md:pb-10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] border border-gray-200/80 dark:border-white/15 group z-10 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500"
                >
                  <div className="w-full h-[240px] md:h-[300px] rounded-[1.5rem] overflow-hidden bg-muted relative mb-6 md:mb-8">
                    <Image src={step.image} alt={step.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    <div className="absolute top-4 left-4 bg-background/95 dark:bg-card/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-widest text-brand dark:text-brand-light shadow border border-white/20 dark:border-white/10">
                      STEP {step.n}
                    </div>
                  </div>
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

      {/* ── What We Accept / Don't Accept ── */}
      <section ref={clothesRef} className="py-16 md:py-24 relative transition-colors duration-500">
        <Container>
          {/* Section Header */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={clothesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card dark:bg-white/5 border border-brand/10 dark:border-brand/20 text-[11px] font-bold text-brand uppercase tracking-widest mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Guidelines
            </div>
            <h2
              className="text-[36px] md:text-[52px] font-black text-gray-950 dark:text-gray-100 leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What we pick up
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[16px] font-medium leading-relaxed">
              Please sort your clothes before the agent arrives. It helps us process faster and maximise your rewards.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Accepted */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={clothesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-200/60 dark:border-emerald-500/15 rounded-[2rem] p-7 md:p-8"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                  <Shirt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-emerald-900 dark:text-emerald-300 tracking-tight">We Accept</h3>
                  <p className="text-[12px] text-emerald-700/70 dark:text-emerald-400/60 font-medium">Wearable adult clothing</p>
                </div>
              </div>
              <ClothesGrid items={ACCEPTED} accepted={true} inView={clothesInView} />
            </motion.div>

            {/* Rejected */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={clothesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-red-50/50 dark:bg-red-500/5 border border-red-200/60 dark:border-red-500/15 rounded-[2rem] p-7 md:p-8"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
                  <Ban className="w-4 h-4 text-red-500 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-red-900 dark:text-red-300 tracking-tight">We Don&apos;t Accept</h3>
                  <p className="text-[12px] text-red-700/70 dark:text-red-400/60 font-medium">Please keep these out of your pile</p>
                </div>
              </div>
              <ClothesGrid items={REJECTED} accepted={false} inView={clothesInView} />
            </motion.div>
          </div>

          {/* Note */}
          <motion.div
            className="mt-8 flex items-start gap-3 bg-amber-50/60 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/15 rounded-2xl px-6 py-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={clothesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-xl mt-0.5">💡</span>
            <p className="text-[13px] text-amber-800 dark:text-amber-300/80 font-medium leading-relaxed">
              <span className="font-black">Pro tip:</span> Even clothes that are slightly worn or faded can be accepted, as long as they&apos;re clean and wearable. Our agent will do a final check on arrival.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 md:py-16 bg-transparent relative transition-colors duration-500" id="faq">
        <Container>
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">
            <motion.div
              ref={faqRef}
              className="lg:sticky lg:top-32"
              initial={{ opacity: 0, y: 24 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] font-bold text-brand tracking-widest uppercase mb-4 px-3 py-1 bg-brand/5 border border-brand/10 w-max rounded-full">
                FAQ
              </p>
              <h2
                className="text-[36px] md:text-[44px] font-black text-gray-950 dark:text-gray-100 tracking-tight leading-[1.05] mb-4"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Common questions answered.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-[15px] font-medium leading-relaxed mb-6">
                Can&apos;t find what you&apos;re looking for? Reach out to us directly.
              </p>
              <a
                href="mailto:support@nokasa.co"
                className="inline-flex items-center gap-2 text-[15px] font-bold text-brand hover:brightness-110 transition-colors mb-10"
              >
                support@nokasa.co →
              </a>
              <div className="relative w-full h-[280px] md:h-[340px] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hidden md:block">
                <Image
                  src="/images/faq-sweater.png"
                  alt="Colorful clothes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-brand/5 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="divide-y divide-gray-100 dark:divide-white/5"
            >
              {FAQS.map((faq, i) => (
                <div key={faq.q} className="py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 text-left group"
                    aria-expanded={openFaq === i}
                  >
                    <span
                      className={`text-sm font-semibold transition-colors duration-150 ${
                        openFaq === i ? "text-brand" : "text-gray-950 dark:text-gray-100 group-hover:text-brand"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-xl leading-none flex-shrink-0 ${openFaq === i ? "text-brand" : "text-gray-400"}`}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pt-3 pr-8">
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

    </main>
  );
}
