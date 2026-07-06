import { cva } from "class-variance-authority";

export const desktopNavItemVariants = cva(
  "focus-ring relative flex h-full items-center px-5 text-[15px] font-semibold transition-colors",
  {
    variants: {
      active: {
        true: "text-brand-700",
        false: "text-muted hover:text-ink-soft",
      },
    },
  },
);

export const mobileNavItemVariants = cva(
  "flex items-center gap-3 rounded-xl px-4 py-3 font-semibold",
  {
    variants: {
      active: { true: "bg-brand-50 text-brand-700", false: "text-muted" },
    },
  },
);

export const appHeaderStyles = {
  header:
    "sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-xl",
  container:
    "mx-auto flex h-[74px] max-w-[1540px] items-center gap-7 px-5 sm:px-8",
  menuButton: "focus-ring rounded-lg p-2 lg:hidden",
  logo: "focus-ring rounded text-2xl font-black tracking-[-0.04em] text-brand-700 italic",
  desktopNav: "hidden h-full items-center gap-1 lg:flex",
  activeIndicator:
    "absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-brand-700",
  actions: "ml-auto flex items-center gap-2 sm:gap-3",
  loginLink:
    "focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-ink-soft hover:bg-surface-muted",
  signUpLink:
    "focus-ring inline-flex min-h-10 items-center gap-2 rounded-full bg-brand-700 px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-800",
  mobileLayer: "fixed inset-0 z-50 lg:hidden",
  mobileBackdrop: "absolute inset-0 bg-brand-900/40",
  mobilePanel: "relative h-full w-[290px] bg-white p-6 shadow-2xl",
  mobileHeader: "mb-9 flex items-center justify-between",
  mobileLogo: "text-2xl font-black text-brand-700 italic",
  closeButton: "focus-ring rounded-lg p-2",
  mobileNav: "space-y-2",
  mobileAuthActions: "mt-4 space-y-2 border-t border-border pt-4",
  mobileLogin:
    "flex items-center gap-3 rounded-xl border border-border px-4 py-3 font-semibold text-ink-soft",
  mobileSignUp:
    "flex items-center gap-3 rounded-xl bg-brand-700 px-4 py-3 font-bold text-white",
} as const;
