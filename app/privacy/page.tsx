"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Particles } from "@/components/ui/particles";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  RefreshCcw, 
  Mail, 
  MapPin, 
  ChevronRight,
  Info
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    { id: "collect", label: "1. WHAT INFORMATION DO WE COLLECT?" },
    { id: "process", label: "2. HOW DO WE PROCESS YOUR INFORMATION?" },
    { id: "share", label: "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?" },
    { id: "cookies", label: "4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?" },
    { id: "keep", label: "5. HOW LONG DO WE KEEP YOUR INFORMATION?" },
    { id: "safe", label: "6. HOW DO WE KEEP YOUR INFORMATION SAFE?" },
    { id: "minors", label: "7. DO WE COLLECT INFORMATION FROM MINORS?" },
    { id: "rights", label: "8. WHAT ARE YOUR PRIVACY RIGHTS?" },
    { id: "dnt", label: "9. CONTROLS FOR DO-NOT-TRACK FEATURES" },
    { id: "updates", label: "10. DO WE MAKE UPDATES TO THIS NOTICE?" },
    { id: "contact", label: "11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" },
    { id: "review", label: "12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?" },
  ];

  return (
    <main className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-background selection:bg-brand selection:text-white">
      <Particles className="absolute inset-0 z-0 pointer-events-none opacity-20" count={100} />

      {/* ─── Hero Header ────────────────────────────────────────────── */}
      <section className="relative mb-20">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-[10px] font-black text-brand uppercase tracking-widest">
               <ShieldCheck className="w-4 h-4" />
               <span>Trust & Safety</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-gray-950 dark:text-gray-100 leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>
               Privacy <br/><span className="text-brand">Policy.</span>
             </h1>
             <div className="flex items-center justify-center gap-6 pt-4">
                <div className="text-left border-l-2 border-brand/20 pl-6">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Version 1.0</p>
                   <p className="text-sm font-bold text-gray-950 dark:text-white">Last updated August 16, 2024</p>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-white/10" />
                <p className="text-sm font-medium text-gray-500 max-w-[240px]">This notice describes how NoKasa Technologies Private Limited protects your information.</p>
             </div>
          </motion.div>
        </Container>
      </section>

      <Container>
        <div className="grid lg:grid-cols-[280px_1fr] gap-20">
          {/* ─── Sticky Table of Contents ─────────────────────────────── */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-32 space-y-10">
               <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-4">Table of Contents</h4>
                  <nav className="flex flex-col gap-2">
                    {sections.map((section) => (
                      <a 
                        key={section.id} 
                        href={`#${section.id}`}
                        className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-xs font-black text-gray-500 dark:text-gray-400 hover:text-brand"
                      >
                        <div className="w-2 h-2 rounded-full bg-brand/20 group-hover:bg-brand transition-colors" />
                        {section.label.split(". ")[1]}
                      </a>
                    ))}
                  </nav>
               </div>

               <div className="p-8 rounded-[2rem] bg-brand text-white space-y-4 shadow-xl shadow-brand/20">
                  <Mail className="w-6 h-6" />
                  <h5 className="font-black text-sm">Need help?</h5>
                  <p className="text-xs text-white/70 font-medium leading-relaxed">If you have any questions or concerns, please contact us at info@nokasa.co.</p>
                  <a href="mailto:info@nokasa.co" className="block w-full py-4 bg-white text-gray-950 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:scale-[1.02] transition-transform">Email Us</a>
               </div>
            </div>
          </aside>

          {/* ─── Main Content ────────────────────────────────────────── */}
          <div className="space-y-24">
             {/* General Notice */}
             <div className="p-12 md:p-16 rounded-[4rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-3xl text-gray-600 dark:text-gray-400 font-medium leading-[1.8] space-y-8">
                <p>
                  This privacy notice for NoKasa Technologies Private Limited ("<b>we</b>," "<b>us</b>," or "<b>our</b>"), describes how and why we might collect, store, use, and/or share ("<b>process</b>") your information when you use our services ("<b>Services</b>"), such as when you:
                </p>
                <ul className="space-y-4 list-none pl-4">
                   {[
                     "Visit our website at https://nokasa.co, or any website of ours that links to this privacy notice",
                     "Engage with us in other related ways, including any sales, marketing, or events"
                   ].map((item, i) => (
                     <li key={i} className="flex gap-4 items-start translate-x-2">
                        <ChevronRight className="w-4 h-4 text-brand mt-1 shrink-0" />
                        {item}
                     </li>
                   ))}
                </ul>
                <p>Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at info@nokasa.co.</p>
             </div>

             {/* Summary of Key Points */}
             <div className="space-y-10">
                <div className="flex items-end gap-6 mb-8">
                   <h2 className="text-4xl font-black text-gray-950 dark:text-gray-100" style={{ fontFamily: "var(--font-display)" }}>Summary of Key Points</h2>
                   <div className="h-px grow bg-gray-100 dark:bg-white/10 mb-4" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   {[
                     { q: "What personal information do we process?", a: "When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.", icon: <Eye /> },
                     { q: "Do we process any sensitive personal information?", a: "We do not process sensitive personal information.", icon: <ShieldCheck /> },
                     { q: "Do we collect any information from third parties?", a: "We do not collect any information from third parties.", icon: <RefreshCcw /> },
                     { q: "How do we process your information?", a: "We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.", icon: <Lock /> },
                   ].map((item, i) => (
                     <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-brand mb-6 group-hover:scale-110 transition-transform">
                           {item.icon}
                        </div>
                        <h4 className="text-sm font-black text-gray-950 dark:text-gray-100 mb-2">{item.q}</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.a}</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* Detailed Sections */}
             {[
               { id: "collect", title: "1. WHAT INFORMATION DO WE COLLECT?", inShort: "We collect personal information that you provide to us.", content: (
                  <div className="space-y-10">
                     <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                     
                     <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-6">
                        <h4 className="text-sm font-black text-gray-950 dark:text-gray-100 flex items-center gap-3">
                           <Info className="w-4 h-4 text-brand" />
                           Personal Information Provided by You
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           {["Names", "Phone numbers", "Email addresses", "Job titles", "Contact preferences", "Authentication data", "Billing addresses"].map(t => (
                             <div key={t} className="px-4 py-2 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{t}</div>
                           ))}
                        </div>
                        <p className="text-sm"><b>Sensitive Information:</b> We do not process sensitive information. All personal information that you provide to us must be true, complete, and accurate.</p>
                     </div>

                     <div className="space-y-6">
                        <h4 className="text-2xl font-black text-gray-950 dark:text-gray-100">Information automatically collected</h4>
                        <div className="p-8 rounded-[3rem] bg-white dark:bg-card border border-brand/5 dark:border-brand/10 shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8 opacity-5">
                              <RefreshCcw className="w-32 h-32 rotate-12" />
                           </div>
                           <p className="relative z-10 text-sm italic mb-6">In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>
                           <p className="relative z-10 text-sm">Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. This includes device information, browser type, and settings and information about your activity in the Services.</p>
                        </div>
                     </div>
                  </div>
               )},
               { id: "process", title: "2. HOW DO WE PROCESS YOUR INFORMATION?", inShort: "We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.", content: (
                  <div className="space-y-8">
                     <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                     <ul className="space-y-6">
                        {[
                          { t: "To respond to user inquiries/offer support to users.", d: "We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service." },
                          { t: "To evaluate and improve our Services, products, marketing, and your experience.", d: "We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns." },
                          { t: "To identify usage trends.", d: "We may process information about how you use our Services to better understand how they are being used so we can improve them." },
                        ].map((item, i) => (
                          <li key={i} className="flex gap-6 items-start">
                             <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0 text-xs font-black">{i+1}</div>
                             <div>
                                <h5 className="font-black text-gray-950 dark:text-gray-100 mb-1">{item.t}</h5>
                                <p className="text-sm">{item.d}</p>
                             </div>
                          </li>
                        ))}
                     </ul>
                  </div>
               )},
               { id: "share", title: "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?", inShort: "We may share information in specific situations described in this section and/or with the following categories of third parties.", content: (
                  <div className="space-y-8 text-sm">
                     <p><b>Vendors, Consultants, and Other Third-Party Service Providers:</b> We may share your data with third-party vendors, service providers, contractors, or agents ("third parties") who perform services for us or on our behalf.</p>
                     <div className="grid grid-cols-2 gap-4">
                        {["Social Networks", "Performance Monitoring Tools", "Product Engineering & Design Tools", "Sales & Marketing Tools"].map(v => (
                          <div key={v} className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-100 dark:border-white/5 flex items-center justify-between group">
                             <span className="font-black italic">{v}</span>
                             <ChevronRight className="w-4 h-4 text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                     </div>
                     <p><b>Business Transfers:</b> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>
                  </div>
               )},
               { id: "cookies", title: "4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?", inShort: "We may use cookies and other tracking technologies to collect and store your information.", content: (
                  <div className="space-y-6">
                     <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
                     
                     <div className="p-10 rounded-[4rem] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-6">
                        <div className="flex items-center gap-4">
                           <Image src="/favicon.ico" alt="Google" width={24} height={24} />
                           <h4 className="text-xl font-black text-gray-950 dark:text-gray-100">Google Analytics</h4>
                        </div>
                        <p className="text-base font-medium">We may share your information with Google Analytics to track and analyze the use of the Services.</p>
                        <p className="text-xs text-gray-400 font-medium">To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout.</p>
                     </div>
                  </div>
               )},
               { id: "keep", title: "5. HOW LONG DO WE KEEP YOUR INFORMATION?", inShort: "We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.", content: (
                  <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information.</p>
               )},
               { id: "safe", title: "6. HOW DO WE KEEP YOUR INFORMATION SAFE?", inShort: "We aim to protect your personal information through a system of organizational and technical security measures.", content: (
                  <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
               )},
               { id: "minors", title: "7. DO WE COLLECT INFORMATION FROM MINORS?", inShort: "We do not knowingly collect data from or market to children under 18 years of age.", content: (
                  <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor.</p>
               )},
               { id: "rights", title: "8. WHAT ARE YOUR PRIVACY RIGHTS?", inShort: "You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.", content: (
                  <p><b>Withdrawing your consent:</b> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time.</p>
               )},
               { id: "dnt", title: "9. CONTROLS FOR DO-NOT-TRACK FEATURES", content: (
                  <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized.</p>
               )},
               { id: "updates", title: "10. DO WE MAKE UPDATES TO THIS NOTICE?", inShort: "Yes, we will update this notice as necessary to stay compliant with relevant laws.", content: (
                  <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this privacy notice. If we make material changes, we may notify you either by prominently posting a notice or by direct notification.</p>
               )},
               { id: "contact", title: "11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?", content: (
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="p-10 rounded-[3rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 space-y-4">
                        <Mail className="w-8 h-8 text-brand" />
                        <h4 className="text-xl font-black text-gray-950 dark:text-gray-100 italic">Email Us</h4>
                        <a href="mailto:info@nokasa.co" className="text-gray-400 font-black hover:text-brand transition-colors">info@nokasa.co</a>
                     </div>
                     <div className="p-10 rounded-[3rem] bg-white dark:bg-card border border-gray-100 dark:border-white/5 space-y-4">
                        <MapPin className="w-8 h-8 text-brand" />
                        <h4 className="text-xl font-black text-gray-950 dark:text-gray-100 italic">Visit Us</h4>
                        <address className="not-italic text-sm text-gray-400 font-medium leading-relaxed">
                          NoKasa Technologies Private Limited<br/>
                          G2, Vishanavi Apartments, 33rd cross,<br/>
                          8th B Main, 4th Block, Jayanagar<br/>
                          Bengaluru 560011, India
                        </address>
                     </div>
                  </div>
               )},
               { id: "review", title: "12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?", content: (
                  <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please fill out and submit a <a href="#" className="text-brand font-black underline">data subject access request</a>.</p>
               )},
             ].map((section, idx) => (
                <section key={section.id} id={section.id} className="scroll-mt-32 space-y-8">
                   <div className="space-y-4">
                      <h2 className="text-2xl md:text-3xl font-black text-gray-950 dark:text-gray-100 leading-tight">
                        {section.title}
                      </h2>
                      {section.inShort && (
                        <p className="text-xs font-black uppercase tracking-widest text-brand inline-block px-3 py-1 rounded-lg bg-brand/5 border border-brand/10">In Short: {section.inShort}</p>
                      )}
                   </div>
                   <div className="text-gray-600 dark:text-gray-400 font-medium leading-[1.8] text-base space-y-6">
                      {section.content}
                   </div>
                   {idx < sections.length - 1 && <div className="h-px w-full bg-gray-100 dark:bg-white/10 mt-16" />}
                </section>
             ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
