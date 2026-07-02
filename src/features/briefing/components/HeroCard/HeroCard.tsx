import { Play, Share2, Sun } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Briefing } from "../../model";
import { RouteMap } from "../RouteMap";
import { heroCardStyles } from "./styles";

interface HeroCardProps {
  data: Briefing;
  dateLabel: string;
  onStart: () => void;
  onShare: () => void;
  startPending?: boolean;
  sharePending?: boolean;
}

export function HeroCard({
  data,
  dateLabel,
  onStart,
  onShare,
  startPending,
  sharePending,
}: HeroCardProps) {
  return (
    <Card className={heroCardStyles.root}>
      <div className={heroCardStyles.content}>
        <div className={heroCardStyles.badges}>
          <Badge>3분 브리핑</Badge>
          {data.user.isGuest && <Badge variant="outline">비회원 체험 중</Badge>}
        </div>
        <h1 className={heroCardStyles.greeting}>
          좋은 아침, {data.user.name}님
        </h1>
        <p className={heroCardStyles.date}>{dateLabel}</p>
        <h2 className={heroCardStyles.headline}>
          오늘은 {data.commute.leaveBy}까지
          <br className={heroCardStyles.headlineBreak} /> 출발하세요
        </h2>
        <p className={heroCardStyles.reason}>{data.commute.reason}</p>
        <div className={heroCardStyles.weather}>
          <Sun size={18} className={heroCardStyles.weatherIcon} />{" "}
          {data.weather.temperature}°C · {data.weather.condition}
        </div>
        <div className={heroCardStyles.actions}>
          <Button
            size="lg"
            isPending={startPending}
            loadingText="시작하는 중..."
            onClick={onStart}
          >
            <Play size={18} fill="currentColor" /> 브리핑 시작
          </Button>
          <Button
            size="lg"
            variant="secondary"
            isPending={sharePending}
            loadingText="공유 기록 중..."
            onClick={onShare}
          >
            <Share2 size={18} /> 공유
          </Button>
        </div>
      </div>
      <RouteMap
        eta={data.commute.etaMinutes}
        delay={data.commute.delayMinutes}
      />
    </Card>
  );
}
