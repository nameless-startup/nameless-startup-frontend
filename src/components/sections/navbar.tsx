"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

const AUTH_PAGES = ["/login", "/signup", "/forgot-password"];

const Navbar = () => {
  const pathname = usePathname();
  const isAuthPage = AUTH_PAGES.includes(pathname);

  if (isAuthPage) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                G
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-300 to-purple-400">
                گیلانه
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#places" className="text-sm font-medium text-muted-foreground hover:text-violet-400 transition-colors">
                مکان‌ها
              </Link>
              <Link href="/#shops" className="text-sm font-medium text-muted-foreground hover:text-violet-400 transition-colors">
                فروشگاه‌ها
              </Link>
              <Link href="/#products" className="text-sm font-medium text-muted-foreground hover:text-violet-400 transition-colors">
                محصولات
              </Link>
              <Link href="/#blogs" className="text-sm font-medium text-muted-foreground hover:text-violet-400 transition-colors">
                وبلاگ
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  خروج
                </Button>
                {user && (
                  <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-white/20"
                    />
                    <span className="hidden sm:block text-sm font-medium text-white">{user.name}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    ورود
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    ثبت‌نام
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl py-6">
          <div className="flex flex-col gap-4 px-4">
            <Link
              href="/#places"
              className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
            >
              مکان‌ها
            </Link>
            <Link
              href="/#shops"
              className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
            >
              فروشگاه‌ها
            </Link>
            <Link
              href="/#products"
              className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
            >
              محصولات
            </Link>
            <Link
              href="/#blogs"
              className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
            >
              وبلاگ
            </Link>
            {isAuthenticated ? (
              <Button onClick={() => logout()} className="mt-4 w-full">
                خروج
              </Button>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/login" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    ورود
                  </Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button size="sm" className="w-full">
                    ثبت‌نام
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;