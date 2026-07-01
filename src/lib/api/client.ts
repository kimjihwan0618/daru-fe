import type { ZodType } from "zod";
import { ApiError, apiResponseSchema, type ApiResponse } from "./response";

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const DEVELOPMENT_DELAY_MS = 1_000;

export async function apiClient<T>(path: string, dataSchema: ZodType<T>, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  // TODO: 실제 FastAPI 연동 시 제거하거나 NEXT_PUBLIC_API_DELAY 환경변수로 전환합니다.
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, DEVELOPMENT_DELAY_MS));
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = payload as { message?: string; code?: string } | null;
    throw new ApiError(error?.message ?? "요청 처리 중 오류가 발생했습니다.", response.status, error?.code);
  }

  const parsed = apiResponseSchema(dataSchema).safeParse(payload);
  if (!parsed.success) throw new ApiError("서버 응답 형식이 올바르지 않습니다.", response.status, "INVALID_RESPONSE");
  return parsed.data;
}
