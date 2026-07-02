export const loginPageStyles = {
  root: "min-h-screen bg-white lg:grid lg:grid-cols-[minmax(0,0.86fr)_minmax(520px,1.14fr)]",
  brandPanel:
    "relative hidden overflow-hidden bg-brand-800 px-10 py-8 text-white lg:flex lg:flex-col xl:px-14",
  ringDecoration:
    "absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full border-[80px] border-white/[0.035]",
  glowDecoration:
    "absolute -bottom-28 -left-20 h-[380px] w-[380px] rounded-full bg-brand-500/20 blur-3xl",
  brandLogo:
    "focus-ring relative z-10 w-fit rounded text-2xl font-black tracking-[-0.04em] italic",
  brandContent: "relative z-10 my-auto max-w-[480px]",
  promiseBadge:
    "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-brand-50",
  headline:
    "mt-6 text-[40px] leading-[1.18] font-extrabold tracking-[-0.05em] xl:text-[44px]",
  benefits: "mt-8 space-y-3",
  benefit: "flex items-center gap-3",
  benefitIcon:
    "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-100",
  benefitTitle: "font-bold",
  copyright: "relative z-10 text-xs text-white/45",
  formPanel: "flex min-h-screen flex-col px-5 py-5 sm:px-10 lg:px-12 xl:px-18",
  formHeader: "flex items-center justify-between lg:justify-end",
  mobileLogo: "text-2xl font-black text-brand-700 italic lg:hidden",
  backLink:
    "focus-ring flex items-center gap-2 rounded-lg text-sm font-semibold text-muted hover:text-brand-700",
  formContent: "flex flex-1 items-center justify-center py-3",
  footerLinks: "flex justify-center gap-5 text-xs text-subtle",
} as const;
