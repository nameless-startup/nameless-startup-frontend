"use client";
import {useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
export default function AdminLogin(){const router=useRouter();useEffect(()=>{router.replace('/login');},[router]);return <div className="panel-loading" role="status">انتقال به صفحه ورود مشترک…<Link href="/login">ورود با شماره موبایل</Link></div>;}
