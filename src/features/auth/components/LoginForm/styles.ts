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
  "focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-bold text-ink-soft transition hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      provider: {
        kakao:
          "border-social-kakao bg-social-kakao text-ink hover:bg-social-kakao-hover",
        naver:
          "border-social-naver bg-social-naver text-white hover:bg-social-naver-hover",
        google: "",
      },
    },
  },
);

export const loginFormStyles = {
  root: "w-full max-w-[430px]",
  intro: "mb-8",
  eyebrow: "mb-2 text-sm font-bold text-brand-600",
  title: "text-[34px] font-extrabold tracking-[-0.045em] text-ink",
  description: "mt-3 leading-7 text-muted",
  socialGrid: "grid gap-3 sm:grid-cols-3",
  divider: "my-7 flex items-center gap-4 text-xs font-medium text-subtle",
  dividerLine: "h-px flex-1 bg-border-subtle",
  form: "space-y-5",
  field: "block",
  fieldLabel: "mb-2 block text-sm font-bold text-ink-soft",
  fieldHeader: "mb-2 flex items-center justify-between",
  fieldLabelInline: "text-sm font-bold text-ink-soft",
  fieldControl: "relative",
  fieldIcon: "absolute top-1/2 left-4 -translate-y-1/2 text-subtle",
  emailInput: "pl-11",
  passwordInput: "px-11",
  forgotLink: "focus-ring rounded text-xs font-bold text-brand-600",
  visibilityButton:
    "focus-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-2 text-subtle",
  rememberButton:
    "focus-ring flex items-center gap-2 rounded-lg text-sm font-medium text-muted",
  submitButton: "w-full",
  signUpPrompt: "mt-6 text-center text-sm text-muted",
  signUpLink: "focus-ring rounded font-bold text-brand-700",
  guestLink:
    "focus-ring mx-auto mt-6 block w-fit rounded-lg text-sm font-semibold text-muted hover:text-brand-700",
  demoNotice:
    "mt-6 rounded-xl bg-surface-subtle px-4 py-3 text-center text-xs leading-5 text-subtle",
  loader: "animate-spin",
  socialMark: "grid h-5 w-5 place-items-center rounded text-xs font-black",
} as const;
