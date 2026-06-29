"use client";

import { Bell, LogIn, Menu, Search, Settings2, Sparkles, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "오늘의 브리핑", href: "/", icon: Sparkles },
  { label: "이슈 탐색", href: "/#issues", icon: Search },
  { label: "관심 종목", href: "/#stocks", icon: TrendingUp },
  { label: "설정", href: "/#settings", icon: Settings2 },
];

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#e2e8f1] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1540px] items-center gap-7 px-5 sm:px-8">
          <button aria-label="메뉴 열기" onClick={() => setMenuOpen(true)} className="focus-ring rounded-lg p-2 lg:hidden"><Menu size={22} /></button>
          <Link href="/" className="focus-ring rounded text-2xl font-black italic tracking-[-0.04em] text-[#12366c]">DARU</Link>
          <nav className="hidden h-full items-center gap-1 lg:flex">
            {navItems.map(({ label, href }, index) => (
              <Link key={label} href={href} className={cn("focus-ring relative flex h-full items-center px-5 text-[15px] font-semibold transition-colors", index === 0 ? "text-[#12366c]" : "text-[#65748b] hover:text-[#223653]")}> 
                {label}
                {index === 0 && <span className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-[#17437f]" />}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="focus-ring hidden min-h-10 items-center gap-2 rounded-full border border-[#dce4ef] px-4 text-sm font-semibold text-[#27405f] hover:bg-[#f5f8fc] sm:flex"><LogIn size={16} /> 로그인</Link>
            <button aria-label="알림" className="focus-ring relative rounded-full p-2.5 hover:bg-[#f4f7fb]"><Bell size={20} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#f0595d] ring-2 ring-white" /></button>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#173c72] text-sm font-bold text-white">지</div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="메뉴 닫기" className="absolute inset-0 bg-[#0b1830]/40" onClick={() => setMenuOpen(false)} />
          <aside className="relative h-full w-[290px] bg-white p-6 shadow-2xl">
            <div className="mb-9 flex items-center justify-between"><Link href="/" className="text-2xl font-black italic text-[#12366c]">DARU</Link><button onClick={() => setMenuOpen(false)} className="focus-ring rounded-lg p-2"><X size={21} /></button></div>
            <nav className="space-y-2">
              {navItems.map(({ label, href, icon: Icon }, index) => (
                <Link key={label} href={href} onClick={() => setMenuOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 font-semibold", index === 0 ? "bg-[#edf3fb] text-[#153e76]" : "text-[#617089]")}><Icon size={19} /> {label}</Link>
              ))}
              <Link href="/login" onClick={() => setMenuOpen(false)} className="mt-4 flex items-center gap-3 rounded-xl border border-[#dce4ed] px-4 py-3 font-semibold text-[#294361]"><LogIn size={19} /> 로그인</Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
