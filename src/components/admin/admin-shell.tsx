"use client";
import {useEffect,useState,useMemo,useSyncExternalStore,type ReactNode} from 'react';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {ArrowUpLeft,LayoutDashboard,LogOut,Menu,Package,Settings,ShieldCheck,ShoppingBag,Users,X} from 'lucide-react';
import PanelModeSwitch from '@/components/navigation/panel-mode-switch';
import {useAuth} from '@/hooks/useAuth';
import {adminService,type AdminOrder,type ShopSettings} from '@/services/admin.service';
import type {Account} from '@/services/account.service';
import type {CatalogProduct} from '@/services/catalog.service';
import '@/components/panel/panel.css';
import '@/components/commerce/commerce.css';
import './admin.css';
export type AdminData={users:Account[];orders:AdminOrder[];products:CatalogProduct[];settings:ShopSettings};
export function useAdminData(){const raw=useSyncExternalStore(adminService.subscribe,()=>adminService.snapshot(),()=>null);return useMemo<AdminData>(()=>raw?JSON.parse(raw):{users:[],orders:[],products:[],settings:{name:'گیلانه',notice:''}},[raw]);}
const links=[{href:'/admin',label:'داشبورد مدیریت',icon:LayoutDashboard},{href:'/admin/products',label:'مدیریت محصولات',icon:Package},{href:'/admin/orders',label:'مدیریت سفارش‌ها',icon:ShoppingBag},{href:'/admin/users',label:'مدیریت کاربران',icon:Users},{href:'/admin/settings',label:'تنظیمات فروشگاه',icon:Settings}];
export default function AdminShell({children}:{children:ReactNode}){const {user,loading,logout}=useAuth();const path=usePathname();const router=useRouter();const [open,setOpen]=useState(false);const loginPage=path==='/admin/login';
 useEffect(()=>{if(loginPage||loading)return;if(!user)router.replace('/login');else if(user.role!=='admin')router.replace('/panel');},[user,loading,loginPage,router]);
 useEffect(()=>{if(user?.role==='admin'&&!loginPage)adminService.initialize();},[user?.role,loginPage]);
 useEffect(()=>{if(!open)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';document.querySelector<HTMLAnchorElement>('#admin-sidebar nav a')?.focus();const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);document.getElementById('admin-menu')?.focus();}};document.addEventListener('keydown',close);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',close);};},[open]);
 if(loginPage)return children;
 if(loading||user?.role!=='admin')return <div className="panel-loading" role="status"><ShieldCheck size={30}/>در حال بررسی دسترسی مدیریت…</div>;
 async function signOut(){await logout();router.replace('/admin/login');}
 return <div className="panel-root admin-root has-panel-mode"><header className="panel-header"><Link href="/admin" className="panel-brand"><span><ShieldCheck size={25}/></span><strong>گیلانه<span>.</span></strong><small>مرکز مدیریت</small></Link><div className="panel-header-actions"><PanelModeSwitch mode="admin"/><Link href="/" className="panel-back-site">مشاهده سایت <ArrowUpLeft size={16}/></Link><span className="panel-avatar">م</span><button id="admin-menu" className="panel-mobile-toggle" aria-label={open?'بستن منوی مدیریت':'باز کردن منوی مدیریت'} aria-expanded={open} aria-controls="admin-sidebar" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>{open&&<button className="panel-backdrop" aria-label="بستن منوی کناری مدیریت" onClick={()=>setOpen(false)}/>}
 <aside id="admin-sidebar" className={`panel-sidebar ${open?'is-open':''}`}><div className="admin-sidebar-title"><span><ShieldCheck size={24}/></span><strong>اتاق فرمان گیلانه</strong><p>یک نگاه روشن به همه‌چیز</p></div><p className="panel-nav-caption">مدیریت و نظارت</p><nav aria-label="صفحات مدیریت">{links.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)}><Icon size={19}/>{label}</Link>)}</nav><div className="panel-sidebar-bottom"><div className="admin-demo-label"><span className="admin-live-dot"/>محیط آزمایشی فعال<p>داده‌ها روی همین مرورگر ذخیره می‌شوند.</p></div><button onClick={()=>void signOut()}><LogOut size={18}/>خروج از مدیریت</button></div></aside><div className="panel-main"><div className="panel-breadcrumb"><span>مدیریت گیلانه</span><span>/</span><strong>{links.find(link=>link.href===path)?.label}</strong></div>{children}<footer className="panel-footer"><span>مرکز مدیریت گیلانه</span><span>نسخه نمایشی · داده‌های محلی</span></footer></div></div>;
}
