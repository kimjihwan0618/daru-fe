"use client";

import { Check, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => router.push("/"), 700);
  }

  return (
    <div className="w-full max-w-[430px]">
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold text-[#24558e]">다시 만나 반가워요</p>
        <h1 className="text-[34px] font-extrabold tracking-[-0.045em] text-[#122844]">DARU에 로그인</h1>
        <p className="mt-3 leading-7 text-[#6b788c]">저장한 관심사와 출근 경로로 나만의 아침 브리핑을 이어서 확인하세요.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <SocialButton label="카카오" mark="K" className="border-[#f2dc67] bg-[#fee500] text-[#342c00] hover:bg-[#f7de00]" />
        <SocialButton label="네이버" mark="N" className="border-[#03c75a] bg-[#03c75a] text-white hover:bg-[#02b852]" />
        <SocialButton label="Google" mark="G" />
      </div>

      <div className="my-7 flex items-center gap-4 text-xs font-medium text-[#98a2b1]"><span className="h-px flex-1 bg-[#e1e7ef]" />또는 이메일로 로그인<span className="h-px flex-1 bg-[#e1e7ef]" /></div>

      <form onSubmit={submit} className="space-y-5">
        <label className="block"><span className="mb-2 block text-sm font-bold text-[#263b56]">이메일</span><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a98aa]" size={18} /><Input name="email" type="email" autoComplete="email" required placeholder="name@example.com" className="pl-11" /></div></label>
        <label className="block"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-bold text-[#263b56]">비밀번호</span><Link href="#" className="focus-ring rounded text-xs font-bold text-[#285b97]">비밀번호를 잊으셨나요?</Link></div><div className="relative"><LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a98aa]" size={18} /><Input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required minLength={6} placeholder="비밀번호 6자 이상" className="px-11" /><button type="button" aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"} onClick={() => setShowPassword(!showPassword)} className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8492a5]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
        <button type="button" role="checkbox" aria-checked={remember} onClick={() => setRemember(!remember)} className="focus-ring flex items-center gap-2 rounded-lg text-sm font-medium text-[#596980]"><span className={`grid h-5 w-5 place-items-center rounded-md border ${remember ? "border-[#17457d] bg-[#17457d] text-white" : "border-[#c9d3df] bg-white"}`}>{remember && <Check size={14} strokeWidth={3} />}</span>로그인 상태 유지</button>
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>{submitting ? "브리핑을 불러오는 중..." : "로그인"}</Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#718096]">아직 계정이 없으신가요? <Link href="#" className="focus-ring rounded font-bold text-[#194b84]">무료로 시작하기</Link></p>
      <Link href="/" className="focus-ring mx-auto mt-6 block w-fit rounded-lg text-sm font-semibold text-[#64758c] hover:text-[#173f76]">로그인 없이 오늘 브리핑 보기</Link>
      <p className="mt-6 rounded-xl bg-[#f3f6fa] px-4 py-3 text-center text-xs leading-5 text-[#758399]">현재는 UI 데모 단계입니다. FastAPI 인증 연동 전까지 입력한 정보는 서버에 전송되지 않습니다.</p>
    </div>
  );
}

function SocialButton({ label, mark, className = "" }: { label: string; mark: string; className?: string }) {
  return <Button variant="social" size="md" className={`w-full ${className}`}><span className="grid h-5 w-5 place-items-center rounded text-xs font-black">{mark}</span>{label}</Button>;
}
