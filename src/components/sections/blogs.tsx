"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { blogs } from "@/data/blogs";

export const Blogs = () => {
  return (
    <section id="blogs" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            [ وبلاگ ]
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            داستان‌های گیلان
          </h2>
          <p className="text-slate-400 text-lg">
            مطالعه درباره فرهنگ، غذا و سفر در گیلان
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${blogs.indexOf(blog) * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Link href={`/blogs/${blog.id}`} aria-label={blog.title} className="absolute inset-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                </Link>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-300 text-[10px] font-bold uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <span className="text-xs text-slate-500">{blog.date}</span>
                </div>
                <Link href={`/blogs/${blog.id}`} className="block group-hover:text-violet-400 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3">{blog.title}</h3>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white">
                      توسط {blog.author}
                    </span>
                    <span className="text-xs text-slate-500">
                      • {blog.readTime}
                    </span>
                  </div>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-xs font-medium text-violet-400 hover:underline"
                  >
                    خواندن بیشتر →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/#blogs" className="text-violet-400 font-medium hover:underline">
            خواندن همه مقالات →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
