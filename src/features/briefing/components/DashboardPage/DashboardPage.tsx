"use client";

import { Info, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import { ApiError } from "@/lib/api/response";
import { useDailyBriefing } from "../../hooks/use-daily-briefing";
import { useBriefingMutations } from "../../hooks/use-briefing-mutations";
import type { Priority } from "../../model";
import { BriefingModal, type ModalState } from "../BriefingModal";
import { DashboardSkeleton } from "../DashboardSkeleton";
import { FeedbackBar } from "../FeedbackBar";
import { HeroCard } from "../HeroCard";
import { NewsClusters } from "../NewsClusters";
import { PrioritiesCard } from "../PrioritiesCard";
import { ScheduleCard } from "../ScheduleCard";
import { StockImpactCard } from "../StockImpactCard";
import { dashboardPageStyles } from "./styles";

export function DashboardPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useDailyBriefing();
  const actions = useBriefingMutations();
  const toast = useToast();
  const [modal, setModal] = useState<ModalState>(null);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [saved, setSaved] = useState(false);
  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(new Date()),
    [],
  );

  useEffect(() => {
    if (isError)
      toast.error(
        error instanceof ApiError
          ? error.message
          : "브리핑을 불러오지 못했습니다.",
      );
  }, [error, isError, toast]);

  async function shareBriefing() {
    const shareData = {
      title: "Gwiteem 오늘의 3분 브리핑",
      text: "오늘 나에게 중요한 변화 3가지를 확인해 보세요.",
      url: window.location.href,
    };
    if (navigator.share) {
      const shared = await navigator
        .share(shareData)
        .then(() => true)
        .catch(() => false);
      if (!shared) return;
    } else await navigator.clipboard.writeText(window.location.href);
    actions.share.mutate("today");
  }

  function startBriefing() {
    actions.start.mutate("today", {
      onSuccess: () => setModal({ type: "briefing", index: 0 }),
    });
  }

  function toggleSave() {
    const nextSaved = !saved;
    actions.save.mutate(
      { briefingId: "today", saved: nextSaved },
      { onSuccess: () => setSaved(nextSaved) },
    );
  }

  function sendFeedback(value: "up" | "down") {
    actions.feedback.mutate(
      { briefingId: "today", value },
      { onSuccess: () => setFeedback(value) },
    );
  }

  function showEvidence(priority: Priority) {
    setModal({ type: "evidence", priority });
  }

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data)
    return (
      <PageState
        icon={<Info className={dashboardPageStyles.errorIcon} />}
        message="브리핑을 불러오지 못했어요"
        action={
          <Button
            isPending={isFetching}
            loadingText="다시 불러오는 중"
            onClick={() => refetch()}
          >
            다시 시도
          </Button>
        }
      />
    );

  return (
    <div id="top" className={dashboardPageStyles.root}>
      <AppHeader />
      <main className={dashboardPageStyles.main}>
        <StatusBar updatedAt={data.updatedAt} />
        <div className={dashboardPageStyles.primaryGrid}>
          <HeroCard
            data={data}
            dateLabel={dateLabel}
            onStart={startBriefing}
            onShare={shareBriefing}
            startPending={actions.start.isPending}
            sharePending={actions.share.isPending}
          />
          <StockImpactCard stocks={data.stocks} />
        </div>
        <div className={dashboardPageStyles.secondaryGrid}>
          <PrioritiesCard
            priorities={data.priorities}
            onEvidence={showEvidence}
          />
          <ScheduleCard schedule={data.schedule} />
        </div>
        <NewsClusters clusters={data.clusters} />
        <FeedbackBar
          updatedAt={data.updatedAt}
          feedback={feedback}
          saved={saved}
          onFeedback={sendFeedback}
          onSave={toggleSave}
          onShare={shareBriefing}
          feedbackPending={actions.feedback.isPending}
          savePending={actions.save.isPending}
          sharePending={actions.share.isPending}
        />
        <section id="settings" className={dashboardPageStyles.callout}>
          <div>
            <p className={dashboardPageStyles.calloutTitle}>
              이 브리핑을 매일 오전 7:30에 받아보세요
            </p>
            <p className={dashboardPageStyles.calloutDescription}>
              로그인하면 관심사, 출근 경로, 알림 시간을 저장할 수 있어요.
            </p>
          </div>
          <Link href="/register" className={dashboardPageStyles.calloutLink}>
            회원가입하고 내 브리핑 만들기
          </Link>
        </section>
      </main>
      <SiteFooter />
      <BriefingModal
        state={modal}
        priorities={data.priorities}
        onClose={() => setModal(null)}
        onChange={setModal}
      />
    </div>
  );
}

function StatusBar({ updatedAt }: { updatedAt: string }) {
  return (
    <div className={dashboardPageStyles.statusBar}>
      <div className={dashboardPageStyles.updatedAt}>
        <RefreshCw size={14} /> {updatedAt} 업데이트
      </div>
      <div className={dashboardPageStyles.liveStatus}>
        <span className={dashboardPageStyles.liveDot} /> 실시간 정보 정상
      </div>
    </div>
  );
}

function PageState({
  icon,
  message,
  action,
}: {
  icon: React.ReactNode;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <div className={dashboardPageStyles.state}>
        <div className={dashboardPageStyles.stateContent}>
          {icon}
          <p className={dashboardPageStyles.stateMessage}>{message}</p>
          {action}
        </div>
      </div>
    </>
  );
}
