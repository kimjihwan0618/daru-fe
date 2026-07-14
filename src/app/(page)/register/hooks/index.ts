"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import { useAuth } from "@/features/auth/AuthProvider";
import {
  confirmEmailVerificationCode,
  register,
  sendEmailVerificationCode,
} from "@/features/auth/api";
import { ApiError } from "@/lib/api/response";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
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

export function useSendEmailVerificationCodeMutation() {
  const toast = useToast();
  return useMutation({
    mutationFn: sendEmailVerificationCode,
    onSuccess: (response) => toast.success(response.message),
    onError: (error) =>
      toast.error(getErrorMessage(error, "인증번호를 발송하지 못했습니다.")),
  });
}

export function useConfirmEmailVerificationCodeMutation() {
  const toast = useToast();
  return useMutation({
    mutationFn: confirmEmailVerificationCode,
    onSuccess: (response) => toast.success(response.message),
    onError: (error) =>
      toast.error(getErrorMessage(error, "인증번호를 확인하지 못했습니다.")),
  });
}
