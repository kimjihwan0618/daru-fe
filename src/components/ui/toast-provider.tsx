"use client";

import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; message: string; type: ToastType };
type ToastContextValue = { show: (message: string, type?: ToastType) => void; success: (message: string) => void; error: (message: string) => void; info: (message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);
let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const remove = useCallback((id: number) => setToasts((current) => current.filter((toast) => toast.id !== id)), []);
  const show = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => remove(id), 3200);
  }, [remove]);
  const value = useMemo(() => ({ show, success: (message: string) => show(message, "success"), error: (message: string) => show(message, "error"), info: (message: string) => show(message, "info") }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onClose={() => remove(toast.id)} />)}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = { success: CheckCircle2, error: CircleAlert, info: Info };
  const Icon = icons[toast.type];
  return (
    <div className={cn("pointer-events-auto animate-fade-up flex items-center gap-3 rounded-xl border bg-white p-4 shadow-xl", toast.type === "success" && "border-[#bfe2d0]", toast.type === "error" && "border-[#efc0c0]", toast.type === "info" && "border-[#cbd9ea]")}>
      <Icon size={20} className={cn(toast.type === "success" && "text-[#19955b]", toast.type === "error" && "text-[#dc5558]", toast.type === "info" && "text-[#285d9a]")} />
      <p className="flex-1 text-sm font-semibold text-[#263a54]">{toast.message}</p>
      <button aria-label="메시지 닫기" onClick={onClose} className="focus-ring rounded p-1 text-[#8591a2]"><X size={16} /></button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
