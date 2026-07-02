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
  {
    icon: Clock3,
    title: "내 출근 시간에 맞춰",
    description: "교통과 날씨 변화를 반영해 출발 시각을 알려드려요.",
  },
  {
    icon: Sparkles,
    title: "관심 이슈만 3분 안에",
    description: "중복 뉴스를 걷어내고 나와 관련된 변화만 요약해요.",
  },
  {
    icon: BellRing,
    title: "원하는 시간에 먼저",
    description: "앱을 열기 전에 오늘의 브리핑을 받아볼 수 있어요.",
  },
];

export default function LoginPage() {
  return (
    <main className={loginPageStyles.root}>
      <section className={loginPageStyles.brandPanel}>
        <div className={loginPageStyles.ringDecoration} />
        <div className={loginPageStyles.glowDecoration} />
        <Link href="/" className={loginPageStyles.brandLogo}>
          DARU
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
          <p className={loginPageStyles.description}>
            뉴스, 교통, 날씨, 관심 종목을 따로 확인하지 않아도 DARU가 오늘
            나에게 중요한 순서로 정리합니다.
          </p>
          <div className={loginPageStyles.benefits}>
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className={loginPageStyles.benefit}>
                <span className={loginPageStyles.benefitIcon}>
                  <Icon size={21} />
                </span>
                <div>
                  <h3 className={loginPageStyles.benefitTitle}>{title}</h3>
                  <p className={loginPageStyles.benefitDescription}>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className={loginPageStyles.copyright}>
          © 2026 DARU. 매일 나에게 필요한 변화만.
        </p>
      </section>

      <section className={loginPageStyles.formPanel}>
        <div className={loginPageStyles.formHeader}>
          <Link href="/" className={loginPageStyles.mobileLogo}>
            DARU
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
