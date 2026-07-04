import type { ZodType } from "zod";
import { ApiError, apiResponseSchema, type ApiResponse } from "./response";

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

export async function apiClient<T>(
  path: string,
  dataSchema: ZodType<T>,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const response = await fetch(path, {
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
    const failure = payload as {
      message?: string;
      code?: string;
      error?: { message?: string; code?: string } | null;
    } | null;
    throw new ApiError(
      failure?.error?.message ??
        failure?.message ??
        "요청 처리 중 오류가 발생했습니다.",
      response.status,
      failure?.error?.code ?? failure?.code,
    );
  }

  const parsed = apiResponseSchema(dataSchema).safeParse(payload);
  if (!parsed.success) {
    throw new ApiError(
      "서버 응답 형식이 올바르지 않습니다.",
      response.status,
      "INVALID_RESPONSE",
    );
  }
  return parsed.data;
}
