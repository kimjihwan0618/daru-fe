"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import { useAuth } from "@/features/auth/AuthProvider";
import { getSocialLoginUrl, login } from "@/features/auth/api";
import { ApiError } from "@/lib/api/response";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

export function useLoginMutation() {
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      auth.setUser(response.data.user);
      toast.success(response.message);
      router.push("/");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "로그인 중 오류가 발생했습니다.")),
  });
}

export function useSocialLoginMutation() {
  const toast = useToast();
  return useMutation({
    mutationFn: getSocialLoginUrl,
    onSuccess: (response) => window.location.assign(response.data.loginUrl),
    onError: (error) =>
      toast.error(
        getErrorMessage(error, "소셜 로그인 연결 중 오류가 발생했습니다."),
      ),
  });
}
