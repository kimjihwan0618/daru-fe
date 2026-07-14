export interface NotificationItem {
  id: string;
  type: "briefing" | "market" | "commute";
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
}

export const dummyNotifications: NotificationItem[] = [
  {
    id: "notice-1",
    type: "briefing",
    title: "오늘의 3분 브리핑이 준비됐어요",
    description: "관심 이슈 3개와 출근길 변화를 확인해 보세요.",
    createdAt: "방금 전",
    isRead: false,
  },
  {
    id: "notice-2",
    type: "commute",
    title: "출근길 지연이 감지됐어요",
    description: "분당수서로 사고로 평소보다 12분 더 걸려요.",
    createdAt: "18분 전",
    isRead: false,
  },
  {
    id: "notice-3",
    type: "market",
    title: "관심 종목 관련 주요 이슈",
    description: "HBM 공급계약 관련 뉴스 18건을 하나로 정리했어요.",
    createdAt: "1시간 전",
    isRead: true,
  },
];