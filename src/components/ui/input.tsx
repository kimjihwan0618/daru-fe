import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "focus-ring h-[50px] w-full rounded-xl border border-[#dbe3ed] bg-white px-4 text-[15px] text-[#172943] outline-none placeholder:text-[#9aa5b4] hover:border-[#c3cfdd] focus:border-[#7193bd]",
        className,
      )}
      {...props}
    />
  );
}
