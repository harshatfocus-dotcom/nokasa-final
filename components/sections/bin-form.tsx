"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export function BinForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    pincode: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ firstName: "", lastName: "", phone: "", email: "", city: "", pincode: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "bg-card border border-gray-300 dark:border-white/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors";

  return (
    <section className="py-16 md:py-24 bg-transparent w-full block relative transition-colors duration-500" id="bin-form">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative h-[420px] md:h-[520px] rounded-[2.5rem] overflow-hidden hidden lg:block">
            <Image
              src="/images/hero-clothes.png"
              alt="Sorting clothes for pickup"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Right: Form */}
          <div>
            <div className="mb-10">
              <h2
                className="text-[32px] sm:text-[40px] md:text-[52px] text-foreground font-bold leading-[1.1] mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Have doubts?<br className="hidden md:block" /> Let&apos;s talk.
              </h2>
              <p className="text-muted-foreground text-[17px] leading-[1.6] tracking-tight">
                Share your details and we&apos;ll get back to you with answers.
              </p>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-10">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">Message sent!</h3>
                <p className="text-gray-500 text-[15px]">We&apos;ll get back to you at {form.email || "your email"} shortly.</p>
                <button onClick={() => setStatus("idle")} className="text-brand font-bold text-sm hover:underline">Send another message</button>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">First Name*</label>
                    <input name="firstName" type="text" required value={form.firstName} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Last Name</label>
                    <input name="lastName" type="text" value={form.lastName} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Phone*</label>
                    <input name="phone" type="tel" required value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Email*</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">City*</label>
                    <input name="city" type="text" required value={form.city} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Pincode*</label>
                    <input name="pincode" type="text" inputMode="numeric" maxLength={6} required value={form.pincode} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Message*</label>
                  <textarea name="message" rows={4} required value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again or email us at support@nokasa.co.</p>
                )}

                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-brand hover:bg-brand/90 disabled:opacity-60 text-white dark:text-gray-900 dark:font-black px-9 py-3.5 rounded-lg font-bold text-sm transition-colors w-max shadow-lg shadow-brand/10"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
