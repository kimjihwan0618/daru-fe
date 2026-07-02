"use client";

import {
  LogIn,
  Menu,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/features/auth/AuthProvider";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";
import {
  appHeaderStyles,
  desktopNavItemVariants,
  mobileNavItemVariants,
} from "./styles";

const navItems = [
  { label: "오늘의 브리핑", href: "/", icon: Sparkles },
  { label: "이슈 탐색", href: "/#issues", icon: Search },
  { label: "관심 종목", href: "/#stocks", icon: TrendingUp },
  { label: "설정", href: "/#settings", icon: Settings2 },
];

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isReady } = useAuth();

  return (
    <>
      <header className={appHeaderStyles.header}>
        <div className={appHeaderStyles.container}>
          <button
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(true)}
            className={appHeaderStyles.menuButton}
          >
            <Menu size={22} />
          </button>
          <Link href="/" className={appHeaderStyles.logo}>
            DARU
          </Link>
          <nav className={appHeaderStyles.desktopNav}>
            {navItems.map(({ label, href }, index) => (
              <Link
                key={label}
                href={href}
                className={desktopNavItemVariants({ active: index === 0 })}
              >
                {label}
                {index === 0 && (
                  <span className={appHeaderStyles.activeIndicator} />
                )}
              </Link>
            ))}
          </nav>
          <div className={appHeaderStyles.actions}>
            {isReady && !user && (
              <Link href="/login" className={appHeaderStyles.loginLink}>
                <LogIn size={16} /> 로그인
              </Link>
            )}
            {isReady && user && (
              <>
                <NotificationMenu />
                <ProfileMenu />
              </>
            )}
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={appHeaderStyles.mobileLayer}>
          <button
            aria-label="메뉴 닫기"
            className={appHeaderStyles.mobileBackdrop}
            onClick={() => setMenuOpen(false)}
          />
          <aside className={appHeaderStyles.mobilePanel}>
            <div className={appHeaderStyles.mobileHeader}>
              <Link href="/" className={appHeaderStyles.mobileLogo}>
                DARU
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className={appHeaderStyles.closeButton}
              >
                <X size={21} />
              </button>
            </div>
            <nav className={appHeaderStyles.mobileNav}>
              {navItems.map(({ label, href, icon: Icon }, index) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={mobileNavItemVariants({ active: index === 0 })}
                >
                  <Icon size={19} /> {label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className={appHeaderStyles.mobileLogin}
                >
                  <LogIn size={19} /> 로그인
                </Link>
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
