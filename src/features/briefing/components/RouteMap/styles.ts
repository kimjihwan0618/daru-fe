export const routeMapStyles = {
  root: "relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-surface-muted",
  grid: "absolute inset-0 opacity-70",
  legend:
    "absolute top-5 left-5 z-10 space-y-2 rounded-xl bg-white/90 px-4 py-3 text-sm shadow-sm backdrop-blur",
  origin: "flex items-center gap-2 font-semibold",
  originIcon: "text-success-500",
  destination: "flex items-center gap-2 text-muted",
  destinationIcon: "text-danger-500",
  map: "absolute inset-0 h-full w-full",
  metrics:
    "absolute inset-x-4 bottom-4 z-10 grid grid-cols-2 rounded-xl border border-border bg-white/95 px-5 py-4 shadow-sm backdrop-blur",
  eta: "border-r border-border-subtle text-success-500",
  delay: "pl-5 text-danger-500",
  metricLabel: "text-xs font-semibold text-muted",
  metricValue: "mt-1 text-3xl font-bold",
  metricSuffix: "ml-1 text-base",
} as const;
