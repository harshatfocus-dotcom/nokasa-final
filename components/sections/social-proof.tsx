"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";

const TESTIMONIALS = [
  {
    quote: "NoKasa entirely changed how I clear out my closet. It's shockingly fast and the instant reward directly to my wallet felt like magic.",
    name: "Aarav Sharma",
    title: "Software Engineer at Google",
    location: "Indiranagar, Bangalore",
    avatar: "/images/p1.png",
  },
  {
    quote: "Between my job and my kids, I simply don't have time to drop off old clothes. Having a premium service pick it up from my door is a lifesaver.",
    name: "Neha Reddy",
    title: "Product Manager at Swiggy",
    location: "Koramangala, Bangalore",
    avatar: "/images/p2.png",
  },
  {
    quote: "I had beautiful sarees sitting unused for years. Finding an app that genuinely respects and upcycles premium fabrics gave me total peace of mind.",
    name: "Lakshmi Iyer",
    title: "Homemaker",
    location: "Jayanagar, Bangalore",
    avatar: "/images/p3.png",
  },
  {
    quote: "The interface is beautiful and extremely minimal. I booked a pickup in 30 seconds and the delivery partner was highly professional.",
    name: "Rohan Das",
    title: "Creative Freelancer",
    location: "HSR Layout, Bangalore",
    avatar: "/images/p4.png",
  },
  {
    quote: "Tracking my exact carbon and water footprint savings directly in the app makes recycling incredibly rewarding and genuinely addictive.",
    name: "Kritika Menon",
    title: "Creative Director",
    location: "Whitefield, Bangalore",
    avatar: "/images/p1.png",
  },
  {
    quote: "The architectural approach they have to establishing a circular economy is brilliant. A seamless, high-end experience from start to finish.",
    name: "Vikram Singh",
    title: "Principal Architect",
    location: "Malleswaram, Bangalore",
    avatar: "/images/p2.png",
  },
];

// Split into two rows for the double marquee effect
const ROW_1 = TESTIMONIALS.slice(0, 3).concat(TESTIMONIALS.slice(0, 3));
const ROW_2 = TESTIMONIALS.slice(3, 6).concat(TESTIMONIALS.slice(3, 6));

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden transition-colors duration-500" id="testimonials">


      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center border border-gray-200 dark:border-white/10 bg-card dark:bg-white/5 rounded-full px-4 py-1.5 shadow-sm text-xs font-semibold text-gray-800 dark:text-gray-200 tracking-wide mb-4">
            Testimonials
          </div>
          <h2
            className="text-[40px] sm:text-[48px] font-black text-gray-950 dark:text-gray-100 tracking-tight leading-[1.1] mb-3"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            What our users say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-[16px] md:text-[18px]">
            See what our customers across Bangalore have to say about us.
          </p>
        </motion.div>
      </Container>

      {/* Infinite Horizontal Marquee System */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4 lg:gap-5 pb-0">
        
        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-[15%] bg-gradient-to-r from-background to-transparent z-20 pointer-events-none hidden md:block" />
        <div className="absolute top-0 bottom-0 right-0 w-[15%] bg-gradient-to-l from-background to-transparent z-20 pointer-events-none hidden md:block" />

        {/* Row 1 (Moves Left) */}
        <div className="w-full flex">
          <div 
            className="flex w-max shrink-0 gap-6 lg:gap-8 pl-6 lg:pl-8 group hover:[animation-play-state:paused]"
            style={{ animation: "marquee 45s linear infinite" }}
          >
            {ROW_1.concat(ROW_1).concat(ROW_1).map((t, i) => (
              <TestimonialCard key={`row1-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2 (Moves Right) */}
        <div className="w-full flex">
          <div 
            className="flex w-max shrink-0 gap-6 lg:gap-8 pl-6 lg:pl-8 group hover:[animation-play-state:paused]"
            style={{ animation: "marquee 55s linear infinite reverse" }}
          >
            {ROW_2.concat(ROW_2).concat(ROW_2).map((t, i) => (
              <TestimonialCard key={`row2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="w-[340px] md:w-[420px] bg-card border border-gray-200/80 dark:border-white/15 rounded-[2rem] p-8 shrink-0 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(44,76,59,0.12)] dark:hover:shadow-[0_20px_50px_rgba(163,177,138,0.15)] transition-all duration-300">
      <p className="text-gray-700 dark:text-gray-300 font-medium text-[16px] leading-[1.65] mb-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0 border border-gray-200/50 dark:border-white/10">
          <Image 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            fill 
            className="object-cover" 
            sizes="48px"
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-[15px]">{testimonial.name}</h4>
          <p className="text-[12px] font-medium text-gray-500 dark:text-gray-500 mt-0.5">{testimonial.title}</p>
          <p className="text-[11px] font-semibold text-brand dark:text-brand-light tracking-widest uppercase mt-1">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
