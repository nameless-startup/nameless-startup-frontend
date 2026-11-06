"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpLeft, Bell, Bookmark, CircleHelp, Compass, LayoutDashboard, LogOut, Menu, Route, Settings, ShoppingBag, Trees, UserRound, X } from "lucide-react";
import PanelModeSwitch from "@/components/navigation/panel-mode-switch";
import { useAuth } from "@/hooks/useAuth";
import "./panel.css";
import { panelService, type PanelData } from "@/services/panel.service";
import { useCart } from "@/hooks/useCommerce";
import { ShoppingCart } from "lucide-react";

const navigation = [
 {href:"/panel",label:"نمای کلی",icon:LayoutDashboard}, {href:"/panel/profile",label:"پروفایل من",icon:UserRound},
 {href:"/panel/saved",label:"نشان‌شده‌ها",icon:Bookmark}, {href:"/panel/trips",label:"سفرهای من",icon:Route},
 {href:"/panel/orders",label:"سفارش‌ها",icon:ShoppingBag}, {href:"/panel/notifications",label:"اعلان‌ها",icon:Bell},
 {href:"/panel/settings",label:"تنظیمات",icon:Settings}, {href:"/panel/support",label:"راهنما و پشتیبانی",icon:CircleHelp},
];
const PanelContext = createContext<{data:PanelData; update:(patch:Partial<PanelData>)=>void; toggleSaved:(id:string)=>void; name:string; phone:string} | null>(null);
export function usePanel() { const value=useContext(PanelContext); if(!value) throw Error("Panel context missing"); return value; }

export default function PanelShell({children}:{children:ReactNode}) {
 const {user,loading,isAuthenticated,logout}=useAuth();
 const [open,setOpen]=useState(false);
 const pathname=usePathname();
 const router=useRouter();
 const {count}=useCart();
 useEffect(()=>{ if(!loading&&!isAuthenticated) router.replace('/login'); },[loading,isAuthenticated,router]);
 useEffect(()=>{if(user?.phone)panelService.initialize(user.phone);},[user?.phone]);
 const stored=useSyncExternalStore(panelService.subscribe,()=>{try{return panelService.snapshot(user?.phone||"guest");}catch{return null;}},()=>undefined);
 const ready=stored!==undefined;
 const data=useMemo(()=>panelService.parse(stored),[stored]);
 useEffect(()=>{
  if(!open)return;
  const previous=document.body.style.overflow; document.body.style.overflow='hidden';
  document.querySelector<HTMLAnchorElement>('#panel-sidebar nav a')?.focus();
  const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);document.getElementById('panel-menu-button')?.focus();}};
  document.addEventListener('keydown',close);
  return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',close);};
 },[open]);
 function update(patch:Partial<PanelData>) { try{panelService.update(user?.phone||"guest",patch);}catch{window.alert("ذخیره‌سازی مرورگر در دسترس نیست. تنظیمات حریم خصوصی را بررسی کنید.");} }
 function toggleSaved(id:string){update({saved:data.saved.includes(id)?data.saved.filter(item=>item!==id):[...data.saved,id]});}
 async function signOut(){await logout();router.replace('/login');}
 if(loading||!isAuthenticated||!ready)return <div className="panel-loading" role="status"><Trees size={32}/><span>در حال آماده‌سازی پنل شما…</span></div>;
 const name=data.name||user?.name||"هم‌سفر";
 const active=navigation.find(item=>item.href===pathname);
 return <PanelContext.Provider value={{data,update,toggleSaved,name,phone:user?.phone||""}}>
  <div className={`panel-root ${user?.role==='admin'?'has-panel-mode':''}`}>
   <header className="panel-header"><Link href="/panel" className="panel-brand"><span><Trees size={26}/></span><strong>گیلانه<span>.</span></strong><small>پنل همراهان</small></Link><div className="panel-header-actions">{user?.role==='admin'&&<PanelModeSwitch mode="user"/>}<Link href="/" className="panel-back-site">کشف گیلان <ArrowUpLeft size={16}/></Link><Link href="/cart" className="panel-bell" aria-label={`سبد خرید، ${count} کالا`}><ShoppingCart size={20}/>{count>0&&<span className="shop-cart-count">{count.toLocaleString("fa-IR")}</span>}</Link><Link href="/panel/notifications" className="panel-bell" aria-label={data.readWelcome?"اعلان‌ها":"اعلان‌ها، یک پیام خوانده‌نشده"}><Bell size={20}/>{!data.readWelcome&&<i/>}</Link><Link href="/panel/profile" className="panel-header-user"><span className="panel-avatar">{name.slice(0,1)}</span><span>{name}<small>حساب کاربری من</small></span></Link><button id="panel-menu-button" className="panel-mobile-toggle" aria-label={open?"بستن منوی پنل":"باز کردن منوی پنل"} aria-expanded={open} aria-controls="panel-sidebar" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>
   {open&&<button className="panel-backdrop" onClick={()=>setOpen(false)} aria-label="بستن منوی کناری"/>}
   <aside id="panel-sidebar" className={`panel-sidebar ${open?'is-open':''}`} aria-label="منوی پنل کاربری"><div className="panel-sidebar-person"><span className="panel-avatar">{name.slice(0,1)}</span><div><strong>{name}</strong><span>خوش اومدی به گیلانه</span></div></div><p className="panel-nav-caption">فضای شخصی تو</p><nav aria-label="صفحات پنل">{navigation.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)}><Icon size={19} strokeWidth={1.7}/>{label}{href==='/panel/notifications'&&!data.readWelcome&&<span className="panel-count">۱</span>}</Link>)}</nav><div className="panel-sidebar-bottom"><div className="panel-sidebar-promo"><Compass size={24}/><strong>هوای سفر داری؟</strong><p>مقصد بعدی‌ات همین نزدیکی‌ست.</p><Link href="/#places">کشف یک جای تازه <ArrowUpLeft size={15}/></Link></div><button onClick={()=>void signOut()}><LogOut size={18}/>خروج از حساب</button></div></aside>
   <div className="panel-main"><div className="panel-breadcrumb"><span>پنل کاربری</span><span>/</span><strong>{active?.label||"نمای کلی"}</strong></div>{children}<footer className="panel-footer"><span>گیلانه؛ همراه لحظه‌های خوب سفر</span><span>ساخته‌شده برای کشف بیشتر <Trees size={13}/></span></footer></div>
  </div>
 </PanelContext.Provider>;
}
