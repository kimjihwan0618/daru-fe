import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { cardStyles, cardVariants } from "./styles";

interface CardProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, padding, ...props }: CardProps) {
  return (
    <section className={cn(cardVariants({ padding }), className)} {...props} />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardStyles.header, className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn(cardStyles.title, className)} {...props} />;
}
