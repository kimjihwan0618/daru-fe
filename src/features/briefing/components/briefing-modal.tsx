"use client";

import { ChevronRight, ExternalLink, Newspaper, Sparkles, X } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Briefing, Priority } from "../model";

export type ModalState = { type: "briefing"; index: number } | { type: "evidence"; priority: Priority } | null;

interface BriefingModalProps {
  state: ModalState;
  priorities: Briefing["priorities"];
  onClose: () => void;
  onChange: (state: ModalState) => void;
}

export function BriefingModal({ state, priorities, onClose, onChange }: BriefingModalProps) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!state) return null;
  const priority = state.type === "briefing" ? priorities[state.index] : state.priority;
  const index = state.type === "briefing" ? state.index : 0;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-5">
      <button aria-label="모달 닫기" className="absolute inset-0 bg-[#071326]/60 backdrop-blur-sm" onClick={onClose} />
      <section role="dialog" aria-modal="true" aria-label="브리핑 상세" className="card animate-fade-up relative z-10 w-full max-w-[580px] p-7 sm:p-9">
        <button aria-label="닫기" onClick={onClose} className="focus-ring absolute right-5 top-5 rounded-full p-2 text-[#68778f] hover:bg-[#f1f4f8]"><X size={20} /></button>
        <Badge className="mb-5 gap-2"><Sparkles size={15} /> {state.type === "briefing" ? `핵심 브리핑 ${index + 1}/3` : "근거와 출처"}</Badge>
        <h2 className="pr-5 text-2xl font-bold leading-snug tracking-[-0.03em]">{priority.title}</h2>
        <div className="mt-6 rounded-2xl bg-[#f5f7fb] p-5 leading-7 text-[#52627a]">{priority.evidence}</div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[#77849a]"><Newspaper size={16} /> 서로 다른 출처 {priority.sourceCount}건을 비교했어요</div>
        <div className="mt-7 flex items-center justify-between gap-3">
          <Button variant="secondary"><ExternalLink size={16} /> 원문 출처</Button>
          {state.type === "briefing" && (
            <Button onClick={() => index === priorities.length - 1 ? onClose() : onChange({ type: "briefing", index: index + 1 })}>{index === priorities.length - 1 ? "브리핑 완료" : "다음 핵심 이슈"}<ChevronRight size={17} /></Button>
          )}
        </div>
      </section>
    </div>
  );
}
