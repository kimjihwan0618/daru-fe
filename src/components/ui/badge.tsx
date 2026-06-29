import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full bg-[#eaf1fb] px-3 py-1.5 text-xs font-bold text-[#17417a]", className)} {...props} />;
}
