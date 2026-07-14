import { z } from "zod";
import { apiClient } from "@/lib/api/client";
import {
  loginResultSchema,
  sessionResultSchema,
  socialLoginUrlSchema,
  type LoginRequest,
  type EmailCodeConfirmRequest,
  type EmailCodeSendRequest,
  type OAuthCallbackRequest,
  type PasswordResetRequest,
  type RegisterRequest,
  type SocialProvider,
} from "./model";

export function login(payload: LoginRequest) {
  return apiClient("/api/auth/login", loginResultSchema, {
    method: "POST",
    body: payload,
  });
}

export function register(payload: RegisterRequest) {
  return apiClient("/api/auth/register", loginResultSchema, {
    method: "POST",
    body: payload,
  });
}

export function sendEmailVerificationCode(payload: EmailCodeSendRequest) {
  return apiClient("/api/auth/email-verification", z.null(), {
    method: "POST",
    body: payload,
  });
}

export function confirmEmailVerificationCode(payload: EmailCodeConfirmRequest) {
  return apiClient("/api/auth/email-verification/confirm", z.null(), {
    method: "POST",
    body: payload,
  });
}

export function sendPasswordResetCode(payload: EmailCodeSendRequest) {
  return apiClient("/api/auth/password-reset/code", z.null(), {
    method: "POST",
    body: payload,
  });
}

export function confirmPasswordResetCode(payload: EmailCodeConfirmRequest) {
  return apiClient("/api/auth/password-reset/code/confirm", z.null(), {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(payload: PasswordResetRequest) {
  return apiClient("/api/auth/password-reset", z.null(), {
    method: "POST",
    body: payload,
  });
}

export function getSocialLoginUrl(provider: SocialProvider) {
  return apiClient(
    `/api/auth/social-login?provider=${encodeURIComponent(provider)}`,
    socialLoginUrlSchema,
  );
}

export function completeSocialLogin(payload: OAuthCallbackRequest) {
  return apiClient("/api/auth/callback", loginResultSchema, {
    method: "POST",
    body: payload,
  });
}

export function getSession() {
  return apiClient("/api/auth/session", sessionResultSchema);
}

export function refreshSession() {
  return apiClient("/api/auth/refresh", z.null(), { method: "POST" });
}

export function logoutSession() {
  return apiClient("/api/auth/logout", z.null(), { method: "POST" });
}

export function withdraw() {
  return apiClient("/api/auth/withdraw", z.null(), { method: "DELETE" });
}
