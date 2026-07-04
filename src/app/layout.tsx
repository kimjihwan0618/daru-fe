import type { Metadata } from "next";
import { QueryProvider } from "@/components/QueryProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { AuthProvider } from "@/features/auth/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DARU | 오늘의 3분 브리핑",
  description:
    "출근길, 관심 산업과 종목에 영향을 주는 변화만 골라 전하는 개인화 아침 브리핑",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
