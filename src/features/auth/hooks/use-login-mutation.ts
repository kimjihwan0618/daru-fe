"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import { ApiError } from "@/lib/api/response";
import { useAuth } from "../AuthProvider";
import {
  completeSocialLogin,
  getSocialLoginUrl,
  login,
  register,
} from "../api";

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

export function useSocialCallbackMutation() {
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();
  return useMutation({
    mutationFn: completeSocialLogin,
    onSuccess: (response) => {
      auth.setUser(response.data.user);
      toast.success(response.message);
      router.replace("/");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "소셜 로그인을 완료하지 못했습니다.")),
  });
}

export function useRegisterMutation() {
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      auth.setUser(response.data.user);
      toast.success(response.message);
      router.push("/");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "회원가입 중 오류가 발생했습니다.")),
  });
}
