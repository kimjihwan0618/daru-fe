"use client";

import {
  ChevronRight,
  ExternalLink,
  Newspaper,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Briefing, Priority } from "../../model";
import { briefingModalStyles } from "./styles";

export type ModalState =
  | { type: "briefing"; index: number }
  | { type: "evidence"; priority: Priority }
  | null;

interface BriefingModalProps {
  state: ModalState;
  priorities: Briefing["priorities"];
  onClose: () => void;
  onChange: (state: ModalState) => void;
}

export function BriefingModal({
  state,
  priorities,
  onClose,
  onChange,
}: BriefingModalProps) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!state) return null;
  const priority =
    state.type === "briefing" ? priorities[state.index] : state.priority;
  const index = state.type === "briefing" ? state.index : 0;

  return (
    <div className={briefingModalStyles.root}>
      <button
        aria-label="모달 닫기"
        className={briefingModalStyles.backdrop}
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="브리핑 상세"
        className={briefingModalStyles.panel}
      >
        <button
          aria-label="닫기"
          onClick={onClose}
          className={briefingModalStyles.close}
        >
          <X size={20} />
        </button>
        <Badge className={briefingModalStyles.badge}>
          <Sparkles size={15} />{" "}
          {state.type === "briefing"
            ? `핵심 브리핑 ${index + 1}/3`
            : "근거와 출처"}
        </Badge>
        <h2 className={briefingModalStyles.title}>{priority.title}</h2>
        <div className={briefingModalStyles.evidence}>{priority.evidence}</div>
        <div className={briefingModalStyles.source}>
          <Newspaper size={16} /> 서로 다른 출처 {priority.sourceCount}건을
          비교했어요
        </div>
        <div className={briefingModalStyles.actions}>
          <Button variant="secondary">
            <ExternalLink size={16} /> 원문 출처
          </Button>
          {state.type === "briefing" && (
            <Button
              onClick={() =>
                index === priorities.length - 1
                  ? onClose()
                  : onChange({ type: "briefing", index: index + 1 })
              }
            >
              {index === priorities.length - 1
                ? "브리핑 완료"
                : "다음 핵심 이슈"}
              <ChevronRight size={17} />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
