"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  error = false,
  disabled = false,
  className,
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(() => {
    const arr = value.split("");
    while (arr.length < length) arr.push("");
    return arr;
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Sync external value into digit array
    const arr = value.split("");
    while (arr.length < length) arr.push("");
    setDigits(arr.slice(0, length));
  }, [value, length]);

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]!.focus();
    }
  };

  const handleInputChange = (index: number, val: string) => {
    // Only allow digits
    if (!/^\d*$/.test(val)) return;

    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    const newValue = newDigits.join("");
    onChange(newValue);

    // Move to next input if digit entered
    if (val && index < length - 1) {
      focusInput(index + 1);
    }

    // Check if complete
    if (newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      const newDigits = [...digits];
      if (newDigits[index] !== "") {
        newDigits[index] = "";
        setDigits(newDigits);
        onChange(newDigits.join(""));
      } else if (index > 0) {
        newDigits[index - 1] = "";
        setDigits(newDigits);
        onChange(newDigits.join(""));
        focusInput(index - 1);
      }
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) focusInput(index - 1);
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < length - 1) focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault();
    if (disabled) return;

    const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "");
    if (!pasted) return;

    const newDigits = [...digits];
    let pasteIndex = index;
    for (let i = 0; i < pasted.length && pasteIndex < length; i++) {
      newDigits[pasteIndex] = pasted[i];
      pasteIndex++;
    }
    setDigits(newDigits);
    onChange(newDigits.join(""));

    // Focus the last filled input or the current position
    const filledCount = newDigits.filter((d) => d !== "").length;
    if (filledCount >= length) {
      onComplete?.(newDigits.join(""));
      const lastFilled = newDigits.map((d) => d !== "").lastIndexOf(true);
      if (lastFilled >= 0) focusInput(lastFilled);
    } else {
      focusInput(Math.min(pasteIndex, length - 1));
    }
  };

  const inputClass = cn(
    "w-11 h-14 text-center text-xl font-medium rounded-xl transition-all duration-200",
    "bg-white/5 border text-white placeholder-slate-500",
    "focus:outline-none focus:ring-2 focus:z-10",
    disabled
      ? "cursor-not-allowed opacity-50"
      : "hover:border-white/30",
    error
      ? "border-red-500/50 focus:ring-red-500/50"
      : "border-white/10 focus:ring-violet-500/50 focus:border-violet-500",
    "first:ml-0",
    className
  );

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          onFocus={() => {
            if (inputRefs.current[index]) {
              inputRefs.current[index]!.select();
            }
          }}
          disabled={disabled}
          className={inputClass}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
