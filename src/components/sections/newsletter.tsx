"use client";

import { Button } from "@/components/ui/button";

export const Newsletter = () => {
  return (
    <section className="py-24 ambient-glow">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 md:p-16 text-center shadow-[0_0_50px_rgba(124,58,237,0.15)] overflow-hidden relative">
          <div className="relative z-10 animate-fade-in-up">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-bold uppercase tracking-wider mb-6">
              [ خبرنامه ]
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              به‌روز بمانید
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
              به خبرنامه ما بپیوندید تا آخرین نکات سفر، محصولات جدید و داستان‌های گیلان را در ایمیل خود دریافت کنید.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="ایمیل شما را وارد کنید"
                className="flex-1 px-6 py-4 rounded-full border border-white/20 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              />
              <Button size="lg" className="whitespace-nowrap">
                اشتراک
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;