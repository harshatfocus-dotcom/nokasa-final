import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoKasa — Responsible Clothing Recycling",
  description:
    "NoKasa helps you responsibly recycle clothes, earn rewards, and reduce textile waste — all with a simple doorstep pickup.",
  keywords: ["clothing recycling", "wardrobe declutter", "textile waste", "sustainable fashion", "India"],
  openGraph: {
    title: "NoKasa — Responsible Clothing Recycling",
    description:
      "Schedule a clothing pickup in under 30 seconds. Earn rewards and help reduce India's textile waste.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
