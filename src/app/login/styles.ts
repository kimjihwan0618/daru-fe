export const loginPageStyles = {
  root: "min-h-screen bg-white lg:grid lg:grid-cols-[1.02fr_0.98fr]",
  brandPanel:
    "relative hidden overflow-hidden bg-brand-800 px-12 py-10 text-white lg:flex lg:flex-col xl:px-20",
  ringDecoration:
    "absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full border-[80px] border-white/[0.035]",
  glowDecoration:
    "absolute -bottom-28 -left-20 h-[380px] w-[380px] rounded-full bg-brand-500/20 blur-3xl",
  brandLogo:
    "focus-ring relative z-10 w-fit rounded text-2xl font-black tracking-[-0.04em] italic",
  brandContent: "relative z-10 my-auto max-w-[540px]",
  promiseBadge:
    "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-brand-50",
  headline:
    "mt-7 text-[46px] leading-[1.2] font-extrabold tracking-[-0.055em] xl:text-[54px]",
  description: "mt-5 max-w-[470px] text-lg leading-8 text-brand-200",
  benefits: "mt-10 space-y-5",
  benefit: "flex gap-4",
  benefitIcon:
    "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-100",
  benefitTitle: "font-bold",
  benefitDescription: "mt-1 text-sm leading-6 text-brand-200",
  copyright: "relative z-10 text-xs text-white/45",
  formPanel: "flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14 xl:px-24",
  formHeader: "flex items-center justify-between lg:justify-end",
  mobileLogo: "text-2xl font-black text-brand-700 italic lg:hidden",
  backLink:
    "focus-ring flex items-center gap-2 rounded-lg text-sm font-semibold text-muted hover:text-brand-700",
  formContent: "flex flex-1 items-center justify-center py-10",
  footerLinks: "flex justify-center gap-5 text-xs text-subtle",
} as const;
