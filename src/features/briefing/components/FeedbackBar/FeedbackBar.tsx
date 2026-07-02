import {
  Bookmark,
  LoaderCircle,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { feedbackBarStyles, feedbackButtonVariants } from "./styles";

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

export function FeedbackBar({
  updatedAt,
  feedback,
  saved,
  onFeedback,
  onSave,
  onShare,
  feedbackPending,
  savePending,
  sharePending,
}: FeedbackBarProps) {
  return (
    <Card className={feedbackBarStyles.root}>
      <div className={feedbackBarStyles.meta}>
        <RefreshCw size={15} /> {updatedAt} 업데이트 · 기사 출처와 생성 시각을
        함께 확인할 수 있어요
      </div>
      <div className={feedbackBarStyles.actions}>
        <span className={feedbackBarStyles.question}>
          오늘 브리핑이 유용했나요?
        </span>
        <button
          aria-label="유용해요"
          disabled={feedbackPending}
          onClick={() => onFeedback("up")}
          className={feedbackButtonVariants({
            tone: feedback === "up" ? "positive" : "idle",
          })}
        >
          {feedbackPending ? (
            <LoaderCircle size={17} className={feedbackBarStyles.loader} />
          ) : (
            <ThumbsUp size={17} />
          )}
        </button>
        <button
          aria-label="아쉬워요"
          disabled={feedbackPending}
          onClick={() => onFeedback("down")}
          className={feedbackButtonVariants({
            tone: feedback === "down" ? "negative" : "idle",
          })}
        >
          {feedbackPending ? (
            <LoaderCircle size={17} className={feedbackBarStyles.loader} />
          ) : (
            <ThumbsDown size={17} />
          )}
        </button>
        <span className={feedbackBarStyles.divider} />
        <Button
          variant="secondary"
          isPending={savePending}
          loadingText="처리 중..."
          onClick={onSave}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />{" "}
          {saved ? "저장됨" : "저장"}
        </Button>
        <Button
          variant="secondary"
          isPending={sharePending}
          loadingText="공유 중..."
          onClick={onShare}
        >
          <Share2 size={16} /> 공유
        </Button>
      </div>
    </Card>
  );
}
