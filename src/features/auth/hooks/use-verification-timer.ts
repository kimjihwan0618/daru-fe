"use client";

import { useEffect, useState } from "react";

export const VERIFICATION_CODE_EXPIRES_IN_SECONDS = 3 * 60;

export function useVerificationTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const timer = window.setInterval(
      () => setRemainingSeconds((seconds) => Math.max(0, seconds - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [remainingSeconds]);

  return {
    remainingSeconds,
    start: () => setRemainingSeconds(VERIFICATION_CODE_EXPIRES_IN_SECONDS),
    stop: () => setRemainingSeconds(0),
  };
}

export function formatVerificationTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
