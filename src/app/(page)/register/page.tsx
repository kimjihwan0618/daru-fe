"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import {
  useConfirmEmailVerificationCodeMutation,
  useRegisterMutation,
  useSendEmailVerificationCodeMutation,
} from "./hooks";
import { registerPageStyles } from "./styles";

export default function RegisterPage() {
  const registerMutation = useRegisterMutation();
  const sendCodeMutation = useSendEmailVerificationCodeMutation();
  const confirmCodeMutation = useConfirmEmailVerificationCodeMutation();

  return (
    <main className={registerPageStyles.root}>
      <header className={registerPageStyles.header}>
        <Link href="/" className={registerPageStyles.logo}>
          Gwiteem
        </Link>
        <Link href="/" className={registerPageStyles.backLink}>
          <ArrowLeft size={17} /> 메인으로
        </Link>
      </header>

      <section className={registerPageStyles.formContent}>
        <RegisterForm
          registerMutation={registerMutation}
          sendCodeMutation={sendCodeMutation}
          confirmCodeMutation={confirmCodeMutation}
        />
      </section>

      <footer className={registerPageStyles.footer}>
        <span>© 2026 Gwiteem</span>
        <nav className={registerPageStyles.footerLinks}>
          <Link href="#">이용약관</Link>
          <Link href="#">개인정보처리방침</Link>
        </nav>
      </footer>
    </main>
  );
}
