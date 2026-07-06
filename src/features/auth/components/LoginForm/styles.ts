import { cva } from "class-variance-authority";

export const rememberIndicatorVariants = cva(
  "grid h-5 w-5 place-items-center rounded-md border",
  {
    variants: {
      checked: {
        true: "border-brand-700 bg-brand-700 text-white",
        false: "border-border-strong bg-white",
      },
    },
  },
);

export const socialButtonVariants = cva(
  "group focus-ring flex h-12 min-w-0 items-center justify-center gap-2 rounded-xl border border-border bg-white px-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      provider: {
        kakao: "hover:text-ink",
        naver: "hover:text-social-naver-hover",
        google: "hover:text-social-google-hover",
      },
    },
  },
);

export const socialMarkVariants = cva(
  "grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors",
  {
    variants: {
      provider: {
        kakao: "bg-social-kakao text-ink group-hover:bg-social-kakao-hover",
        naver: "bg-social-naver text-white group-hover:bg-social-naver-hover",
        google: "bg-surface-subtle group-hover:bg-border-subtle",
      },
    },
  },
);

export const loginFormStyles = {
  root: "w-full max-w-[420px]",
  intro: "mb-7 text-center",
  title:
    "text-[32px] font-extrabold tracking-[-0.045em] text-ink sm:text-[36px]",
  description: "mt-2 text-sm leading-6 text-muted sm:text-[15px]",
  socialGrid: "grid grid-cols-3 gap-2",
  divider: "my-6 flex items-center gap-4 text-xs font-medium text-subtle",
  dividerLine: "h-px flex-1 bg-border-subtle",
  form: "space-y-4",
  field: "block",
  fieldLabel: "mb-2 block text-sm font-bold text-ink-soft",
  fieldControl: "relative",
  fieldIcon: "absolute top-1/2 left-4 -translate-y-1/2 text-subtle",
  emailInput: "h-12 pl-11",
  passwordInput: "h-12 px-11",
  optionsRow: "flex items-center justify-between",
  forgotLink:
    "focus-ring rounded text-xs font-semibold text-muted hover:text-brand-700",
  visibilityButton:
    "focus-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-2 text-subtle",
  rememberButton:
    "focus-ring flex items-center gap-2 rounded-lg text-sm font-medium text-muted",
  submitButton: "mt-1 w-full",
  signUpPrompt: "mt-6 text-center text-sm text-muted",
  signUpLink: "focus-ring rounded font-bold text-brand-700",
  guestLink:
    "focus-ring mx-auto mt-4 block w-fit rounded-lg text-sm font-medium text-subtle hover:text-brand-700",
  loader: "animate-spin",
  socialLabel: "truncate text-[13px] whitespace-nowrap sm:text-sm",
  brandIcon: "h-4 w-4",
  naverGlyph: "text-sm leading-none font-black",
} as const;
