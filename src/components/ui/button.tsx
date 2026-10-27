"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants: Record<string, string> = {
      default:
        "bg-violet-600 text-white hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-95",
      secondary:
        "bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] active:scale-95",
      outline:
        "border border-violet-500/30 bg-transparent text-violet-400 hover:bg-violet-500/10 hover:text-violet-300 hover:shadow-[0_0_25px_rgba(124,58,237,0.2)] active:scale-95",
      ghost:
        "hover:bg-white/5 hover:text-white active:scale-95",
      destructive:
        "bg-red-500 text-white hover:bg-red-600 active:scale-95",
    };

    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-5 py-2 text-sm",
      lg: "h-11 px-8 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };