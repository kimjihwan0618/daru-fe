"use client";

import { createContext, useContext, useMemo } from "react";
import { useAuthSession } from "@/app/(page)/hooks";
import type { AuthUser } from "@/app/(page)/type/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isReady, setUser, logout } = useAuthSession();

  const value = useMemo(
    () => ({ user, isReady, setUser, logout }),
    [isReady, logout, setUser, user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
