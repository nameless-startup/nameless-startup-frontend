"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowLeft, Compass, MapPin, MoveUpLeft, Store, BookOpen, Sparkles } from "lucide-react";

const experiences = [
  { number: "۰۱", label: "جایی برای کشف کردن", detail: "از جنگل تا دریا", href: "#places", icon: Compass },
  { number: "۰۲", label: "تکه‌ای از زندگی محلی", detail: "بازارها و دست‌ساخته‌ها", href: "#shops", icon: Store },
  { number: "۰۳", label: "داستانی برای خواندن", detail: "گیلان از نگاه نزدیک", href: "#blogs", icon: BookOpen },
];

export default function Hero() {
  return (
    <section className="travel-hero" aria-labelledby="hero-title">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span /> به هوای یک حال خوب <span className="eyebrow-line" /></div>
          <h1 id="hero-title">بعضی سفرها،<br />از <span className="hero-heart">دل<span className="heart-underline" aria-hidden="true" /></span> شروع می‌شن.</h1>
          <p className="hero-description">میان عطر چای و مه جنگل، گیلان منتظر توست.<br className="hidden sm:block" /> جاهای تازه کشف کن، با زندگی محلی همراه شو و<br className="hidden xl:block" /> قصه‌ی سفر خودت رو بساز.</p>
          <div className="hero-actions">
            <Link href="#places" className="hero-primary">بزن بریم گیلان <ArrowLeft size={20} /></Link>
            <Link href="#blogs" className="hero-secondary">از گیلان بخوان <MoveUpLeft size={18} /></Link>
          </div>
          <div className="hero-note"><span className="note-icon"><MapPin size={16} /></span><span>مقصد، گیلان است؛ مسیرش را تو انتخاب کن.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <Image src="/images/places-3.jpg" alt="دره‌های سبز و کوه‌های مه‌آلود در نور غروب" fill sizes="(max-width: 767px) 100vw, 50vw" preload className="hero-landscape" />
            <div className="photo-shade" />
            <span className="photo-topline"><span className="photo-dot" /> کمی دورتر از روزمرگی</span>
            <div className="photo-caption"><span>نفس بکش. اینجا زندگی آرام‌تر است.</span><strong>به سمت سبزِ بی‌انتها</strong></div>
            <Link href="#places" className="photo-explore" aria-label="کشف مکان‌های دیدنی"><MoveUpLeft size={24} /></Link>
          </div>
          <div className="hero-postcard"><Sparkles size={22} /><div><strong>یک سفر، هزار کشف تازه</strong><span>برای لحظه‌هایی که می‌مانند</span></div></div>
          <span className="photo-coordinate" dir="ltr">GILAN, IRAN / 37° N · 49° E</span>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#about" className="hero-scroll"><span><ArrowDown size={18} /></span>کمی پایین‌تر، کمی نزدیک‌تر</a>
        <span className="hero-edition" dir="ltr">THE OTHER SIDE OF EVERYDAY</span>
      </div>
      <div className="experience-strip">
        {experiences.map(({number, label, detail, href, icon: Icon}) => <Link key={number} href={href} className="experience-link"><span className="experience-number">{number}</span><Icon size={23} strokeWidth={1.5} /><div><strong>{label}</strong><span>{detail}</span></div><MoveUpLeft size={19} className="experience-arrow" /></Link>)}
      </div>
    </section>
  );
}
