import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean(),
});

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().nullable().optional(),
});

export const loginResultSchema = z.object({ user: authUserSchema });

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;

export const socialProviderSchema = z.enum(["kakao", "naver", "google"]);
export type SocialProvider = z.infer<typeof socialProviderSchema>;
