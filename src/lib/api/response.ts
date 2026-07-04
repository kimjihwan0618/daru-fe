import { z, type ZodType } from "zod";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: {
    code: string;
    message: string;
  } | null;
}

export function apiResponseSchema<TSchema extends ZodType>(
  dataSchema: TSchema,
) {
  return z
    .object({
      success: z.boolean(),
      data: dataSchema,
      error: z
        .object({ code: z.string(), message: z.string() })
        .nullable()
        .optional(),
      message: z.string().optional(),
    })
    .transform((response) => ({
      ...response,
      message: response.message ?? "요청이 완료되었습니다.",
    }));
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
