import { cva } from "class-variance-authority";

export const stockChangeVariants = cva("mt-1 text-xs font-bold", {
  variants: {
    positive: { true: "text-danger-500", false: "text-success-500" },
  },
});

export const stockImpactCardStyles = {
  root: "p-5 sm:p-7",
  header: "mb-3",
  moreButton: "focus-ring rounded-lg p-2 text-muted hover:bg-surface-subtle",
  list: "divide-y divide-border-subtle",
  item: "grid grid-cols-[1fr_auto] items-center gap-4 py-4",
  name: "font-bold",
  issue: "mt-1 line-clamp-1 text-xs text-subtle",
  metrics: "flex items-center gap-3",
  priceGroup: "min-w-[78px] text-right",
  price: "text-sm font-semibold",
  disclaimer: "mt-3 flex items-center gap-1.5 text-[11px] text-subtle",
  sparkline: "h-7 w-24",
} as const;
