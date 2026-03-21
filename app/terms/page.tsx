"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Particles } from "@/components/ui/particles";
import { 
  FileText, 
  Gavel, 
  Scale, 
  ShieldAlert, 
  Mail, 
  MapPin, 
  ChevronRight,
  Info,
  CheckCircle2
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    { id: "acceptance", label: "Acceptance of Terms" },
    { id: "overview", label: "Services Overview" },
    { id: "eligibility", label: "Eligibility" },
    { id: "ownership", label: "Transfer of Ownership" },
    { id: "warranties", label: "User Representations" },
    { id: "access", label: "Smart Bins & Access" },
    { id: "valuation", label: "Valuation & Cashback" },
    { id: "marketplace", label: "Marketplace & Delivery" },
    { id: "intellectual", label: "Intellectual Property" },
    { id: "grievance", label: "Grievance Redressal" },
    { id: "indemnity", label: "Indemnity & Liability" },
    { id: "legal", label: "Governing Law" },
  ];

  return (
    <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-background selection:bg-brand selection:text-white transition-colors duration-500">
      <Particles className="absolute inset-0 z-0 pointer-events-none opacity-20" count={100} />

      {/* ─── Hero Header ────────────────────────────────────────────── */}
      <section className="relative mb-20 text-center">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-[10px] font-black text-brand uppercase tracking-widest">
               <Gavel className="w-4 h-4" />
               <span>Legal Framework</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-gray-950 dark:text-gray-100 leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>
               Terms of <br/><span className="text-brand">Service.</span>
             </h1>
             <div className="flex items-center justify-center gap-6 pt-4">
                <div className="text-left border-l-2 border-brand/20 pl-6">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Effective Date</p>
                   <p className="text-sm font-bold text-gray-950 dark:text-white">January 30, 2026</p>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-white/10" />
                <p className="text-sm font-medium text-gray-500 max-w-[280px]">By using the NoKasa Platform, you agree to follow these legal binding conditions.</p>
             </div>
          </motion.div>
        </Container>
      </section>

      <Container>
        <div className="grid lg:grid-cols-[300px_1fr] gap-20">
          {/* ─── Sticky Table of Contents ─────────────────────────────── */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-32 space-y-10">
               <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-4">Quick Navigation</h4>
                  <nav className="flex flex-col gap-1">
                    {sections.map((section) => (
                      <a 
                        key={section.id} 
                        href={`#${section.id}`}
                        className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-[11px] font-black text-gray-500 dark:text-gray-400 hover:text-brand"
                      >
                        <span className="truncate">{section.label}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                      </a>
                    ))}
                  </nav>
               </div>

               <div className="p-8 rounded-[2.5rem] bg-gray-950 text-white space-y-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Scale className="w-8 h-8 text-brand relative z-10" />
                  <div className="space-y-2 relative z-10">
                     <h5 className="font-black text-sm uppercase tracking-widest text-white">Compliance First</h5>
                     <p className="text-xs text-white/60 font-medium leading-relaxed">We operate strictly on a principal-to-principal basis in accordance with Indian law.</p>
                  </div>
               </div>
            </div>
          </aside>

          {/* ─── Main Content ────────────────────────────────────────── */}
          <div className="space-y-24">
             {/* General Introduction */}
             <div className="p-12 md:p-16 rounded-[4rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-4xl text-gray-600 dark:text-gray-400 font-medium leading-[1.8] space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <FileText className="w-48 h-48" />
                </div>
                <p className="text-xl font-black text-gray-950 dark:text-gray-100 italic leading-snug">"Thank you for using NoKasa."</p>
                <p>
                  These Terms and Conditions govern the access to and use of the website www.nokasa.co, mobile applications, smart bins, collection systems, logistics infrastructure, and all related digital and physical services (collectively, the "<b>Platform</b>") operated by NoKasa Technologies Private Limited.
                </p>
                <div className="p-8 rounded-3xl bg-brand/5 border border-brand/10 space-y-4">
                   <p className="text-sm">
                      By accessing, using, scheduling a pickup, depositing items, segregating, recycling, selling, transferring, or purchasing used clothing through the Platform, you ("<b>User</b>") agree to be legally bound by these Terms, which constitute a valid and enforceable contract under the <b>Indian Contract Act, 1872</b>.
                   </p>
                </div>
             </div>

             {/* Section 1: Acceptance */}
             <section id="acceptance" className="scroll-mt-32 space-y-8">
                <div className="space-y-4">
                   <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-gray-100 italic">1. ACCEPTANCE OF TERMS</h2>
                   <div className="h-1 w-20 bg-brand rounded-full" />
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium leading-[1.8] space-y-6">
                   <p>Your use/ access of the NoKasa Platform shall be governed by these Terms and the Privacy Policy. By accessing the NoKasa Platform, you agree to be bound by the Terms including any additional terms and conditions and policies referenced herein.</p>
                   <p className="p-6 border-l-4 border-brand bg-gray-50 dark:bg-white/5 italic text-sm font-bold">"You may not access the NoKasa Platform and use the Services if you do not accept the Terms or are unable to be bound by the Terms/ the Privacy Policy."</p>
                </div>
             </section>

             {/* Section 2: Overview */}
             <section id="overview" className="scroll-mt-32 space-y-8">
                <div className="space-y-4">
                   <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-gray-100 italic">2. SERVICES OVERVIEW</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                   {[
                     { t: "Circular Economy", d: "NoKasa operates as an independent textile aggregation, purchase, grading, resale, and circular-economy platform." },
                     { t: "Principal Basis", d: "The Company acts solely on a principal-to-principal basis and does not function as an agent or trustee." },
                     { t: "Marketplace", d: "Provides a marketplace platform for users/consumers to transact with third-party sellers/service providers." },
                     { t: "Third Party disclaimers", d: "NoKasa is not a party to any transaction between you and Third Party Sellers." }
                   ].map((item, i) => (
                     <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-sm group hover:scale-[1.02] transition-all">
                        <CheckCircle2 className="w-5 h-5 text-brand mb-4" />
                        <h4 className="font-black text-gray-950 dark:text-gray-100 mb-2 uppercase text-xs tracking-widest">{item.t}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{item.d}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Section 3 & 4: Eligibility & Ownership */}
             <div className="grid md:grid-cols-2 gap-12">
                <section id="eligibility" className="scroll-mt-32 space-y-6">
                   <h2 className="text-2xl font-black text-gray-950 dark:text-gray-100">3. ELIGIBILITY</h2>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Use of the Platform is permitted only to persons competent to contract under Indian law. By using the Platform, the User represents that they are at least eighteen (18) years of age.</p>
                </section>
                <section id="ownership" className="scroll-mt-32 space-y-6">
                   <h2 className="text-2xl font-black text-gray-950 dark:text-gray-100">4. TRANSFER OF OWNERSHIP</h2>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Ownership shall stand transferred absolutely and unconditionally to the Company upon physical acceptance, recording, or weighing of the Clothes by NoKasa or its authorised agents.</p>
                </section>
             </div>

             {/* Section 5: User Warranties */}
             <section id="warranties" className="scroll-mt-32 space-y-10">
                <div className="p-10 md:p-16 rounded-[4rem] bg-gray-950 text-white relative overflow-hidden">
                   <div className="relative z-10 space-y-10">
                      <h2 className="text-4xl font-black italic text-white">User Warranties & Representations</h2>
                      <div className="grid sm:grid-cols-2 gap-10">
                         {[
                           "Lawful owner of Clothes handed over",
                           "Clothes are not stolen or counterfeit",
                           "No infringement of third party rights",
                           "Free from hazardous chemicals & biowaste"
                         ].map((w, i) => (
                           <div key={i} className="flex gap-4 items-start">
                              <div className="w-6 h-6 rounded-full border border-brand/50 flex items-center justify-center shrink-0">
                                 <div className="w-2 h-2 rounded-full bg-brand" />
                              </div>
                              <span className="text-sm font-bold text-gray-200">{w}</span>
                           </div>
                         ))}
                      </div>
                      <p className="text-xs text-gray-500 italic">NoKasa reserves the right to reject, quarantine, or destroy any contaminated or unsuitable Clothes without compensation.</p>
                   </div>
                   <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full -mr-1/4 -mb-1/4" />
                </div>
             </section>

             {/* Section 6: Smart Bins */}
             <section id="access" className="scroll-mt-32 space-y-8">
                <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-gray-100 italic">6. SMART BINS & ACCESS</h2>
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-12 items-center">
                   <div className="space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-widest text-brand">Host Responsibilities</h4>
                      <ul className="space-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                         <li>• Provide safe and reasonable access points</li>
                         <li>• No tampering, relocating, or interference</li>
                         <li>• Prompt reporting of malfunctions</li>
                      </ul>
                   </div>
                   <div className="hidden md:block w-px h-24 bg-gray-200 dark:bg-white/10" />
                   <div className="space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-widest text-brand">Company Rights</h4>
                      <ul className="space-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                         <li>• Bins remain exclusive Company property</li>
                         <li>• Discretionary removal or relocation</li>
                         <li>• Service suspension for safety/ops reasons</li>
                      </ul>
                   </div>
                </div>
             </section>

             {/* Sections 7, 8, 9 & 10 (Consolidated Visual) */}
             <section id="valuation" className="scroll-mt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 rounded-[3rem] bg-gray-100 dark:bg-white/5 overflow-hidden border border-gray-100 dark:border-white/5">
                   <div className="bg-white dark:bg-card p-12 space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Section 7: Valuations</h3>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Determination of weight and value by NoKasa personnel using internal systems is final and binding.</p>
                   </div>
                   <div className="bg-white dark:bg-card p-12 space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Section 8: Grading</h3>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Clothes may be sold, donated, upcycled, or recycled at the sole discretion of the Company.</p>
                   </div>
                   <div className="bg-white dark:bg-card p-12 space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Section 9: B2B Sales</h3>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-400 italic">All items supplied to Vendors are on an "AS IS, WHERE IS" basis, without any warranties.</p>
                   </div>
                   <div className="bg-white dark:bg-card p-12 space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Section 10 & 11: Compliance</h3>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Vendors must comply with all GST, environmental, and consumer protection laws (e.g. Rule 32(5) CGST).</p>
                   </div>
                </div>
             </section>

             {/* Marketplace & Delivery */}
             <section id="marketplace" className="scroll-mt-32 p-12 rounded-[4rem] bg-brand/5 border border-brand/10 space-y-8">
                <div className="flex items-center gap-4 text-brand">
                   <Scale className="w-8 h-8" />
                   <h2 className="text-2xl font-black italic">Marketplace & Delivery Fulfillment</h2>
                </div>
                <div className="space-y-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                   <p><b>Delivery Partners:</b> Facilitated through independent contractors on a principal-to-principal basis. NoKasa is NOT liable for the act(s)/omissions of delivery partners.</p>
                   <p><b>Order Cancellation:</b> Permitted subject to NoKasa's acceptance. Refunds may be provided in the form of promo codes or coupons for future transactions.</p>
                   <p><b>Returns:</b> Products are non-returnable unless expressly permitted by specific product policies.</p>
                </div>
             </section>

             {/* Section 13-19 (Consolidated Legal Blocks) */}
             <section id="intellectual" className="scroll-mt-32 space-y-20">
                <div className="space-y-8">
                   <h3 className="text-2xl font-black text-gray-950 dark:text-gray-100">Intellectual Property & Licensing</h3>
                   <div className="p-10 rounded-[3rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 space-y-6">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">NoKasa grants a personal, limited, non-exclusive license to access the Platform. Reproduction, modification, or commercial exploitation without prior written consent is strictly prohibited.</p>
                      <ul className="grid sm:grid-cols-2 gap-4">
                         {[
                           "No automated data extraction (bots/caching)",
                           "No framing of proprietary logos or assets",
                           "User comments become NoKasa property",
                           "Feedback grants perpetual license to NoKasa"
                         ].map((rule, i) => (
                           <li key={i} className="text-[11px] font-black uppercase tracking-widest text-brand-light flex items-center gap-3">
                              <Info className="w-3 h-3" />
                              {rule}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>
             </section>

             {/* Grievance Redressal */}
             <section id="grievance" className="scroll-mt-32 space-y-10">
                <div className="flex border-b border-gray-100 dark:border-white/10 pb-8 items-end gap-6">
                   <h2 className="text-3xl md:text-4xl font-black italic text-gray-950 dark:text-gray-100 uppercase tracking-tighter">Grievance Redressal</h2>
                   <div className="h-px grow bg-gray-100 dark:bg-white/10 mb-4" />
                </div>
                <div className="p-10 md:p-16 rounded-[4rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-2xl space-y-12">
                   <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                           <Mail className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-black italic">Grievance Officer</h4>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-brand uppercase tracking-widest">Mr. Prasad</p>
                           <a href="mailto:Prasad.lingawar@gmail.com" className="text-base font-bold text-gray-500 hover:text-brand transition-all block">Prasad.lingawar@gmail.com</a>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                           <MapPin className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-black italic">Registered Office</h4>
                        <address className="not-italic text-sm text-gray-500 font-medium leading-relaxed">
                          G2, G Floor, Vaishanavi Apt 474, 33rd Cross,<br/>
                          8th Main, Madhavan Park, Bangalore,<br/>
                          Karnataka, India - 560011
                        </address>
                      </div>
                   </div>
                   <div className="p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-500/5 border border-yellow-200 dark:border-yellow-500/20 flex gap-4">
                      <ShieldAlert className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-yellow-800 dark:text-yellow-500"><b>Fraud Caution:</b> NoKasa does not solicit confidential information such as OTP/CVV/PIN through call or mail. Report suspicious activities to info@Nokasa.co.</p>
                   </div>
                </div>
             </section>

             {/* Indemnity & Liability */}
             <section id="indemnity" className="scroll-mt-32 space-y-12">
                <div className="space-y-4">
                   <h2 className="text-3xl font-black italic text-gray-950 dark:text-gray-100 uppercase tracking-tighter">Indemnity & Limitation of Liability</h2>
                   <p className="text-sm text-gray-500 italic max-w-2xl">Terms regarding legal defense and financial limitations of the NoKasa platform.</p>
                </div>
                <div className="space-y-8">
                   <div className="p-10 rounded-[3rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm leading-relaxed space-y-6">
                      <p><b>Indemnity:</b> You agree to indemnify and hold harmless the NoKasa Parties from any third-party claims arising from misrepresentation, breach of warranties, or contamination caused by clothes supplied by you.</p>
                      <p><b>Limitations:</b> Liability of the NoKasa Parties shall not extend beyond the refund of the money charged for the relevant order. No liability exists for indirect, special, or consequential losses.</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-light">Time Limit: Legal actions must commence within 1 year of the alleged harm.</p>
                   </div>
                </div>
             </section>

             {/* Governing Law */}
             <section id="legal" className="scroll-mt-32 space-y-10">
                <div className="bg-gray-950 p-16 rounded-[4rem] text-white space-y-12 relative overflow-hidden">
                   <div className="relative z-10 space-y-8">
                      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Governing Law</h2>
                      <div className="flex gap-10 items-center">
                         <div className="text-left">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-2">Jurisdiction</h4>
                            <p className="text-2xl font-black italic text-white">Bengaluru, India</p>
                         </div>
                         <div className="w-px h-12 bg-white/10" />
                         <div className="text-left">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand mb-2">Dispute Resolution</h4>
                            <p className="text-2xl font-black italic text-white">Arbitration (1996 Act)</p>
                         </div>
                      </div>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-2xl">These Terms shall be interpreted under the laws of India. Any disputes will be resolved via a sole arbitrator in the city of Bengaluru.</p>
                   </div>
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full -mr-1/4 -mt-1/4" />
                </div>
                
                <div className="text-center pt-20">
                   <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-10 h-10 text-brand" />
                   </div>
                   <h4 className="text-xl font-black text-gray-950 dark:text-gray-100 italic mb-2">Entire Agreement</h4>
                   <p className="text-sm text-gray-500 font-medium">The Terms, together with the Privacy Policy, constitute the entire agreement between you and NoKasa.</p>
                </div>
             </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
