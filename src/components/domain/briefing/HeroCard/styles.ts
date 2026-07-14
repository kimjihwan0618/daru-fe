export const heroCardStyles = {
  root: "grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]",
  content: "flex flex-col justify-center py-2 sm:px-1",
  badges: "mb-4 flex flex-wrap items-center gap-2",
  greeting: "text-2xl font-bold tracking-[-0.04em] sm:text-3xl",
  date: "mt-2 text-sm font-medium text-muted",
  headline:
    "mt-7 text-[32px] leading-[1.18] font-extrabold tracking-[-0.055em] text-brand-800 sm:text-[40px]",
  headlineBreak: "hidden sm:block",
  reason: "mt-3 leading-7 text-muted",
  weather:
    "mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold shadow-sm",
  weatherIcon: "text-warning-500",
  actions: "mt-6 flex flex-wrap gap-3",
} as const;
