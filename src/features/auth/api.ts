import { apiClient } from "@/lib/api/client";
import { loginResultSchema, type LoginRequest, type SocialProvider } from "./model";

export function login(payload: LoginRequest) {
  return apiClient("/api/auth/login", loginResultSchema, { method: "POST", body: payload });
}

export function socialLogin(provider: SocialProvider) {
  return apiClient("/api/auth/social-login", loginResultSchema, { method: "POST", body: { provider } });
}
