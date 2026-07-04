"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRegisterMutation } from "../../hooks/use-login-mutation";
import { registerFormStyles } from "./styles";

export function RegisterForm() {
  const registerMutation = useRegisterMutation();

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
      <h1 className={registerFormStyles.title}>DARU 시작하기</h1>
      <p className={registerFormStyles.description}>
        계정을 만들고 나만의 출퇴근 브리핑을 받아보세요.
      </p>
      <form onSubmit={submit} className={registerFormStyles.form}>
        <label className={registerFormStyles.field}>
          <span className={registerFormStyles.label}>닉네임</span>
          <Input name="nickname" required autoComplete="nickname" />
        </label>
        <label className={registerFormStyles.field}>
          <span className={registerFormStyles.label}>이메일</span>
          <Input name="email" type="email" required autoComplete="email" />
        </label>
        <label className={registerFormStyles.field}>
          <span className={registerFormStyles.label}>비밀번호</span>
          <Input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>
        <Button
          type="submit"
          size="lg"
          className={registerFormStyles.submit}
          isPending={registerMutation.isPending}
          loadingText="가입 중..."
        >
          무료로 시작하기
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
