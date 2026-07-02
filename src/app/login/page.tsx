import {
  ArrowLeft,
  BellRing,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { loginPageStyles } from "./styles";

const benefits = [
  { icon: Clock3, title: "내 출근 시간에 맞춰" },
  { icon: Sparkles, title: "관심 이슈만 3분 안에" },
  { icon: BellRing, title: "원하는 시간에 먼저" },
];

export default function LoginPage() {
  return (
    <main className={loginPageStyles.root}>
      <section className={loginPageStyles.brandPanel}>
        <div className={loginPageStyles.ringDecoration} />
        <div className={loginPageStyles.glowDecoration} />
        <Link href="/" className={loginPageStyles.brandLogo}>
          Gwiteem
        </Link>
        <div className={loginPageStyles.brandContent}>
          <span className={loginPageStyles.promiseBadge}>
            <CheckCircle2 size={15} /> 매일 필요한 변화만
          </span>
          <h2 className={loginPageStyles.headline}>
            복잡한 아침을
            <br />
            3분으로 줄이세요.
          </h2>
          <div className={loginPageStyles.benefits}>
            {benefits.map(({ icon: Icon, title }) => (
              <div key={title} className={loginPageStyles.benefit}>
                <span className={loginPageStyles.benefitIcon}>
                  <Icon size={21} />
                </span>
                <h3 className={loginPageStyles.benefitTitle}>{title}</h3>
              </div>
            ))}
          </div>
        </div>
        <p className={loginPageStyles.copyright}>
          © 2026 Gwiteem. 매일 나에게 필요한 변화만.
        </p>
      </section>

      <section className={loginPageStyles.formPanel}>
        <div className={loginPageStyles.formHeader}>
          <Link href="/" className={loginPageStyles.mobileLogo}>
            Gwiteem
          </Link>
          <Link href="/" className={loginPageStyles.backLink}>
            <ArrowLeft size={17} /> 메인으로
          </Link>
        </div>
        <div className={loginPageStyles.formContent}>
          <LoginForm />
        </div>
        <div className={loginPageStyles.footerLinks}>
          <Link href="#">이용약관</Link>
          <Link href="#">개인정보처리방침</Link>
          <Link href="#">문의하기</Link>
        </div>
      </section>
    </main>
  );
}
