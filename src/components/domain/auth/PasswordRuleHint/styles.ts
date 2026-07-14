import { cva } from "class-variance-authority";

export const passwordRuleItemVariants = cva(
  "flex items-center gap-1.5 text-xs transition-colors",
  {
    variants: {
      isValid: {
        true: "font-semibold text-success-700",
        false: "text-subtle",
      },
    },
  },
);

export const passwordRuleStyles = {
  root: "mt-2 flex flex-wrap gap-x-4 gap-y-1",
} as const;
