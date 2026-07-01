"use client";

import { Info, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { ApiError } from "@/lib/api/response";
import { useDailyBriefing } from "../hooks/use-daily-briefing";
import { useBriefingMutations } from "../hooks/use-briefing-mutations";
import type { Priority } from "../model";
import { BriefingModal, type ModalState } from "./briefing-modal";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { FeedbackBar } from "./feedback-bar";
import { HeroCard } from "./hero-card";
import { NewsClusters } from "./news-clusters";
import { PrioritiesCard } from "./priorities-card";
import { ScheduleCard } from "./schedule-card";
import { StockImpactCard } from "./stock-impact-card";

export function DashboardPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useDailyBriefing();
  const actions = useBriefingMutations();
  const toast = useToast();
  const [modal, setModal] = useState<ModalState>(null);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [saved, setSaved] = useState(false);
  const dateLabel = useMemo(() => new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "long" }).format(new Date()), []);

  useEffect(() => {
    if (isError) toast.error(error instanceof ApiError ? error.message : "브리핑을 불러오지 못했습니다.");
  }, [error, isError, toast]);

  async function shareBriefing() {
    const shareData = { title: "DARU 오늘의 3분 브리핑", text: "오늘 나에게 중요한 변화 3가지를 확인해 보세요.", url: window.location.href };
    if (navigator.share) {
      const shared = await navigator.share(shareData).then(() => true).catch(() => false);
      if (!shared) return;
    } else await navigator.clipboard.writeText(window.location.href);
    actions.share.mutate("today");
  }

  function startBriefing() {
    actions.start.mutate("today", { onSuccess: () => setModal({ type: "briefing", index: 0 }) });
  }

  function toggleSave() {
    const nextSaved = !saved;
    actions.save.mutate({ briefingId: "today", saved: nextSaved }, { onSuccess: () => setSaved(nextSaved) });
  }

  function sendFeedback(value: "up" | "down") {
    actions.feedback.mutate({ briefingId: "today", value }, { onSuccess: () => setFeedback(value) });
  }

  function showEvidence(priority: Priority) {
    setModal({ type: "evidence", priority });
  }

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) return <PageState icon={<Info className="text-[#f05d5e]" />} message="브리핑을 불러오지 못했어요" action={<Button isPending={isFetching} loadingText="다시 불러오는 중" onClick={() => refetch()}>다시 시도</Button>} />;

  return (
    <div id="top" className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-[1540px] px-4 py-5 sm:px-8 sm:py-8">
        <StatusBar updatedAt={data.updatedAt} />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,2.05fr)_minmax(330px,0.95fr)]"><HeroCard data={data} dateLabel={dateLabel} onStart={startBriefing} onShare={shareBriefing} startPending={actions.start.isPending} sharePending={actions.share.isPending} /><StockImpactCard stocks={data.stocks} /></div>
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2.05fr)_minmax(330px,0.95fr)]"><PrioritiesCard priorities={data.priorities} onEvidence={showEvidence} /><ScheduleCard schedule={data.schedule} /></div>
        <NewsClusters clusters={data.clusters} />
        <FeedbackBar updatedAt={data.updatedAt} feedback={feedback} saved={saved} onFeedback={sendFeedback} onSave={toggleSave} onShare={shareBriefing} feedbackPending={actions.feedback.isPending} savePending={actions.save.isPending} sharePending={actions.share.isPending} />
        <section id="settings" className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#12366c] px-6 py-6 text-white sm:flex-row sm:px-8"><div><p className="font-bold">이 브리핑을 매일 오전 7:30에 받아보세요</p><p className="mt-1 text-sm text-white/70">로그인하면 관심사, 출근 경로, 알림 시간을 저장할 수 있어요.</p></div><Link href="/login" className="focus-ring shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#12366c]">무료로 내 브리핑 만들기</Link></section>
      </main>
      <SiteFooter />
      <BriefingModal state={modal} priorities={data.priorities} onClose={() => setModal(null)} onChange={setModal} />
    </div>
  );
}

function StatusBar({ updatedAt }: { updatedAt: string }) {
  return <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm text-[#6c7a90]"><RefreshCw size={14} /> {updatedAt} 업데이트</div><div className="flex items-center gap-2 rounded-full bg-[#eaf5ef] px-3 py-1.5 text-xs font-bold text-[#228259]"><span className="h-2 w-2 rounded-full bg-[#28a86a]" /> 실시간 정보 정상</div></div>;
}

function PageState({ icon, message, action }: { icon: React.ReactNode; message: string; action?: React.ReactNode }) {
  return <><AppHeader /><div className="grid min-h-[70vh] place-items-center px-6 text-center text-[#173c72]"><div className="space-y-4">{icon}<p className="font-semibold">{message}</p>{action}</div></div></>;
}
