"use client";

import { useState, useSyncExternalStore } from "react";
import { Bookmark, Share2 } from "lucide-react";

function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("gilaneh-reading-list", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("gilaneh-reading-list", notify);
  };
}

export default function ArticleActions({ id, title }: { id: string; title: string }) {
  const [message, setMessage] = useState("");
  const saved = useSyncExternalStore(subscribe, () => {
    try { return localStorage.getItem(`saved-blog-${id}`) === "true"; } catch { return false; }
  }, () => false);

  function toggleSaved() {
    try {
      localStorage.setItem(`saved-blog-${id}`, String(!saved));
      window.dispatchEvent(new Event("gilaneh-reading-list"));
      setMessage(saved ? "مقاله از ذخیره‌ها حذف شد." : "مقاله در این مرورگر برای مطالعه بعدی ذخیره شد.");
    } catch { setMessage("ذخیره در این مرورگر امکان‌پذیر نیست."); }
  }

  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setMessage("پیوند مقاله کپی شد."); }
    } catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) setMessage("برای اشتراک‌گذاری، نشانی صفحه را کپی کنید."); }
  }

  return <div className="mt-5 rounded-2xl border border-white/10 p-5"><p className="mb-4 text-sm text-slate-400">این داستان را همراه داشته باشید</p><div className="flex gap-2"><button onClick={toggleSaved} aria-pressed={saved} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-3 text-sm text-violet-300 hover:bg-violet-500/20"><Bookmark size={17} fill={saved ? "currentColor" : "none"} />{saved ? "ذخیره شد" : "ذخیره مقاله"}</button><button onClick={share} aria-label="اشتراک‌گذاری مقاله" className="rounded-full border border-white/10 p-3 text-slate-300 hover:bg-white/10"><Share2 size={18} /></button></div><p role="status" className="mt-3 text-xs leading-6 text-violet-300">{message}</p></div>;
}
