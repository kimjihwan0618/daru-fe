"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/ToastProvider";
import {
  getBriefing,
  saveBriefing,
  startBriefing,
  submitBriefingFeedback,
  trackBriefingShare,
} from "@/features/briefing/api";
import { ApiError } from "@/lib/api/response";
import { queryKeys } from "@/lib/query-keys";

export function useDailyBriefing() {
  return useQuery({
    queryKey: queryKeys.briefing.daily("today"),
    queryFn: getBriefing,
    select: (response) => response.data,
  });
}

export function useBriefingMutations() {
  const toast = useToast();
  const onError = (error: Error) =>
    toast.error(
      error instanceof ApiError
        ? error.message
        : "요청 처리 중 오류가 발생했습니다.",
    );
  const onSuccess = (response: { message: string }) =>
    toast.success(response.message);

  const start = useMutation({ mutationFn: startBriefing, onSuccess, onError });
  const save = useMutation({ mutationFn: saveBriefing, onSuccess, onError });
  const feedback = useMutation({
    mutationFn: submitBriefingFeedback,
    onSuccess,
    onError,
  });
  const share = useMutation({
    mutationFn: trackBriefingShare,
    onSuccess,
    onError,
  });

  return { start, save, feedback, share };
}
