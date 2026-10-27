"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { places } from "@/data/places";

export const Places = () => {
  return (
    <section id="places" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            [ مکان‌ها ]
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            مکان‌های پیشنهادی برای دیدار
          </h2>
          <p className="text-slate-400 text-lg">
            زیباترین مقاصد گیلان را کشف کنید
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place) => (
            <Card
              key={place.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${places.indexOf(place) * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Link href={`/blogs/place-${place.id}`} aria-label={`راهنمای بازدید از ${place.name}`} className="absolute inset-0">
                <Image
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={places.indexOf(place) === 0}
                />
                </Link>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-semibold backdrop-blur-sm">
                    {place.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">{place.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <Link href={`/blogs/place-${place.id}`} className="group-hover:text-violet-400 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2">{place.name}</h3>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {place.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{place.location}</span>
                  <Link
                    href={`/blogs/place-${place.id}`}
                    className="text-violet-400 font-medium hover:underline"
                  >
                    بیشتر ببینید →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/#blogs" className="text-violet-400 font-medium hover:underline">
            مشاهده همه مقاصد →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Places;
