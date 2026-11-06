import Link from "next/link";
import { ShieldCheck, UserRound } from "lucide-react";
import "./panel-mode-switch.css";

export default function PanelModeSwitch({ mode }: { mode: "user" | "admin" }) {
  return (
    <nav className="panel-mode-switch" data-mode={mode} aria-label="انتخاب پنل">
      <span className="panel-mode-indicator" aria-hidden="true" />
      <Link href="/panel" aria-label="پنل کاربری" aria-current={mode === "user" ? "true" : undefined}>
        <UserRound size={16} strokeWidth={1.8} aria-hidden="true" />
        <span>کاربری</span>
      </Link>
      <Link href="/admin" aria-label="پنل مدیریت" aria-current={mode === "admin" ? "true" : undefined}>
        <ShieldCheck size={16} strokeWidth={1.8} aria-hidden="true" />
        <span>مدیریت</span>
      </Link>
    </nav>
  );
}
