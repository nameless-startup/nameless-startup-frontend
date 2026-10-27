import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CalendarDays, ChevronLeft, Clock3, Quote } from "lucide-react";
import { blogs } from "@/data/blogs";
import { blogArticles } from "@/data/blog-articles";
import Footer from "@/components/sections/footer";
import ArticleActions from "@/components/blogs/article-actions";

export function generateStaticParams() {
  return blogs.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = blogs.find((item) => item.id === id);
  return {
    title: blog ? `${blog.title} | گیلانه` : "مقاله پیدا نشد | گیلانه",
    description: blog?.excerpt,
    ...(blog ? { openGraph: { type: "article", title: blog.title, description: blog.excerpt, images: [blog.image], authors: [blog.author] } } : {}),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = blogs.find((item) => item.id === id);
  const content = Object.hasOwn(blogArticles, id) ? blogArticles[id] : undefined;
  if (!blog || !content) notFound();

  return (
    <div className="relative min-h-screen pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-20 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.14),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="مسیر صفحه" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-violet-300">خانه</Link><ChevronLeft size={14} />
          <Link href="/#blogs" className="hover:text-violet-300">داستان‌های گیلان</Link><ChevronLeft size={14} />
          <span className="text-slate-200">{blog.category}</span>
        </nav>

        <article>
          <header className="mx-auto mb-10 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-xs text-violet-300"><BookOpen size={14} />{blog.category}</span>
            <h1 className="mt-6 text-3xl font-bold leading-[1.7] text-white sm:text-5xl sm:leading-[1.6]">{blog.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{blog.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-400 sm:text-sm">
              <span className="flex items-center gap-2"><span className="flex size-8 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/15 text-violet-300" aria-hidden="true">{blog.author.charAt(0)}</span>{blog.author}</span>
              <span className="flex items-center gap-2"><CalendarDays size={15} />{blog.date}</span>
              <span className="flex items-center gap-2"><Clock3 size={15} />{blog.readTime}</span>
            </div>
          </header>

          <figure className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative aspect-[4/3] sm:aspect-[21/9]"><Image src={blog.image} alt={blog.title} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" /></div>
            <figcaption className="px-5 py-3 text-xs text-slate-500">تصویر تزئینی · داستان‌های گیلانه</figcaption>
          </figure>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="min-w-0">
              <p className="mb-10 border-r-2 border-violet-500 pr-5 text-lg leading-10 text-slate-200">{content.introduction}</p>
              {content.sections.map((section) => <section key={section.id} id={section.id} className="mb-10 scroll-mt-28"><h2 className="mb-4 text-xl font-bold leading-9 sm:text-2xl">{section.title}</h2>{section.paragraphs.map((paragraph, index) => <p key={index} className="mb-4 text-base leading-9 text-slate-400 sm:text-lg sm:leading-10">{paragraph}</p>)}</section>)}
              <aside className="my-10 rounded-2xl border border-violet-500/20 bg-violet-500/[0.07] p-6 sm:p-8" aria-label="یادداشت سفر"><Quote className="mb-4 text-violet-400" size={26} /><h2 className="mb-3 text-lg font-bold text-violet-200">یادداشتی برای سفر بعدی</h2><p className="leading-9 text-slate-300">{content.takeaway}</p></aside>
              <div className="flex flex-wrap items-center gap-3 border-y border-white/10 py-5 text-sm"><span className="text-slate-500">برچسب‌ها</span>{["گیلان", blog.category, "سفر آرام"].map((tag) => <span key={tag} className="rounded-full bg-white/5 px-4 py-2 text-slate-300">{tag}</span>)}</div>
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xl text-violet-300" aria-hidden="true">{blog.author.charAt(0)}</span><div><p className="mb-1 text-xs text-slate-500">نویسنده این داستان</p><h2 className="font-bold">{blog.author}</h2><p className="mt-2 text-sm leading-7 text-slate-400">از مجموعه داستان‌های گیلانه؛ برای کشف فرهنگ، طعم‌ها و تجربه‌های سفر در گیلان.</p></div></div>
            </div>

            <aside className="row-start-1 lg:sticky lg:top-28 lg:col-start-2" aria-label="راهنمای مقاله">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h2 className="mb-5 flex items-center gap-2 font-bold"><BookOpen size={18} className="text-violet-400" />در این مقاله می‌خوانید</h2><nav aria-label="فهرست مقاله" className="flex flex-col gap-1">{content.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="rounded-lg px-3 py-2.5 text-sm leading-6 text-slate-400 transition hover:bg-violet-500/10 hover:text-violet-300">{section.title}</a>)}</nav></div>
              <ArticleActions id={blog.id} title={blog.title} />
              <Link href="/#places" className="mt-5 flex items-center justify-between rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5 text-sm text-violet-200">سفر بعدی را کشف کنید<ArrowLeft size={17} /></Link>
            </aside>
          </div>
        </article>

        <section className="pb-20 pt-20" aria-labelledby="more-stories"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="mb-2 text-xs text-violet-400">ادامه ماجرا</p><h2 id="more-stories" className="text-2xl font-bold">داستان‌های بیشتری بخوانید</h2></div><Link href="/#blogs" className="flex items-center gap-2 text-sm text-violet-300">همه مقالات<ArrowLeft size={16} /></Link></div><div className="grid gap-6 md:grid-cols-2">{blogs.filter((item) => item.id !== id).map((item) => <Link key={item.id} href={`/blogs/${item.id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-violet-500/40"><div className="relative aspect-[16/9] overflow-hidden"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-6"><span className="text-xs text-violet-300">{item.category}</span><h3 className="mb-3 mt-3 text-xl font-bold leading-8 group-hover:text-violet-300">{item.title}</h3><p className="text-sm leading-7 text-slate-400">{item.excerpt}</p><div className="mt-5 flex justify-between border-t border-white/10 pt-4 text-xs text-slate-500"><span>{item.author}</span><span>{item.readTime}</span></div></div></Link>)}</div></section>
      </div>
      <Footer />
    </div>
  );
}
