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
  "group focus-ring flex min-w-0 flex-col items-center gap-2 rounded-xl px-1 py-1 text-sm font-semibold text-ink-soft transition-colors disabled:cursor-not-allowed disabled:opacity-60",
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
  "grid h-16 w-16 place-items-center rounded-full transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg",
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
  root: "w-full max-w-[430px]",
  intro: "mb-4",
  eyebrow: "mb-2 text-sm font-bold text-brand-600",
  title: "text-[32px] font-extrabold tracking-[-0.045em] text-ink",
  description: "mt-2 leading-6 text-muted",
  socialGrid: "grid grid-cols-3 gap-2",
  divider: "my-3 flex items-center gap-4 text-xs font-medium text-subtle",
  dividerLine: "h-px flex-1 bg-border-subtle",
  form: "space-y-3",
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
  signUpPrompt: "mt-3 text-center text-sm text-muted",
  signUpLink: "focus-ring rounded font-bold text-brand-700",
  guestLink:
    "focus-ring mx-auto mt-3 block w-fit rounded-lg text-sm font-semibold text-muted hover:text-brand-700",
  loader: "animate-spin",
  socialLabel: "text-center text-[13px] leading-5 whitespace-nowrap sm:text-sm",
  brandIcon: "h-8 w-8",
  naverGlyph: "text-[28px] leading-none font-black",
} as const;
