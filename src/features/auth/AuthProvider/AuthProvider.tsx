"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSession, logoutSession } from "../api";
import type { AuthUser } from "../model";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getSession()
      .then((response) => {
        if (isMounted) setUserState(response.data.user);
      })
      .catch(() => {
        if (isMounted) setUserState(null);
      })
      .finally(() => {
        if (isMounted) setIsReady(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const setUser = useCallback((nextUser: AuthUser) => {
    setUserState(nextUser);
    setIsReady(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutSession();
    } finally {
      setUserState(null);
    }
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
