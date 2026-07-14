"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import {
  confirmPasswordResetCode,
  resetPassword,
  sendPasswordResetCode,
} from "@/features/auth/api";
import { ApiError } from "@/lib/api/response";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

export function useSendPasswordResetCodeMutation() {
  const toast = useToast();
  return useMutation({
    mutationFn: sendPasswordResetCode,
    onSuccess: (response) => toast.success(response.message),
    onError: (error) =>
      toast.error(getErrorMessage(error, "인증번호를 발송하지 못했습니다.")),
  });
}

export function useConfirmPasswordResetCodeMutation() {
  const toast = useToast();
  return useMutation({
    mutationFn: confirmPasswordResetCode,
    onSuccess: (response) => toast.success(response.message),
    onError: (error) =>
      toast.error(getErrorMessage(error, "인증번호를 확인하지 못했습니다.")),
  });
}

export function useResetPasswordMutation() {
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      toast.success(response.message);
      router.push("/login");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "비밀번호를 변경하지 못했습니다.")),
  });
}
