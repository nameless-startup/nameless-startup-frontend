"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { shops } from "@/data/shops";

export const Shops = () => {
  return (
    <section id="shops" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            [ فروشگاه‌ها ]
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            فروشگاه‌ها و بازارهای محلی
          </h2>
          <p className="text-slate-400 text-lg">
            خرید محصولات اصلی از هنرمندان محلی گیلان
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shops.map((shop) => (
            <Card
              key={shop.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${shops.indexOf(shop) * 100}ms` }}
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-sm">{shop.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-400 text-sm mb-4">
                  {shop.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-300 text-[10px] font-bold uppercase">
                    {shop.category}
                  </span>
                  <span className="text-slate-500">{shop.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shops;