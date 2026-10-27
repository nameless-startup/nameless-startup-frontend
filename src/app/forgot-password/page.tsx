"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const { forgotPassword, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("request"); // "request" | "sent"
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalizedPhone = phone.replace(/\D/g, "");
    const fullPhone = `+98${normalizedPhone.startsWith("0") ? normalizedPhone.slice(1) : normalizedPhone}`;

    const result = await forgotPassword(fullPhone);
    if (result.success) {
      setStep("sent");
    } else {
      setError(result.error || "خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian pt-12 pb-24 px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 text-white font-bold text-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] mb-4">
            G
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-300 to-purple-400">
            گیلانه
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            {step === "request" ? "فراموشی رمز عبور" : "ارسال کد تایید"}
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-right">
              {error}
            </div>
          )}

          {step === "request" ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300 text-right">
                  شماره همراه
                </label>
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  placeholder="۹۱۲۳۴۵۶۷۸۹"
                  error={!!error}
                />
                <p className="text-[11px] text-slate-500 text-right">
                  کد تایید به شماره‌ی شما ارسال می‌شود
                </p>
              </div>

              <Button
                type="submit"
                className="w-full py-3.5 text-lg font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                disabled={loading}
              >
                {loading ? "در حال ارسال..." : "ارسال کد تایید"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4 text-violet-400 text-2xl">
                ✅
              </div>
              <h2 className="text-xl font-bold text-white mb-2">کد تایید ارسال شد</h2>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                کد تایید به شماره‌ی شما ارسال شد. لطفاً کد را وارد کنید تا بتوانید رمز عبور خود را بازنشانی کنید.
              </p>
              <Button
                onClick={() => {
                  setStep("request");
                  setError("");
                }}
                className="w-full py-3 text-sm text-violet-400 hover:text-violet-300 border border-transparent hover:border-violet-500/30 transition-all bg-transparent"
              >
                ارسال مجدد کد
              </Button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-sm text-slate-400 text-right mb-4">
              به یاد می‌آورید؟
            </p>
            <Link
              href="/login"
              className="w-full block text-center py-3 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 font-medium hover:bg-violet-500/20 hover:text-violet-200 transition-all"
            >
              بازگشت به ورود
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          © ۱۴۰۳ گیلانه - راهنمای سفر گیلان
        </div>
      </div>
    </div>
  );
}