"use client";

import {
  Check,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { SocialProvider } from "../../model";
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "../../hooks/use-login-mutation";
import {
  loginFormStyles,
  rememberIndicatorVariants,
  socialButtonVariants,
  socialMarkVariants,
} from "./styles";

export function LoginForm() {
  const loginMutation = useLoginMutation();
  const socialLoginMutation = useSocialLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    loginMutation.mutate({
      email: String(form.get("email")),
      password: String(form.get("password")),
      remember,
    });
  }

  return (
    <div className={loginFormStyles.root}>
      <div className={loginFormStyles.intro}>
        <p className={loginFormStyles.eyebrow}>다시 만나 반가워요</p>
        <h1 className={loginFormStyles.title}>Gwiteem에 로그인</h1>
        <p className={loginFormStyles.description}>
          저장한 관심사와 출근 경로로 나만의 아침 브리핑을 이어서 확인하세요.
        </p>
      </div>

      <div className={loginFormStyles.socialGrid}>
        <SocialButton
          label="구글 로그인"
          provider="google"
          mutation={socialLoginMutation}
        />
        <SocialButton
          label="네이버 로그인"
          provider="naver"
          mutation={socialLoginMutation}
        />
        <SocialButton
          label="카카오 로그인"
          provider="kakao"
          mutation={socialLoginMutation}
        />
      </div>

      <div className={loginFormStyles.divider}>
        <span className={loginFormStyles.dividerLine} />
        또는 이메일로 로그인
        <span className={loginFormStyles.dividerLine} />
      </div>

      <form onSubmit={submit} className={loginFormStyles.form}>
        <label className={loginFormStyles.field}>
          <span className={loginFormStyles.fieldLabel}>이메일</span>
          <div className={loginFormStyles.fieldControl}>
            <Mail className={loginFormStyles.fieldIcon} size={18} />
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              className={loginFormStyles.emailInput}
            />
          </div>
        </label>
        <label className={loginFormStyles.field}>
          <div className={loginFormStyles.fieldHeader}>
            <span className={loginFormStyles.fieldLabelInline}>비밀번호</span>
            <Link href="#" className={loginFormStyles.forgotLink}>
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className={loginFormStyles.fieldControl}>
            <LockKeyhole className={loginFormStyles.fieldIcon} size={18} />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              minLength={6}
              placeholder="비밀번호 6자 이상"
              className={loginFormStyles.passwordInput}
            />
            <button
              type="button"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShowPassword(!showPassword)}
              className={loginFormStyles.visibilityButton}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <button
          type="button"
          role="checkbox"
          aria-checked={remember}
          onClick={() => setRemember(!remember)}
          className={loginFormStyles.rememberButton}
        >
          <span className={rememberIndicatorVariants({ checked: remember })}>
            {remember && <Check size={14} strokeWidth={3} />}
          </span>
          로그인 상태 유지
        </button>
        <Button
          type="submit"
          size="lg"
          className={loginFormStyles.submitButton}
          isPending={loginMutation.isPending}
          loadingText="로그인 중..."
        >
          로그인
        </Button>
      </form>

      <p className={loginFormStyles.signUpPrompt}>
        아직 계정이 없으신가요?{" "}
        <Link href="#" className={loginFormStyles.signUpLink}>
          무료로 시작하기
        </Link>
      </p>
      <Link href="/" className={loginFormStyles.guestLink}>
        로그인 없이 오늘 브리핑 보기
      </Link>
    </div>
  );
}

function SocialButton({
  label,
  provider,
  mutation,
}: {
  label: string;
  provider: SocialProvider;
  mutation: ReturnType<typeof useSocialLoginMutation>;
}) {
  const isCurrentPending =
    mutation.isPending && mutation.variables === provider;
  return (
    <button
      type="button"
      disabled={mutation.isPending}
      aria-busy={isCurrentPending}
      onClick={() => mutation.mutate(provider)}
      className={socialButtonVariants({ provider })}
    >
      <span className={socialMarkVariants({ provider })}>
        {isCurrentPending ? (
          <LoaderCircle size={20} className={loginFormStyles.loader} />
        ) : (
          <SocialBrandIcon provider={provider} />
        )}
      </span>
      <span className={loginFormStyles.socialLabel}>
        {isCurrentPending ? "연결 중..." : label}
      </span>
    </button>
  );
}

function SocialBrandIcon({ provider }: { provider: SocialProvider }) {
  if (provider === "naver") {
    return <span className={loginFormStyles.naverGlyph}>N</span>;
  }

  if (provider === "kakao") {
    return (
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={loginFormStyles.brandIcon}
      >
        <path
          fill="currentColor"
          d="M16 5C8.82 5 3 9.48 3 15c0 3.58 2.46 6.72 6.16 8.49l-1.2 4.42c-.11.4.35.72.7.49l5.25-3.48c.68.08 1.38.12 2.09.12 7.18 0 13-4.48 13-10.04S23.18 5 16 5Z"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={loginFormStyles.brandIcon}
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.9-1.75 2.98-4.33 2.98-7.42Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.64-2.43l-3.24-2.55c-.9.6-2.05.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.85A6.02 6.02 0 0 1 6.08 12c0-.64.11-1.26.31-1.85V7.53H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.47l3.35-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.02c1.47 0 2.79.5 3.83 1.5l2.88-2.87A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.96 5.53l3.35 2.62C7.18 7.78 9.39 6.02 12 6.02Z"
      />
    </svg>
  );
}
