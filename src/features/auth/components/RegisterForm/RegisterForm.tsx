"use client";

import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRegisterMutation } from "../../hooks/use-login-mutation";
import { registerFormStyles } from "./styles";

export function RegisterForm() {
  const registerMutation = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    registerMutation.mutate({
      nickname: String(form.get("nickname")),
      email: String(form.get("email")),
      password: String(form.get("password")),
      remember: true,
    });
  }

  return (
    <div className={registerFormStyles.root}>
      <div className={registerFormStyles.intro}>
        <h1 className={registerFormStyles.title}>회원가입</h1>
        <p className={registerFormStyles.description}>
          기본 정보만 입력하면 바로 시작할 수 있어요.
        </p>
      </div>
      <form onSubmit={submit} className={registerFormStyles.form}>
        <label className={registerFormStyles.field}>
          <span className={registerFormStyles.label}>닉네임</span>
          <div className={registerFormStyles.fieldControl}>
            <UserRound className={registerFormStyles.fieldIcon} size={18} />
            <Input
              name="nickname"
              required
              autoComplete="nickname"
              placeholder="브리핑에서 사용할 이름"
              className={registerFormStyles.input}
            />
          </div>
        </label>
        <label className={registerFormStyles.field}>
          <span className={registerFormStyles.label}>이메일</span>
          <div className={registerFormStyles.fieldControl}>
            <Mail className={registerFormStyles.fieldIcon} size={18} />
            <Input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@example.com"
              className={registerFormStyles.input}
            />
          </div>
        </label>
        <label className={registerFormStyles.field}>
          <span className={registerFormStyles.label}>비밀번호</span>
          <div className={registerFormStyles.fieldControl}>
            <LockKeyhole className={registerFormStyles.fieldIcon} size={18} />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="비밀번호 6자 이상"
              className={registerFormStyles.passwordInput}
            />
            <button
              type="button"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShowPassword(!showPassword)}
              className={registerFormStyles.visibilityButton}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <Button
          type="submit"
          size="lg"
          className={registerFormStyles.submit}
          isPending={registerMutation.isPending}
          loadingText="가입 중..."
        >
          회원가입
        </Button>
      </form>
      <p className={registerFormStyles.loginPrompt}>
        이미 계정이 있나요?{" "}
        <Link href="/login" className={registerFormStyles.loginLink}>
          로그인
        </Link>
      </p>
    </div>
  );
}
