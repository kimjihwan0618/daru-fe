import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "social";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-[#12366c] text-white shadow-lg shadow-[#14376d]/15 hover:bg-[#0c2b5a]",
  secondary: "border border-[#d7e0eb] bg-white text-[#334a68] hover:bg-[#f7f9fc]",
  ghost: "text-[#5f6f86] hover:bg-[#f3f6fa]",
  social: "border border-[#dce4ed] bg-white text-[#233750] hover:border-[#b9c7d8] hover:bg-[#fafbfd]",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-[52px] px-5 text-[15px]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-55",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
