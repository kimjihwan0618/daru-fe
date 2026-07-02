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
        <h1 className={loginFormStyles.title}>DARU에 로그인</h1>
        <p className={loginFormStyles.description}>
          저장한 관심사와 출근 경로로 나만의 아침 브리핑을 이어서 확인하세요.
        </p>
      </div>

      <div className={loginFormStyles.socialGrid}>
        <SocialButton
          label="카카오"
          mark="K"
          provider="kakao"
          mutation={socialLoginMutation}
        />
        <SocialButton
          label="네이버"
          mark="N"
          provider="naver"
          mutation={socialLoginMutation}
        />
        <SocialButton
          label="Google"
          mark="G"
          provider="google"
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
      <p className={loginFormStyles.demoNotice}>
        현재는 UI 데모 단계입니다. FastAPI 인증 연동 전까지 입력한 정보는 서버에
        전송되지 않습니다.
      </p>
    </div>
  );
}

function SocialButton({
  label,
  mark,
  provider,
  mutation,
}: {
  label: string;
  mark: string;
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
      {isCurrentPending ? (
        <LoaderCircle size={17} className={loginFormStyles.loader} />
      ) : (
        <span className={loginFormStyles.socialMark}>{mark}</span>
      )}
      {isCurrentPending ? "연결 중..." : label}
    </button>
  );
}
