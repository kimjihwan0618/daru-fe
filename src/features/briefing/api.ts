import { apiClient } from "@/lib/api/client";
import {
  briefingActionResultSchema,
  briefingSchema,
  type FeedbackValue,
} from "./model";

export function getBriefing() {
  return apiClient("/api/briefing", briefingSchema);
}

export function startBriefing(briefingId: string) {
  return apiClient("/api/briefing/start", briefingActionResultSchema, {
    method: "POST",
    body: { briefingId },
  });
}

export function saveBriefing(payload: { briefingId: string; saved: boolean }) {
  return apiClient("/api/briefing/save", briefingActionResultSchema, {
    method: "POST",
    body: payload,
  });
}

export function submitBriefingFeedback(payload: {
  briefingId: string;
  value: FeedbackValue;
}) {
  return apiClient("/api/briefing/feedback", briefingActionResultSchema, {
    method: "POST",
    body: payload,
  });
}

export function trackBriefingShare(briefingId: string) {
  return apiClient("/api/briefing/share", briefingActionResultSchema, {
    method: "POST",
    body: { briefingId },
  });
}
