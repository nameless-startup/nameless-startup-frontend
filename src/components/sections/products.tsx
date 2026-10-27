"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { products } from "@/data/products";

export const Products = () => {
  return (
    <section id="products" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-fade-in-up">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider mb-4">
              [ محصولات ]
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              جدیدترین محصولات
            </h2>
            <p className="text-slate-400 text-lg">
              خزانه‌های دست‌ساز گیلان
            </p>
          </div>
          <Link href="/#products" className="text-violet-400 font-medium hover:underline">
            خرید همه →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${products.indexOf(product) * 100}ms` }}
            >
              <div className="h-64 overflow-hidden relative">
                <Link href={`/products/${product.id}`} aria-label={product.name} className="absolute inset-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                />
                </Link>
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button className="p-2 bg-white/10 backdrop-blur rounded-full text-violet-300 border border-white/10 hover:bg-white/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-white/10 backdrop-blur rounded-full text-violet-300 border border-white/10 hover:bg-white/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 31v-2a4 4 0 014-4h4a4 4 0 014 4v2M3 7l9-1 9 1M7 9l-1-1m7 7l1-1m-7 7l-1 1m7-7l1 1m7-7l-1-1m-7 7l1-1m7 7l-1-1m-7-7l1 1" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-300 text-[10px] font-bold uppercase">
                    {product.category}
                  </span>
                  <span className="font-bold text-white">${product.price}</span>
                </div>
                <Link href={`/products/${product.id}`} className="block group-hover:text-violet-400 transition-colors">
                  <h3 className="text-base font-bold text-white mb-2">{product.name}</h3>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
