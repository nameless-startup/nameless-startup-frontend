import type { Metadata } from "next";
import { Peyda } from "@/fonts/peyda";
import "./globals.css";
import Navbar from "@/components/sections/navbar";

export const metadata: Metadata = {
  title: "گلانه - راهنمای سفر گیلان، ایران",
  description: "راهنمای شما برای کشف استان زیبا گیلان، ایران. مکان‌ها، فروشگاه‌ها، محصولات و داستان‌ها.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <body className={`${Peyda.className} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}