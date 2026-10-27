"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ChevronLeft, Heart, Minus, Plus, Share2, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/data/gilan";
import Footer from "@/components/sections/footer";

const number = new Intl.NumberFormat("fa-IR");
const price = (value: number) => `${number.format(value)} دلار`;
function subscribeToFavorites(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("gilaneh-favorites", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("gilaneh-favorites", notify);
  };
}

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [quantity, setQuantity] = useState(1);
  const saved = useSyncExternalStore(subscribeToFavorites, () => {
    try { return localStorage.getItem(`favorite-product-${product.id}`) === "true"; } catch { return false; }
  }, () => false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"description" | "details">("description");

  function toggleFavorite() {
    try {
      localStorage.setItem(`favorite-product-${product.id}`, String(!saved));
      window.dispatchEvent(new Event("gilaneh-favorites"));
      setMessage(saved ? "محصول از علاقه‌مندی‌ها حذف شد." : "محصول در علاقه‌مندی‌های این مرورگر ذخیره شد.");
    } catch { setMessage("ذخیره در این مرورگر امکان‌پذیر نیست."); }
  }

  function addToCart() {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem("gilaneh-cart") || "[]");
      const cart: { id: string; quantity: number }[] = Array.isArray(raw)
        ? raw.filter((item): item is { id: string; quantity: number } => !!item && typeof item.id === "string" && Number.isInteger(item.quantity) && item.quantity > 0)
        : [];
      const item = cart.find((entry) => entry.id === product.id);
      if (item) item.quantity += quantity;
      else cart.push({ id: product.id, quantity });
      localStorage.setItem("gilaneh-cart", JSON.stringify(cart));
      setMessage(`${number.format(quantity)} عدد به سبد محلی اضافه شد. پرداخت آنلاین هنوز فعال نیست.`);
    } catch { setMessage("ذخیره سبد در این مرورگر امکان‌پذیر نیست."); }
  }

  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: product.name, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setMessage("پیوند محصول کپی شد."); }
    } catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) setMessage("برای اشتراک‌گذاری، نشانی صفحه را کپی کنید."); }
  }

  return (
    <div className="relative min-h-screen pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-20 h-96 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.12),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="مسیر صفحه" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-violet-300">خانه</Link><ChevronLeft size={14} />
          <Link href="/#products" className="hover:text-violet-300">محصولات</Link><ChevronLeft size={14} />
          <span className="text-slate-200">{product.name}</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative aspect-square sm:aspect-[6/5]">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs backdrop-blur">منتخب گیلانه</span>
              <button onClick={toggleFavorite} aria-label={saved ? "حذف از علاقه‌مندی‌ها" : "ذخیره محصول"} aria-pressed={saved} className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 p-3 text-white backdrop-blur hover:bg-violet-600"><Heart size={20} fill={saved ? "currentColor" : "none"} /></button>
              <p className="absolute bottom-6 right-6 flex items-center gap-2 text-sm text-white/90"><Sparkles size={16} /> از گیلان، با عشق</p>
            </div>
          </div>

          <div className="py-2 lg:py-4">
            <span className="inline-block rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300">{product.category}</span>
            <h1 className="mt-5 text-3xl font-bold leading-relaxed sm:text-4xl">{product.name}</h1>
            <p className="mt-5 text-base leading-8 text-slate-400">{product.description}</p>
            <div className="my-8 flex items-center justify-between border-y border-white/10 py-6">
              <span className="text-sm text-slate-400">قیمت هر عدد</span>
              <span className="text-3xl font-bold text-violet-300">{price(product.price)}</span>
            </div>
            <div className="mb-5 flex items-center justify-between">
              <label className="text-sm text-slate-300" htmlFor="product-quantity">تعداد</label>
              <div className="flex items-center gap-4 rounded-full border border-white/15 bg-white/5 p-1.5">
                <button aria-label="افزایش تعداد" disabled={quantity >= 99} onClick={() => setQuantity(quantity + 1)} className="rounded-full p-2 hover:bg-white/10 disabled:opacity-30"><Plus size={16} /></button>
                <output id="product-quantity" className="min-w-6 text-center" aria-live="polite">{number.format(quantity)}</output>
                <button aria-label="کاهش تعداد" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className="rounded-full p-2 hover:bg-white/10 disabled:opacity-30"><Minus size={16} /></button>
              </div>
            </div>
            <div className="flex items-center justify-between pb-5 text-sm"><span className="text-slate-400">جمع مبلغ</span><strong>{price(product.price * quantity)}</strong></div>
            <div className="flex gap-3">
              <button onClick={addToCart} className="flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-violet-600 px-4 font-medium transition hover:bg-violet-500"><ShoppingBag size={19} /> افزودن به سبد خرید</button>
              <button onClick={share} aria-label="اشتراک‌گذاری محصول" className="rounded-full border border-white/15 p-4 hover:bg-white/10"><Share2 size={20} /></button>
            </div>
            <p role="status" className="mt-3 min-h-12 text-sm leading-6 text-violet-300">{message}</p>
            <p className="flex items-center gap-2 text-xs text-slate-500"><Check size={15} /> سبد و علاقه‌مندی‌ها در همین مرورگر ذخیره می‌شوند.</p>
          </div>
        </div>

        <section className="my-14 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8" aria-label="اطلاعات محصول">
          <div role="tablist" aria-label="جزئیات محصول" className="mb-6 flex gap-6 border-b border-white/10">
            {([ ["description", "درباره محصول"], ["details", "مشخصات"] ] as const).map(([key, label]) => <button key={key} id={`tab-${key}`} role="tab" aria-selected={tab === key} aria-controls={`panel-${key}`} onClick={() => setTab(key)} className={`border-b-2 pb-4 text-sm transition ${tab === key ? "border-violet-400 text-violet-300" : "border-transparent text-slate-400 hover:text-white"}`}>{label}</button>)}
          </div>
          <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === "description" ? <><h2 className="mb-3 text-xl font-bold">{product.name}</h2><p className="max-w-3xl leading-8 text-slate-400">{product.description}</p><p className="mt-4 text-sm leading-7 text-slate-500">این محصول بخشی از مجموعه محصولات گیلانه است. اطلاعات تکمیلی درباره تولیدکننده، موجودی و شرایط ارسال به‌زودی اضافه می‌شود.</p></> : <dl className="grid gap-4 sm:grid-cols-2">{[["کد محصول", `GL-${product.id.padStart(4, "0")}`], ["دسته‌بندی", product.category], ["نام محصول", product.name], ["قیمت واحد", price(product.price)]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 rounded-xl bg-white/5 p-4 text-sm"><dt className="text-slate-400">{label}</dt><dd>{value}</dd></div>)}</dl>}
          </div>
        </section>

        <section className="pb-20" aria-labelledby="related-products">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="mb-2 text-xs text-violet-400">کشف بیشتر</p><h2 id="related-products" className="text-2xl font-bold">محصولات دیگر گیلانه</h2></div><Link href="/#products" className="flex items-center gap-2 text-sm text-violet-300">همه محصولات <ArrowLeft size={16} /></Link></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <Link href={`/products/${item.id}`} key={item.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-violet-500/40"><div className="relative aspect-[4/3] overflow-hidden"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-5"><span className="text-xs text-violet-300">{item.category}</span><h3 className="mb-4 mt-2 font-bold group-hover:text-violet-300">{item.name}</h3><div className="flex justify-between text-sm"><span className="text-slate-400">مشاهده محصول</span><strong>{price(item.price)}</strong></div></div></Link>)}</div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
