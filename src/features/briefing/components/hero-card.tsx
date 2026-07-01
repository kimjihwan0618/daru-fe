import { Play, Share2, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Briefing } from "../model";
import { RouteMap } from "./route-map";

interface HeroCardProps {
  data: Briefing;
  dateLabel: string;
  onStart: () => void;
  onShare: () => void;
  startPending?: boolean;
  sharePending?: boolean;
}

export function HeroCard({ data, dateLabel, onStart, onShare, startPending, sharePending }: HeroCardProps) {
  return (
    <Card className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex flex-col justify-center py-2 sm:px-1">
        <div className="mb-4 flex flex-wrap items-center gap-2"><Badge>3분 브리핑</Badge>{data.user.isGuest && <Badge className="border border-[#dbe3ee] bg-white text-[#6d7a8f]">비회원 체험 중</Badge>}</div>
        <h1 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">좋은 아침, {data.user.name}님</h1>
        <p className="mt-2 text-sm font-medium text-[#718097]">{dateLabel}</p>
        <h2 className="mt-7 text-[32px] font-extrabold leading-[1.18] tracking-[-0.055em] text-[#102e5c] sm:text-[40px]">오늘은 {data.commute.leaveBy}까지<br className="hidden sm:block" /> 출발하세요</h2>
        <p className="mt-3 leading-7 text-[#5e6f87]">{data.commute.reason}</p>
        <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#dfe6ef] bg-white px-3 py-2 text-sm font-semibold shadow-sm"><Sun size={18} className="text-[#f6b416]" /> {data.weather.temperature}°C · {data.weather.condition}</div>
        <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" isPending={startPending} loadingText="시작하는 중..." onClick={onStart}><Play size={18} fill="currentColor" /> 브리핑 시작</Button><Button size="lg" variant="secondary" isPending={sharePending} loadingText="공유 기록 중..." onClick={onShare}><Share2 size={18} /> 공유</Button></div>
      </div>
      <RouteMap eta={data.commute.etaMinutes} delay={data.commute.delayMinutes} />
    </Card>
  );
}
