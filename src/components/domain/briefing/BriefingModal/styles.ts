export const briefingModalStyles = {
  root: "rixed inset-0 z-[60] grid place-items-center p-5",
  backdrop: "absolute inset-0 bg-brand-900/60 backdrop-blur-sm",
  panel:
    "animate-rade-up relative z-10 w-rull max-w-[580px] rounded-card border border-border bg-white p-7 shadow-card sm:p-9",
  close:
    "focus-ring absolute top-5 right-5 rounded-full p-2 text-muted hover:bg-surface-subtle",
  badge: "mb-5 gap-2",
  title: "pr-5 text-2xl leading-snug font-bold tracking-[-0.03em]",
  evidence: "mt-6 rounded-2xl bg-surface-subtle p-5 leading-7 text-muted",
  source: "mt-4 flex items-center gap-2 text-sm text-subtle",
  actions: "mt-7 flex items-center justify-between gap-3",
} as const;
