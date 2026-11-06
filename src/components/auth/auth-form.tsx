"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import "./auth.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, MapPin, ShieldCheck, Trees } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function latinDigits(value: string) {
  return value.replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const router = useRouter();
  const { sendOtp, verifyOtp, otpFlow, cancelOtp, loading, isAuthenticated, user } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const codeInput = useRef<HTMLInputElement>(null);
  const otpActive = !!otpFlow?.isActive;

  useEffect(() => { if (isAuthenticated) router.replace(user?.role==="admin"?"/admin":["/checkout", "/checkout?coupon=GILAN10"].includes(new URLSearchParams(window.location.search).get("next") || "") ? new URLSearchParams(window.location.search).get("next")! : "/panel"); }, [isAuthenticated, router, user?.role]);
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(value => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);
  useEffect(() => { if (otpActive) codeInput.current?.focus(); }, [otpActive]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setError("");
    if (otpActive) {
      if (!/^\d{6}$/.test(code)) { setError("کد تأیید باید ۶ رقم باشد."); return; }
      const result = await verifyOtp(code);
      if (!result.success) setError(result.error || "کد تأیید درست نیست. دوباره تلاش کنید.");
      return;
    }
    if (signup && !name.trim()) { setError("نام و نام خانوادگی را وارد کنید."); return; }
    let digits = latinDigits(phone).replace(/\D/g, "");
    if (digits.startsWith("0098")) digits = digits.slice(4);
    else if (digits.startsWith("98") && digits.length === 12) digits = digits.slice(2);
    if (digits.startsWith("0")) digits = digits.slice(1);
    if (!/^9\d{9}$/.test(digits)) { setError("شماره موبایل معتبر وارد کنید؛ برای مثال ۰۹۱۲۳۴۵۶۷۸۹."); return; }
    if (!password || (signup && password.length < 6)) { setError(signup ? "رمز عبور باید حداقل ۶ کاراکتر باشد." : "رمز عبور را وارد کنید."); return; }
    const fullPhone = "+98" + digits;
    const credentials = signup ? { name: name.trim(), phone: fullPhone, password, password_confirmation: password } : { phone: fullPhone, password };
    const result = await sendOtp(fullPhone, signup ? "register" : "login", credentials);
    if (result.success) { setCountdown(60); setCode(""); }
    else setError(result.error || "ارسال کد انجام نشد. دوباره تلاش کنید.");
  }

  async function resend() {
    if (!otpFlow || loading || countdown > 0) return;
    setError("");
    const result = await sendOtp(otpFlow.phone, otpFlow.action, otpFlow.credentials);
    if (result.success) { setCountdown(60); setCode(""); codeInput.current?.focus(); }
    else setError(result.error || "ارسال مجدد انجام نشد. دوباره تلاش کنید.");
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-content" aria-labelledby="auth-title">
          <div className="auth-topbar"><Link href="/" className="travel-brand"><span className="brand-symbol"><Trees size={26} strokeWidth={1.5} /></span><strong>گیلانه<span className="brand-period">.</span></strong></Link><Link href="/" className="auth-home">صفحه اصلی <ArrowLeft size={16} /></Link></div>
          <div className="auth-form-wrap">
            <h1 id="auth-title">{otpActive ? "شماره‌ات رو تأیید کن" : signup ? "به گیلانه بپیوند." : "به گیلانه خوش اومدی."}</h1>
            <p className="auth-intro">{otpActive ? <>کد ۶ رقمی ارسال‌شده به <bdi>{otpFlow.phone}</bdi> را وارد کن.</> : signup ? "حسابت رو بساز و با ما گیلان رو نزدیک‌تر ببین." : "وارد حسابت شو؛ هنوز کلی جای دیدنی منتظرته."}</p>
            {!otpActive && <nav className="auth-mode" aria-label="انتخاب ورود یا ثبت‌نام"><Link href="/login" scroll={false} aria-current={!signup ? "page" : undefined}>ورود</Link><Link href="/signup" scroll={false} aria-current={signup ? "page" : undefined}>ثبت‌نام</Link></nav>}
            <form onSubmit={submit} className="auth-form" noValidate aria-busy={loading}>
              <fieldset disabled={loading}>
                {otpActive ? <div className="auth-field"><label htmlFor="auth-code">کد تأیید</label><input ref={codeInput} id="auth-code" name="code" className="auth-code" inputMode="numeric" autoComplete="one-time-code" dir="ltr" placeholder="— — — — — —" maxLength={6} value={code} onChange={event => { setCode(latinDigits(event.target.value).replace(/\D/g, "").slice(0,6)); setError(""); }} aria-invalid={!!error} aria-describedby={error ? "auth-error" : undefined} /><div className="auth-code-actions"><button type="button" onClick={() => { cancelOtp(); setError(""); setCode(""); }}>ویرایش شماره <ArrowRight size={14} /></button><button type="button" disabled={countdown > 0 || loading} onClick={() => void resend()}>{countdown > 0 ? `ارسال مجدد تا ${countdown.toLocaleString("fa-IR")} ثانیه` : "ارسال مجدد کد"}</button></div></div> : <div className="auth-fields">
                  {signup && <div className="auth-field"><label htmlFor="auth-name">نام و نام خانوادگی</label><input id="auth-name" name="name" autoComplete="name" placeholder="نامی که دوست داری با آن صدات کنیم" value={name} onChange={event => { setName(event.target.value); setError(""); }} required maxLength={100} /></div>}
                  <div className="auth-field"><label htmlFor="auth-phone">شماره موبایل</label><div className="auth-phone"><input id="auth-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" dir="ltr" placeholder="912 345 6789" value={phone} onChange={event => { setPhone(latinDigits(event.target.value).replace(/[^\d+\s-]/g, "")); setError(""); }} required maxLength={18} aria-describedby="phone-help" /><span dir="ltr">+98</span></div><p id="phone-help" className="sr-only">شماره را با صفر یا بدون صفر وارد کن.</p></div>
                  <div className="auth-field"><div className="auth-label-row"><label htmlFor="auth-password">رمز عبور</label>{!signup && <Link href="/forgot-password">رمزت رو فراموش کردی؟</Link>}</div><div className="auth-password"><input id="auth-password" name="password" type={showPassword ? "text" : "password"} dir="ltr" autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "حداقل ۶ کاراکتر" : "رمز عبورت را وارد کن"} value={password} onChange={event => { setPassword(event.target.value); setError(""); }} required minLength={signup ? 6 : undefined} aria-describedby={signup ? "password-help" : undefined} /><button type="button" aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{signup && <p id="password-help" className="sr-only">برای رمز قوی‌تر از حروف و اعداد استفاده کن.</p>}</div>
                </div>}
                <div className="auth-error-slot" aria-live="polite" aria-atomic="true">{error && <p id="auth-error" className="auth-error">{error}</p>}</div>
                <button type="submit" className="auth-submit" disabled={loading}>{loading ? <><Loader2 size={19} className="animate-spin" />در حال بررسی…</> : <>{otpActive ? "تأیید و ورود به گیلانه" : signup ? "ساخت حساب کاربری" : "ادامه و دریافت کد تأیید"}<ArrowLeft size={19} /></>}</button>
              </fieldset>
            </form>
            {otpActive && otpFlow.otpCode && <p className="auth-demo" role="status">نسخه آزمایشی · کد تأیید: <bdi>{otpFlow.otpCode}</bdi></p>}
            <div className="auth-reassurance"><ShieldCheck size={15} />شماره‌ات فقط برای ورود و تأیید حساب استفاده می‌شود.</div>
          </div>
        </section>
        <aside className="auth-visual" aria-label="الهام سفر">
          <Image src="/images/places-4.jpg" alt="چشم‌انداز کوهستان و دره‌های سبز در نور طلایی آفتاب" fill sizes="(max-width: 900px) 0px, 48vw" className="auth-landscape" />
          <div className="auth-photo-overlay" /><span className="auth-photo-badge"><span />کمی دورتر از روزمرگی</span>
          <div className="auth-photo-copy"><span className="auth-photo-kicker">هر سفر، یک شروع تازه‌ست</span><h2>حس خوبِ کشف،<br />از همین‌جا.</h2><p>از مسیرهای مه‌آلود تا طعم چای تازه؛<br />گیلان رو با چشم‌های تازه ببین.</p><div className="auth-photo-bottom"><span><MapPin size={15} />گیلان، ایران</span><span dir="ltr">GILANEH / EXPLORE MORE</span></div></div>
        </aside>
      </div>
    </div>
  );
}
