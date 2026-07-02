import { cva } from "class-variance-authority";

export const toastVariants = cva(
  "animate-fade-up pointer-events-auto flex items-center gap-3 rounded-xl border bg-white p-4 shadow-xl",
  {
    variants: {
      type: {
        success: "border-success-200",
        error: "border-danger-200",
        info: "border-brand-200",
      },
    },
  },
);

export const toastIconVariants = cva("", {
  variants: {
    type: {
      success: "text-success-500",
      error: "text-danger-700",
      info: "text-brand-600",
    },
  },
});

export const toastStyles = {
  viewport:
    "pointer-events-none fixed top-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2",
  message: "flex-1 text-sm font-semibold text-ink-soft",
  closeButton: "focus-ring rounded p-1 text-subtle",
} as const;
