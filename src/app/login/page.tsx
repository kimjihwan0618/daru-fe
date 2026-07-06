import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { loginPageStyles } from "./styles";

export default function LoginPage() {
  return (
    <main className={loginPageStyles.root}>
      <header className={loginPageStyles.header}>
        <Link href="/" className={loginPageStyles.logo}>
          Gwiteem
        </Link>
        <Link href="/" className={loginPageStyles.backLink}>
          <ArrowLeft size={17} /> 메인으로
        </Link>
      </header>

      <section className={loginPageStyles.formContent}>
        <LoginForm />
      </section>

      <footer className={loginPageStyles.footer}>
        <span>© 2026 Gwiteem</span>
        <nav className={loginPageStyles.footerLinks}>
          <Link href="#">이용약관</Link>
          <Link href="#">개인정보처리방침</Link>
        </nav>
      </footer>
    </main>
  );
}
