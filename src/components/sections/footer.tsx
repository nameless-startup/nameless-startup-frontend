"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const links = {
    Explore: [
      { name: "مکان‌های پیشنهادی برای دیدار", href: "/#places" },
      { name: "فروشگاه‌های محلی", href: "/#shops" },
      { name: "محصولات", href: "/#products" },
      { name: "وبلاگ", href: "/#blogs" },
    ],
    About: [
      { name: "درباره گیلان", href: "/#about" },
      { name: "تماس با ما", href: "#" },
      { name: "سیاست حفظ حریم خصوصی", href: "#" },
      { name: "شرایط استفاده", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-white/10 bg-obsidian py-16 relative">
      <div className="absolute inset-0 ambient-glow"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                G
              </div>
              <span className="text-xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-300 to-purple-400">
                گیلانه
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              راهنمای شما برای کشف استان زیبا گیلان، ایران.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
              کشف
            </h4>
            <ul className="space-y-4">
              {links.Explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider">
              درباره
            </h4>
            <ul className="space-y-4">
              {links.About.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {year || 2026} راهنمای سفر گیلانه. کلیه حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.699 5.358 1.432 6.963-1.053-.049-2.073-.218-3.038-.505.961 1.599 2.683 2.733 4.814 2.795-1.318.721-2.966 1.05-4.664 1.05-.309 0-.615-.027-.922-.065.581 1.85 2.266 3.185 4.342 3.205-2.788 1.184-6.286 1.037-8.902-.535.366 1.15.644 2.378.76 4.616-2.467-.847-4.173-2.73-4.173-4.984 0-.841.153-1.639.38-2.404-.021.416-.073 1.116-.073 1.983 0 4.042 2.562 7.533 6.116 8.309-1.312.733-2.702 1.108-4.093 1.05a4.36 4.36 0 01-1.652-.25c1.522 4.856 7.428 8.237 12.788 8.122C20.516 23.123 24 19.901 24 14.421v-3.986c-4.443-.68-7.448-2.977-7.448-6.725 0-1.48.416-2.812 1.163-3.945" />
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.29-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
