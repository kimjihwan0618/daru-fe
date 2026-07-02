import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { skeletonStyles } from "./styles";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn(skeletonStyles.root, className)}
      {...props}
    />
  );
}
