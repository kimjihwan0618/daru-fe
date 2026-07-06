export const registerFormStyles = {
  root: "w-full max-w-[420px]",
  intro: "mb-7 text-center",
  title:
    "text-[32px] font-extrabold tracking-[-0.045em] text-ink sm:text-[36px]",
  description: "mt-2 text-sm leading-6 text-muted sm:text-[15px]",
  form: "space-y-4",
  field: "block",
  label: "mb-2 block text-sm font-bold text-ink-soft",
  fieldControl: "relative",
  fieldIcon:
    "pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-subtle",
  input: "h-12 pl-11",
  passwordInput: "h-12 pr-12 pl-11",
  visibilityButton:
    "focus-ring absolute top-1/2 right-3 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-subtle transition-colors hover:bg-surface-muted hover:text-ink-soft",
  submit: "mt-1 w-full",
  loginPrompt: "mt-6 text-center text-sm text-muted",
  loginLink:
    "focus-ring rounded font-bold text-brand-700 hover:text-brand-800 hover:underline",
} as const;
