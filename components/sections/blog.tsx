"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import Image from "next/image";

const POSTS = [
  {
    title: "The True Cost of a T-Shirt in Bangalore",
    excerpt: "Exploring the lifecycle of fast fashion in the Silicon Valley of India.",
    category: "Sustainability",
    image: "/images/hero-img-1.png",
    date: "Mar 15",
    color: "bg-emerald-50"
  },
  {
    title: "How Circular Economy is Changing Fashion",
    excerpt: "The shift from linear consumption to a circular lifestyle.",
    category: "Insights",
    image: "/images/hero-img-2.png",
    date: "Mar 12",
    color: "bg-amber-50"
  },
  {
    title: "5 Tips to Extend Your Wardrobe's Life",
    excerpt: "Practical advice on caring for your high-end fabrics.",
    category: "Care",
    image: "/images/hero-img-3.png",
    date: "Mar 10",
    color: "bg-blue-50"
  }
];

export function Blog() {
  return (
    <section className="py-12 md:py-16 bg-transparent relative overflow-hidden transition-colors duration-500" id="blog">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand/5 dark:bg-brand/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2" />
      
      <Container>
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
              <span className="w-1 h-1 rounded-full bg-brand" />
              Editorial
            </div>
            <h2 
              className="text-[32px] md:text-[42px] font-black text-gray-950 dark:text-gray-100 tracking-tight leading-[1.1]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Latest stories.
            </h2>
          </div>
          <button className="hidden md:block h-max px-6 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-background dark:bg-card text-xs font-bold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-sm">
            View all →
          </button>
        </div>

        {/* Mosaic Bento-style Grid for One-Screen Fit */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 md:gap-5 h-auto md:h-[520px]">
          
          {/* Main Large Post */}
          <motion.article 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, scale: 1.01 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 group relative rounded-[2.5rem] overflow-hidden bg-muted shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <Image 
              src={POSTS[0].image} 
              alt={POSTS[0].title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4 border border-white/10">
                {POSTS[0].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                {POSTS[0].title}
              </h3>
              <p className="text-white/70 text-sm md:text-base font-medium line-clamp-2 max-w-sm">
                {POSTS[0].excerpt}
              </p>
            </div>
          </motion.article>

          {/* Secondary Post 1 */}
          <motion.article 
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             whileHover={{ y: -6, scale: 1.01 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="md:col-span-2 group relative rounded-[2.5rem] overflow-hidden bg-muted shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <Image 
              src={POSTS[1].image} 
              alt={POSTS[1].title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
               <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-2 block">{POSTS[1].category}</span>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight group-hover:translate-x-1 transition-transform">{POSTS[1].title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg font-bold group-hover:bg-brand group-hover:border-brand transition-all">
                    →
                  </div>
               </div>
            </div>
          </motion.article>

          {/* Secondary Post 2 */}
          <motion.article 
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             whileHover={{ y: -6, scale: 1.01 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="md:col-span-2 group relative rounded-[2.5rem] overflow-hidden bg-muted shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <Image 
              src={POSTS[2].image} 
              alt={POSTS[2].title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
               <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-2 block">{POSTS[2].category}</span>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight group-hover:translate-x-1 transition-transform">{POSTS[2].title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg font-bold group-hover:bg-brand group-hover:border-brand transition-all">
                    →
                  </div>
               </div>
            </div>
          </motion.article>

        </div>
      </Container>
    </section>
  );
}
