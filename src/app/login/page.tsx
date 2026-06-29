import { ArrowLeft, BellRing, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

const benefits = [
  { icon: Clock3, title: "내 출근 시간에 맞춰", description: "교통과 날씨 변화를 반영해 출발 시각을 알려드려요." },
  { icon: Sparkles, title: "관심 이슈만 3분 안에", description: "중복 뉴스를 걷어내고 나와 관련된 변화만 요약해요." },
  { icon: BellRing, title: "원하는 시간에 먼저", description: "앱을 열기 전에 오늘의 브리핑을 받아볼 수 있어요." },
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[1.02fr_0.98fr]">
      <section className="relative hidden overflow-hidden bg-[#102f60] px-12 py-10 text-white lg:flex lg:flex-col xl:px-20">
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border-[80px] border-white/[0.035]" />
        <div className="absolute -bottom-28 -left-20 h-[380px] w-[380px] rounded-full bg-[#2d68a5]/20 blur-3xl" />
        <Link href="/" className="focus-ring relative z-10 w-fit rounded text-2xl font-black italic tracking-[-0.04em]">DARU</Link>
        <div className="relative z-10 my-auto max-w-[540px]">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-[#dceaff]"><CheckCircle2 size={15} /> 매일 필요한 변화만</span>
          <h2 className="mt-7 text-[46px] font-extrabold leading-[1.2] tracking-[-0.055em] xl:text-[54px]">복잡한 아침을<br />3분으로 줄이세요.</h2>
          <p className="mt-5 max-w-[470px] text-lg leading-8 text-[#c2d0e3]">뉴스, 교통, 날씨, 관심 종목을 따로 확인하지 않아도 DARU가 오늘 나에게 중요한 순서로 정리합니다.</p>
          <div className="mt-10 space-y-5">{benefits.map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-[#bcd5f5]"><Icon size={21} /></span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#9fb2cb]">{description}</p></div></div>)}</div>
        </div>
        <p className="relative z-10 text-xs text-white/45">© 2026 DARU. 매일 나에게 필요한 변화만.</p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14 xl:px-24">
        <div className="flex items-center justify-between lg:justify-end"><Link href="/" className="text-2xl font-black italic text-[#12366c] lg:hidden">DARU</Link><Link href="/" className="focus-ring flex items-center gap-2 rounded-lg text-sm font-semibold text-[#64758b] hover:text-[#173f76]"><ArrowLeft size={17} /> 메인으로</Link></div>
        <div className="flex flex-1 items-center justify-center py-10"><LoginForm /></div>
        <div className="flex justify-center gap-5 text-xs text-[#8a95a5]"><Link href="#">이용약관</Link><Link href="#">개인정보처리방침</Link><Link href="#">문의하기</Link></div>
      </section>
    </main>
  );
}
