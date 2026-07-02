import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-card border border-border bg-white/96 shadow-card",
  {
    variants: {
      padding: { none: "", default: "p-6" },
    },
    defaultVariants: { padding: "default" },
  },
);

export const cardStyles = {
  header: "mb-4 flex items-center justify-between gap-3",
  title: "text-xl font-bold tracking-[-0.03em]",
} as const;
