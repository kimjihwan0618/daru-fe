import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonStyles, buttonVariants } from "./styles";

export { buttonVariants } from "./styles";

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPending?: boolean;
  loadingText?: string;
}

export function Button({
  children,
  className,
  disabled,
  isPending = false,
  loadingText,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isPending}
      aria-busy={isPending}
      {...props}
    >
      {isPending && <LoaderCircle size={17} className={buttonStyles.loader} />}
      {isPending && loadingText ? loadingText : children}
    </button>
  );
}
