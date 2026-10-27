"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { OtpAction } from "@/hooks/useAuth";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import {
  Lock,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const {
    sendOtp,
    verifyOtp,
    otpFlow,
    cancelOtp,
    loading,
    isAuthenticated,
  } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  useEffect(() => {
    if (otpFlow?.otpCode && otpFlow.otpCode.length === 6) {
      setOtpCode(otpFlow.otpCode);
    }
  }, [otpFlow?.otpCode]);

  const normalizePhone = (rawPhone: string) => {
    const normalized = rawPhone.replace(/\D/g, "");
    return "+98" + (normalized.startsWith("0") ? normalized.slice(1) : normalized);
  };

  const resetOtpState = () => {
    setOtpCode("");
    setError("");
    setSuccess("");
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const fullPhone = normalizePhone(phone);

    if (mode === "signup") {
      if (!name.trim()) {
        setError("لطفا نام و نام خانوادگی را وارد کنید");
        return;
      }
      if (password.length < 6) {
        setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
        return;
      }
    }

    if (!fullPhone || fullPhone === "+98") {
      setError("لطفا شماره موبایل را وارد کنید");
      return;
    }

    if (!password) {
      setError("لطفا رمز عبور را وارد کنید");
      return;
    }

    const action: OtpAction = mode === "login" ? "login" : "register";

    const credentials =
      mode === "login"
        ? { phone: fullPhone, password }
        : {
            name,
            phone: fullPhone,
            password,
            password_confirmation: password,
          };

    const result = await sendOtp(fullPhone, action, credentials);
    if (result.success) {
      setResendCountdown(60);
      resetOtpState();
    } else {
      setError(result.error || "لطفا شماره موبایل و رمز عبور را به درستی وارد کنید");
    }
  };

  const handleOtpSubmit = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setError("کد تایید ۶ رقمی است");
      return;
    }

    const result = await verifyOtp(otpCode);
    if (result.success) {
      setSuccess("عملیات موفقیت‌آمیز");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setError(result.error || "کد تایید نامعتبر است");
    }
  };

  const handleBackToCredentials = () => {
    cancelOtp();
    setError("");
    setSuccess("");
  };

  const handleResendOtp = async () => {
    const result = await sendOtp(otpFlow?.phone || "", otpFlow?.action || "login", otpFlow!.credentials);
    if (result.success) {
      setResendCountdown(60);
      resetOtpState();
    } else {
      setError(result.error || "امکان ارسال مجدد کد را نمی‌توان ثابت کرد");
    }
  };

  const tabClass = (active: boolean) => {
    if (active) {
      return "rounded-xl px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]";
    }
    return "rounded-xl px-4 py-2.5 text-sm font-medium bg-white/5 text-slate-400 hover:text-white";
  };

  const displayPhone = phone;

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-600/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-6">
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            بازگشت به صفحه اصلی
          </Link>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-[0_0_40px_rgba(124,58,237,0.5)] mb-6">
            <Lock className="w-10 h-10" />
          </div>

          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-300 to-purple-400 mb-2">
            نور و کار
          </h1>
          <p className="text-sm text-slate-400">
            {mode === "login" ? "ورود به حساب کاربری شما" : "ایجاد حساب کاربری جدید"}
          </p>

          {/* Mode tabs */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className={tabClass(mode === "login")}
            >
              ورود
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
                setSuccess("");
              }}
              className={tabClass(mode === "signup")}
            >
              ثبت‌نام
            </button>
          </div>
        </div>

        {mode === "login" && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 text-right mb-1.5">
                لطفا شماره موبایل را وارد کنید
              </label>
              <div className="relative group">
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  error={!!error && !phone}
                  className="w-full pl-4 pr-4 py-3.5"
                />
              </div>
              {!!error && !phone && (
                <p className="text-xs text-red-400 mt-1">لطفا شماره موبایل را وارد کنید.</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 text-right mb-1.5">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-white/10 bg-white/5 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-white text-sm transition-all placeholder-slate-500/50"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-400 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 text-violet-600 focus:ring-violet-500 bg-white/5"
                />
                <span>مرا به خاطر بسپار</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors text-right"
              >
                فراموشی رمز عبور
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full py-3.5 text-base font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-[0_0_25px_rgba(124,58,237,0.35)] transition-all duration-300 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  در حال ورود...
                </>
              ) : (
                "ورود به سیستم"
              )}
            </Button>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 text-right mb-1.5">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-white text-sm transition-all placeholder-slate-500/50"
                placeholder="نام و نام خانوادگی را وارد کنید"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 text-right mb-1.5">
                شماره موبایل
              </label>
              <div className="relative group">
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  error={!!error && mode === "signup" && !phone}
                  className="w-full pl-4 pr-4 py-3.5"
                />
              </div>
              {!!error && mode === "signup" && !phone && (
                <p className="text-xs text-red-400 mt-1">لطفا شماره موبایل را وارد کنید.</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 text-right mb-1.5">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-white/10 bg-white/5 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-white text-sm transition-all placeholder-slate-500/50"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-400 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3.5 text-base font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-[0_0_25px_rgba(124,58,237,0.35)] transition-all duration-300 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  در حال ایجاد حساب...
                </>
              ) : (
                "ورود به سیستم"
              )}
            </Button>
          </form>
        )}

        {/* OTP Step */}
        {otpFlow?.isActive && (
          <div className="space-y-6 animate-fade-in-up">
            <button
              type="button"
              onClick={handleBackToCredentials}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              ویرایش شماره موبایل
            </button>

            <div className="text-center">
              <p className="text-sm text-slate-400 mb-3">
                کد تایید به شماره <strong>{displayPhone.replace("+98", "۰")}</strong>
                <span className="text-slate-600 mx-1">|</span>
                <span className="text-slate-500">(۰{displayPhone.replace("+98", "۰")})</span>
                لطفا صبر کنید.
              </p>
              <OtpInput
                value={otpCode}
                onChange={setOtpCode}
                onComplete={handleOtpSubmit}
                error={!!error}
                disabled={!!error}
              />
            </div>

            {resendCountdown > 0 ? (
              <button
                type="button"
                className="w-full text-center text-sm text-slate-500 hover:text-slate-300 transition-colors"
                disabled
              >
                لطفا صبر کنید {resendCountdown} ثانیه
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="w-full text-center py-3 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 font-medium hover:bg-violet-500/20 hover:text-violet-200 transition-all duration-300"
              >
                ارسال مجدد کد
              </button>
            )}
          </div>
        )}

        {/* Bottom navigation */}
        <div className="mt-6 flex justify-between">
          {mode === "login" && (
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
                setSuccess("");
              }}
              className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
            >
              عضویت کنید
            </button>
          )}
          {mode === "signup" && (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
              className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
            >
              ورود به حساب
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
