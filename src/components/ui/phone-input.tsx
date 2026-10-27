"use client";

import React from "react";
import { Phone } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export function PhoneInput({ value, onChange, placeholder, error, className }: PhoneInputProps) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-400 text-sm font-mono pointer-events-none select-none">
        <Phone className="w-3.5 h-3.5" />
        <span>+98</span>
      </div>
      <input
        type="tel"
        maxLength={11}
        value={value}
        onChange={(e) => {
          let val = e.target.value.replace(/\D/g, "");
          if (val.startsWith("0")) {
            val = val.slice(1);
          }
          onChange(val);
        }}
        placeholder={placeholder ?? "۹۱۲۳۴۵۶۷۸۹"}
        className={`
          pl-12 pr-4 py-3.5 rounded-xl border transition-all
          ${error
            ? "border-red-500/50 focus:ring-red-500 bg-red-500/5"
            : "border-white/10 focus:ring-violet-500/50 focus:border-violet-500"}
          bg-white/5 text-white text-sm
          ${className ?? ""}
        `}
        autoComplete="off"
        inputMode="numeric"
        dir="ltr"
      />
    </div>
  );
}