"use client";

import Link from "next/link";
import Image from "next/image";
import heroImage from "../../../dark-jungle-with-sky-stars.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ambient-glow">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/85"></div>
        <Image
          src={heroImage}
          alt="Dark jungle with sky stars"
          className="w-full h-full object-cover opacity-80"
          style={{ filter: "brightness(0.5)" }}
          fill
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
          [ کشف گیلان ]
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          به <span className="text-violet-400">گیلان</span>، شهر خاطرات خوب<br />
          <span className="block mt-4 text-[16px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-medium text-violet-400 leading-relaxed">خوش آمدید</span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Link
            href="#places"
            className="px-8 py-3 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300 active:scale-95 text-base"
          >
            کشف مکان‌ها
          </Link>
          <Link
            href="#shops"
            className="px-8 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 active:scale-95 text-base border border-white/10"
          >
            فروشگاه‌های محلی
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;