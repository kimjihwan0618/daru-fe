export const queryKeys = {
  briefing: {
    all: ["briefing"] as const,
    daily: (date: string) =>
      [...queryKeys.briefing.all, "daily", date] as const,
  },
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
};
