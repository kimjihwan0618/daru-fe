import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold",
  {
    variants: {
      variant: {
        default: "bg-brand-100 text-brand-700",
        outline: "border border-border bg-white text-muted",
        success: "bg-success-50 text-success-700",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
