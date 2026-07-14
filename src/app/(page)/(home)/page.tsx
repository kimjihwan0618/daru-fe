"use client";

import { DashboardPage } from "@/features/briefing/components/DashboardPage";
import { useBriefingMutations, useDailyBriefing } from "./hooks";

export default function Home() {
  const briefing = useDailyBriefing();
  const actions = useBriefingMutations();

  return <DashboardPage briefing={briefing} actions={actions} />;
}
