"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import { ApiError } from "@/lib/api/response";
import { useAuth } from "../AuthProvider";
import { login, socialLogin } from "../api";

export function useLoginMutation() {
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      auth.setUser(response.data.user);
      toast.success(response.message);
      window.setTimeout(() => router.push("/"), 500);
    },
    onError: (error) =>
      toast.error(
        error instanceof ApiError
          ? error.message
          : "로그인 중 오류가 발생했습니다.",
      ),
  });
}

export function useSocialLoginMutation() {
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();

  return useMutation({
    mutationFn: socialLogin,
    onSuccess: (response) => {
      auth.setUser(response.data.user);
      toast.success(response.message);
      window.setTimeout(() => router.push("/"), 500);
    },
    onError: (error) =>
      toast.error(
        error instanceof ApiError
          ? error.message
          : "소셜 로그인 중 오류가 발생했습니다.",
      ),
  });
}
