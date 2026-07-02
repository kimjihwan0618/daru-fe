import { z, type ZodType } from "zod";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  code?: string;
}

export function apiResponseSchema<TSchema extends ZodType>(
  dataSchema: TSchema,
) {
  return z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string(),
    code: z.string().optional(),
  });
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
