"use client";

import { Bell, BellRing, CarFront, CheckCheck, Sparkles, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { dummyNotifications } from "@/features/notification/model";

const typeIcons = { briefing: Sparkles, market: TrendingUp, commute: CarFront };
const typeStyles = { briefing: "bg-[#eaf1fb] text-[#24588f]", market: "bg-[#f0ebfb] text-[#7452a2]", commute: "bg-[#eaf7f0] text-[#27825a]" };

export function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const unreadCount = useMemo(() => notifications.filter((item) => !item.isRead).length, [notifications]);

  function markAllAsRead() {
    setNotifications((items) => items.map((item) => ({ ...item, isRead: true })));
  }

  function readOne(id: string) {
    setNotifications((items) => items.map((item) => item.id === id ? { ...item, isRead: true } : item));
  }

  return (
    <div className="relative">
      <button aria-label="알림 목록" aria-expanded={open} onClick={() => setOpen(!open)} className="focus-ring relative rounded-full p-2.5 hover:bg-[#f4f7fb]">
        <Bell size={20} />
        {unreadCount > 0 && <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#ef5559] px-1 text-[10px] font-bold text-white ring-2 ring-white">{unreadCount}</span>}
      </button>

      {open && (
        <div className="card absolute right-[-56px] top-[52px] z-50 w-[min(370px,calc(100vw-2rem))] overflow-hidden shadow-2xl sm:right-0">
          <div className="flex items-center justify-between border-b border-[#e6ebf1] px-5 py-4">
            <div><h2 className="font-bold">알림</h2><p className="mt-0.5 text-xs text-[#788599]">읽지 않은 알림 {unreadCount}개</p></div>
            <button onClick={markAllAsRead} disabled={unreadCount === 0} className="focus-ring flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-[#2a5c96] disabled:text-[#a1aab6]"><CheckCheck size={15} /> 모두 읽음</button>
          </div>
          <div className="max-h-[410px] overflow-y-auto">
            {notifications.map((notice) => {
              const Icon = typeIcons[notice.type];
              return (
                <button key={notice.id} onClick={() => readOne(notice.id)} className={cn("focus-ring flex w-full gap-3 border-b border-[#edf1f5] px-5 py-4 text-left transition hover:bg-[#f7f9fc]", !notice.isRead && "bg-[#f5f8fd]")}> 
                  <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", typeStyles[notice.type])}><Icon size={19} /></span>
                  <span className="min-w-0 flex-1"><span className="flex items-start gap-2"><strong className="flex-1 text-sm leading-5 text-[#203650]">{notice.title}</strong>{!notice.isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2e65a4]" />}</span><span className="mt-1 block text-xs leading-5 text-[#718096]">{notice.description}</span><span className="mt-2 block text-[11px] text-[#98a2b0]">{notice.createdAt}</span></span>
                </button>
              );
            })}
          </div>
          <button className="focus-ring flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-[#315b8c] hover:bg-[#f7f9fc]"><BellRing size={16} /> 모든 알림 보기</button>
        </div>
      )}
    </div>
  );
}
