"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ApiResponse } from "@/lib/api/response";
import {
  formatVerificationTime,
  useVerificationTimer,
} from "@/app/(page)/hooks/use-verification-timer";
import {
  emailCodeSendRequestSchema,
  type EmailCodeConfirmRequest,
  type EmailCodeSendRequest,
  type PasswordResetRequest,
} from "@/app/(page)/type/auth";
import { isPasswordValid } from "@/app/(page)/type/password";
import { PasswordRuleHint } from "../PasswordRuleHint";
import { passwordResetFormStyles } from "./styles";

export function PasswordResetForm({
  sendCodeMutation,
  confirmCodeMutation,
  resetPasswordMutation,
}: {
  sendCodeMutation: UseMutationResult<
    ApiResponse<null>,
    Error,
    EmailCodeSendRequest,
    unknown
  >;
  confirmCodeMutation: UseMutationResult<
    ApiResponse<null>,
    Error,
    EmailCodeConfirmRequest,
    unknown
  >;
  resetPasswordMutation: UseMutationResult<
    ApiResponse<null>,
    Error,
    PasswordResetRequest,
    unknown
  >;
}) {
  const verificationTimer = useVerificationTimer();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [hasSentCode, setHasSentCode] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = emailCodeSendRequestSchema.safeParse({ email }).success;
  const isEmailVerified = verifiedEmail === email;
  const doPasswordsMatch =
    newPassword.length > 0 && newPassword === passwordConfirmation;
  const canResetPassword =
    isEmailVerified &&
    isPasswordValid(newPassword) &&
    doPasswordsMatch &&
    !resetPasswordMutation.isPending;

  function changeEmail(nextEmail: string) {
    setEmail(nextEmail);
    if (nextEmail === email) return;
    setHasSentCode(false);
    setVerificationCode("");
    setVerifiedEmail(null);
    verificationTimer.stop();
  }

  function sendResetCode() {
    if (!isEmailValid) return;
    sendCodeMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setHasSentCode(true);
          setVerificationCode("");
          setVerifiedEmail(null);
          verificationTimer.start();
        },
      },
    );
  }

  function confirmResetCode() {
    if (!verificationCode.trim() || verificationTimer.remainingSeconds <= 0)
      return;
    confirmCodeMutation.mutate(
      { email, code: verificationCode.trim() },
      {
        onSuccess: () => {
          setVerifiedEmail(email);
          verificationTimer.stop();
        },
      },
    );
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canResetPassword) return;
    resetPasswordMutation.mutate({ email, newPassword });
  }

  return (
    <div className={passwordResetFormStyles.root}>
      <div className={passwordResetFormStyles.intro}>
        <h1 className={passwordResetFormStyles.title}>비밀번호 재설정</h1>
        <p className={passwordResetFormStyles.description}>
          이메일 인증 후 새 비밀번호를 설정하세요.
        </p>
      </div>

      <form onSubmit={submit} className={passwordResetFormStyles.form}>
        <label className={passwordResetFormStyles.field}>
          <span className={passwordResetFormStyles.label}>이메일</span>
          <div className={passwordResetFormStyles.inputActionRow}>
            <div className={passwordResetFormStyles.fieldControl}>
              <Mail className={passwordResetFormStyles.fieldIcon} size={18} />
              <Input
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => changeEmail(event.target.value)}
                autoComplete="email"
                placeholder="name@example.com"
                className={passwordResetFormStyles.input}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              className={passwordResetFormStyles.actionButton}
              disabled={!isEmailValid || isEmailVerified}
              isPending={sendCodeMutation.isPending}
              loadingText="발송 중"
              onClick={sendResetCode}
            >
              {hasSentCode ? "재발송" : "인증번호 받기"}
            </Button>
          </div>
        </label>

        {hasSentCode && !isEmailVerified && (
          <div className={passwordResetFormStyles.verificationBlock}>
            <label className={passwordResetFormStyles.field}>
              <span className={passwordResetFormStyles.label}>인증번호</span>
              <div className={passwordResetFormStyles.inputActionRow}>
                <div className={passwordResetFormStyles.fieldControl}>
                  <KeyRound
                    className={passwordResetFormStyles.fieldIcon}
                    size={18}
                  />
                  <Input
                    name="verificationCode"
                    value={verificationCode}
                    onChange={(event) =>
                      setVerificationCode(event.target.value)
                    }
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="인증번호 입력"
                    className={passwordResetFormStyles.codeInput}
                  />
                  <span className={passwordResetFormStyles.timer}>
                    {formatVerificationTime(verificationTimer.remainingSeconds)}
                  </span>
                </div>
                <Button
                  type="button"
                  className={passwordResetFormStyles.actionButton}
                  disabled={
                    !verificationCode.trim() ||
                    verificationTimer.remainingSeconds <= 0
                  }
                  isPending={confirmCodeMutation.isPending}
                  loadingText="확인 중"
                  onClick={confirmResetCode}
                >
                  인증 확인
                </Button>
              </div>
            </label>
            {verificationTimer.remainingSeconds <= 0 && (
              <p className={passwordResetFormStyles.expiredMessage}>
                인증번호가 만료되었습니다. 다시 발송해 주세요.
              </p>
            )}
          </div>
        )}

        {isEmailVerified && (
          <p className={passwordResetFormStyles.verifiedMessage}>
            <CheckCircle2 size={15} /> 이메일 인증이 완료되었습니다.
          </p>
        )}

        <label className={passwordResetFormStyles.field}>
          <span className={passwordResetFormStyles.label}>새 비밀번호</span>
          <div className={passwordResetFormStyles.fieldControl}>
            <LockKeyhole
              className={passwordResetFormStyles.fieldIcon}
              size={18}
            />
            <Input
              name="newPassword"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              maxLength={16}
              autoComplete="new-password"
              placeholder="새 비밀번호"
              className={passwordResetFormStyles.passwordInput}
            />
            <button
              type="button"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShowPassword(!showPassword)}
              className={passwordResetFormStyles.visibilityButton}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <PasswordRuleHint password={newPassword} />
        </label>

        <label className={passwordResetFormStyles.field}>
          <span className={passwordResetFormStyles.label}>
            새 비밀번호 확인
          </span>
          <div className={passwordResetFormStyles.fieldControl}>
            <LockKeyhole
              className={passwordResetFormStyles.fieldIcon}
              size={18}
            />
            <Input
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              maxLength={16}
              autoComplete="new-password"
              placeholder="새 비밀번호 다시 입력"
              className={passwordResetFormStyles.input}
            />
          </div>
          {passwordConfirmation.length > 0 && !doPasswordsMatch && (
            <p className={passwordResetFormStyles.mismatchMessage}>
              새 비밀번호가 일치하지 않습니다.
            </p>
          )}
        </label>

        <Button
          type="submit"
          size="lg"
          className={passwordResetFormStyles.submit}
          disabled={!canResetPassword}
          isPending={resetPasswordMutation.isPending}
          loadingText="변경 중..."
        >
          비밀번호 변경
        </Button>
        {!isEmailVerified && (
          <p className={passwordResetFormStyles.submitHint}>
            이메일 인증을 완료하면 비밀번호를 변경할 수 있습니다.
          </p>
        )}
      </form>

      <Link href="/login" className={passwordResetFormStyles.loginLink}>
        로그인으로 돌아가기
      </Link>
    </div>
  );
}
