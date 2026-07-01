"use client";

import { ChevronDown, LogOut, Settings2, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/components/ui/toast-provider";
import { useAuth } from "@/features/auth/auth-provider";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const toast = useToast();
  if (!user) return null;

  function handleLogout() {
    logout();
    setOpen(false);
    toast.info("로그아웃했습니다.");
  }

  return (
    <div className="relative">
      <button aria-label="프로필 메뉴" aria-expanded={open} onClick={() => setOpen(!open)} className="focus-ring flex items-center gap-2 rounded-full border border-transparent p-1 pr-2 hover:border-[#dce4ed] hover:bg-[#f7f9fc]">
        <Avatar name={user.name} avatarUrl={user.avatarUrl} />
        <span className="hidden text-sm font-bold text-[#263b56] md:inline">{user.name}</span>
        <ChevronDown size={15} className="hidden text-[#7c899a] md:block" />
      </button>
      {open && (
        <div className="card absolute right-0 top-[54px] z-50 w-[260px] overflow-hidden p-2 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-[#e9edf2] px-3 py-3"><Avatar name={user.name} avatarUrl={user.avatarUrl} /><div className="min-w-0"><p className="font-bold text-[#213650]">{user.name}</p><p className="truncate text-xs text-[#7b8798]">{user.email}</p></div></div>
          <div className="py-2"><button className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#4e6077] hover:bg-[#f4f7fa]"><UserRound size={17} /> 내 프로필</button><button className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#4e6077] hover:bg-[#f4f7fa]"><Settings2 size={17} /> 관심 설정</button></div>
          <button onClick={handleLogout} className="focus-ring flex w-full items-center gap-3 rounded-lg border-t border-[#e9edf2] px-3 py-3 text-sm font-semibold text-[#d65356] hover:bg-[#fff5f5]"><LogOut size={17} /> 로그아웃</button>
        </div>
      )}
    </div>
  );
}

function Avatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
  if (avatarUrl) return <Image src={avatarUrl} alt={`${name} 프로필`} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />;
  return <span className="grid h-10 w-10 place-items-center rounded-full bg-[#173c72] text-sm font-bold text-white">{name.slice(0, 1)}</span>;
}
