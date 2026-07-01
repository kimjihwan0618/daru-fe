import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getBriefing } from "../api";

export function useDailyBriefing() {
  return useQuery({
    queryKey: queryKeys.briefing.daily("today"),
    queryFn: getBriefing,
    select: (response) => response.data,
  });
}
