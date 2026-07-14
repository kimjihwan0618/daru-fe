"use client";

import { useCallback, useEffect, useState } from "react";
import { getSession, logoutSession } from "@/features/auth/api";
import type { AuthUser } from "@/features/auth/model";

export function useAuthSession() {
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

  return { user, isReady, setUser, logout };
}
