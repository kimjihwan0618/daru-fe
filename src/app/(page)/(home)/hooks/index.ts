"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/ToastProvider";
import { apiClient } from "@/lib/api/client";
import { ApiError } from "@/lib/api/response";
import { queryKeys } from "@/lib/query-keys";
import {
  briefingActionResultSchema,
  briefingSchema,
  type FeedbackValue,
} from "../type/briefing";

function getBriefing() {
  return apiClient("/api/briefing", briefingSchema);
}

function startBriefing(briefingId: string) {
  return apiClient("/api/briefing/start", briefingActionResultSchema, {
    method: "POST",
    body: { briefingId },
  });
}

function saveBriefing(payload: { briefingId: string; saved: boolean }) {
  return apiClient("/api/briefing/save", briefingActionResultSchema, {
    method: "POST",
    body: payload,
  });
}

function submitBriefingFeedback(payload: {
  briefingId: string;
  value: FeedbackValue;
}) {
  return apiClient("/api/briefing/feedback", briefingActionResultSchema, {
    method: "POST",
    body: payload,
  });
}

function trackBriefingShare(briefingId: string) {
  return apiClient("/api/briefing/share", briefingActionResultSchema, {
    method: "POST",
    body: { briefingId },
  });
}

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