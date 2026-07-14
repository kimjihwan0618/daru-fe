"use client";

import { DashboardPage } from "@/components/domain/briefing/DashboardPage";
import { useBriefingMutations, useDailyBriefing } from "./hooks";

export default function Home() {
  const briefing = useDailyBriefing();
  const actions = useBriefingMutations();

  return <DashboardPage briefing={briefing} actions={actions} />;
}
