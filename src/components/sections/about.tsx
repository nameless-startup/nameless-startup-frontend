"use client";

import Image from "next/image";
import aboutImage from "../../../beautiful_milkyway_galaxy_starry_sky_above_ocean_waves_mountains_hd_nature.jpg";

const statIcons: Record<string, string> = {
  "اماکن تاریخی": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><path d="M1 12h18"></path></svg>`,
  سواحل: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s2-2 4-2 4 2 6-2 6 2 8-2 8 2 8 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path></svg>`,
  "محصولات محلی": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><polyline points="16 2 16 8 22 8"></polyline><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="11" x2="9" y2="17"></line></svg>`,
  "زیبایی طبیعی": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`,
};

export const About = () => {
  const stats = [
    { value: "۶۰۰+", label: "اماکن تاریخی" },
    { value: "۵۰۰ کیلومتر", label: "سواحل" },
    { value: "۱۰۰+", label: "محصولات محلی" },
    { value: "∞", label: "زیبایی طبیعی" },
  ];

  return (
    <section id="about" className="py-24 ambient-glow relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            [ درباره گیلان ]
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            چرا گیلان را ببینیم؟
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            گیلان، واقع در ساحل جنوبی دریای خزر، برای مناظر سبز، فرهنگ غنی و مهمان نوازی گرمجویش شناخته شده است.
            از کوه‌های مه‌آلود ماسوله تا آب‌های آرام لاگون انزلی، هر گوشه‌ای داستان دارد.
          </p>
        </div>

        {/* Stats grid — numbers fit cleanly inside cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="
                relative rounded-2xl
                border border-white/5
                bg-white/5
                p-5 sm:p-6
                text-center
                transition-all duration-300
                hover:bg-white/10
                hover:border-violet-500/30
                hover:-translate-y-1
                hover:shadow-[0_0_24px_rgba(124,58,237,0.12)]
                animate-fade-in-up
              "
              style={{ animationDelay: `${150 + i * 90}ms` }}
            >
              <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500 transition-colors duration-300">
                <span className="text-violet-400 group-hover:text-white" dangerouslySetInnerHTML={{ __html: statIcons[stat.label] }} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none group-hover:text-violet-400 transition-colors">
                {stat.value}
              </div>
              <div className="mt-2.5 text-sm font-medium text-slate-400 uppercase tracking-wider group-hover:text-violet-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Content + image */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="space-y-6">
              <p className="text-slate-400 text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                گیلان، واقع در ساحل جنوبی دریای خزر، برای مناظر سبز، فرهنگ غنی و مهمان نوازی گرمجویش شناخته شده است.
                از کوه‌های مه‌آلود ماسوله تا آب‌های آرام لاگون انزلی، هر گوشه‌ای داستان دارد.
              </p>
              <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                <span className="text-violet-300 text-sm font-medium">جنگل‌های سبز و روستاهای تاریخی</span>
              </div>
              <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                <span className="text-violet-300 text-sm font-medium">سواحل دریای خزر</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <Image
                src={aboutImage}
                alt="گیلان"
                className="absolute inset-0 w-full h-full object-cover"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-end p-6 z-10">
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">ساحل دریای خزر</h3>
                  <p className="text-white text-sm">آب و هوای معتدل، مزارع چای و غذاهای دریایی</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;