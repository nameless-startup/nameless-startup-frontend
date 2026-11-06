"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, Menu, Trees, X, ShoppingBag } from "lucide-react";
import {useCart} from "@/hooks/useCommerce";
import "@/components/commerce/commerce.css";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

const AUTH_PAGES = ["/login", "/signup", "/forgot-password"];
const links = [{href:"/#places", label:"دیدنی‌های گیلان"}, {href:"/#shops", label:"فروشگاه‌های محلی"}, {href:"/#products", label:"سوغات گیلان"}, {href:"/#blogs", label:"مجله‌ی سفر"}];

export default function Navbar() {
  const pathname = usePathname();
  const {count}=useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    menuPanel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") { setIsOpen(false); menuButton.current?.focus(); }
    }
    function outside(event: PointerEvent) {
      if (!menuPanel.current?.contains(event.target as Node) && !menuButton.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", dismiss); document.removeEventListener("pointerdown", outside); };
  }, [isOpen]);

  if (AUTH_PAGES.includes(pathname) || (pathname.startsWith("/panel") || pathname.startsWith("/admin"))) return null;

  return (
    <header className="travel-header">
      <a href="#main-content" className="travel-skip">رفتن به محتوای اصلی</a>
      <nav className="travel-nav" aria-label="ناوبری اصلی">
        <Link href="/" className="travel-brand" aria-label="گیلانه، صفحه اصلی" onClick={() => setIsOpen(false)}><span className="brand-symbol"><Trees size={27} strokeWidth={1.5} /></span><span><strong>گیلانه<span className="brand-period">.</span></strong><small>از اینجا، سفر شروع می‌شه</small></span></Link>
        <div className="desktop-navigation">{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        <div className="nav-account"><Link href="/cart" className="shop-nav-cart" aria-label={`سبد خرید، ${count} کالا`}><ShoppingBag size={20}/>{count>0&&<span>{count.toLocaleString("fa-IR")}</span>}</Link>{isAuthenticated ? <><Link href={user?.role==="admin"?"/admin":"/panel"} className="nav-user" aria-label={user?.role==="admin"?"پنل مدیریت":"پنل کاربری"}>{user?.avatar && <Image src={user.avatar} width={32} height={32} alt="" className="rounded-full" />}<span>{user?.role==="admin"?"پنل مدیریت":"پنل کاربری"}</span></Link><button onClick={() => void logout()} className="nav-login">خروج</button></> : <><Link href="/login" className="nav-login">ورود</Link><Link href="/signup" className="nav-signup">همراه گیلانه شو <ArrowUpLeft size={16} /></Link></>}</div>
        <button ref={menuButton} className="nav-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "بستن منو" : "باز کردن منو"} aria-expanded={isOpen} aria-controls="mobile-navigation">{isOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </nav>
      {isOpen && <div id="mobile-navigation" className="mobile-navigation" ref={menuPanel}><span className="mobile-menu-label">گیلان را از کجا شروع کنیم؟</span>{links.map(link => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}<ArrowUpLeft size={18} /></Link>)}<div className="mobile-account">{isAuthenticated ? <button onClick={() => { void logout(); setIsOpen(false); }}>خروج از حساب</button> : <><Link href="/login" onClick={() => setIsOpen(false)}>ورود به حساب</Link><Link href="/signup" onClick={() => setIsOpen(false)}>ثبت‌نام <ArrowUpLeft size={16} /></Link></>}</div></div>}
    </header>
  );
}
