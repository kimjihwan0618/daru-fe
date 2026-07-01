import { Bookmark, LoaderCircle, RefreshCw, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type Feedback = "up" | "down" | null;

interface FeedbackBarProps {
  updatedAt: string;
  feedback: Feedback;
  saved: boolean;
  onFeedback: (value: Exclude<Feedback, null>) => void;
  onSave: () => void;
  onShare: () => void;
  feedbackPending?: boolean;
  savePending?: boolean;
  sharePending?: boolean;
}

export function FeedbackBar({ updatedAt, feedback, saved, onFeedback, onSave, onShare, feedbackPending, savePending, sharePending }: FeedbackBarProps) {
  return (
    <Card className="mt-5 flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:px-6">
      <div className="flex items-center gap-2 text-sm text-[#6b788b]"><RefreshCw size={15} /> {updatedAt} 업데이트 · 기사 출처와 생성 시각을 함께 확인할 수 있어요</div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-sm font-semibold">오늘 브리핑이 유용했나요?</span>
        <button aria-label="유용해요" disabled={feedbackPending} onClick={() => onFeedback("up")} className={cn("focus-ring rounded-full border p-2.5 disabled:cursor-not-allowed disabled:opacity-60", feedback === "up" ? "border-[#9bb9de] bg-[#eaf2fc] text-[#17457e]" : "border-[#dde5ee]")}>{feedbackPending ? <LoaderCircle size={17} className="animate-spin" /> : <ThumbsUp size={17} />}</button>
        <button aria-label="아쉬워요" disabled={feedbackPending} onClick={() => onFeedback("down")} className={cn("focus-ring rounded-full border p-2.5 disabled:cursor-not-allowed disabled:opacity-60", feedback === "down" ? "border-[#eab4b4] bg-[#fff0f0] text-[#d65356]" : "border-[#dde5ee]")}>{feedbackPending ? <LoaderCircle size={17} className="animate-spin" /> : <ThumbsDown size={17} />}</button>
        <span className="mx-1 hidden h-7 w-px bg-[#dfe5ed] sm:block" />
        <Button variant="secondary" isPending={savePending} loadingText="처리 중..." onClick={onSave}><Bookmark size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "저장됨" : "저장"}</Button>
        <Button variant="secondary" isPending={sharePending} loadingText="공유 중..." onClick={onShare}><Share2 size={16} /> 공유</Button>
      </div>
    </Card>
  );
}
