"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authUserSchema, type AuthUser } from "../model";

const STORAGE_KEY = "daru.auth.user";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = authUserSchema.safeParse(JSON.parse(stored));
          if (parsed.success) setUserState(parsed.data);
          else window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(restoreTimer);
  }, []);

  const setUser = useCallback((nextUser: AuthUser) => {
    setUserState(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

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
