import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { inputStyles } from "./styles";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputStyles.root, className)} {...props} />;
}
