"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";

export function BinForm() {
  console.log("Rendering BinForm");
  return (
    <section className="py-16 md:py-24 bg-transparent w-full block relative transition-colors duration-500" id="bin-form">
      <Container>
         <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl mx-auto">
            {/* Left content */}
            <div className="flex flex-col justify-between h-full">
               <div>
                 <h2 
                   className="text-[44px] md:text-[52px] text-foreground font-bold leading-[1.1] mb-5 tracking-tight"
                   style={{ fontFamily: "var(--font-display)" }}
                 >
                    Want to install<br className="hidden md:block" />NoKasa bin?
                 </h2>
                 <p className="text-muted-foreground text-[17px] leading-[1.6] tracking-tight pr-4 md:pr-10 mb-8">
                     If you have any doubts or questions, let&apos;s clear them up with a quick call. Simply provide us with your basic details, and we&apos;ll handle the rest.
                 </p>
               </div>

               <div className="relative w-full h-[380px] md:h-[450px] hidden md:block select-none overflow-visible">
                  <Image 
                     src="/images/smart-bin.png" 
                     alt="NoKasa Smart Bin" 
                     fill 
                     className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all duration-700 hover:scale-110 hover:-rotate-2 scale-[1.2]"
                     sizes="(max-width: 768px) 100vw, 600px" 
                  />
               </div>
            </div>
            
            {/* Right: Form */}
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
               <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Pincode*</label>
                  <input type="text" placeholder="560001" className="bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600" />
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[13px] font-semibold text-muted-foreground">First Name*</label>
                   <input type="text" className="bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[13px] font-semibold text-muted-foreground">Last Name</label>
                   <input type="text" className="bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[13px] font-semibold text-muted-foreground">City*</label>
                   <input type="text" placeholder="Bengaluru" className="bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <label className="text-[13px] font-semibold text-muted-foreground">Phone*</label>
                   <input type="tel" className="bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                 </div>
               </div>

               <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Email*</label>
                  <input type="email" className="bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
               </div>

               <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Message*</label>
                  <textarea rows={4} className="bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors resize-none" />
               </div>

               <div className="pt-2">
                 <button type="submit" className="bg-brand hover:bg-brand/90 text-white dark:text-gray-900 dark:font-black px-9 py-3.5 rounded-lg font-bold text-sm transition-colors w-max shadow-lg shadow-brand/10">
                   Submit
                 </button>
               </div>
            </form>
         </div>
      </Container>
    </section>
  );
}
