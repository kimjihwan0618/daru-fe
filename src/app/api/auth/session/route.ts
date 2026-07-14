import { NextResponse } from "next/server";
import { getStoredAuth } from "@/app/api/auth/_lib/server";

export async function GET() {
  const { user } = await getStoredAuth();
  return NextResponse.json({
    success: true,
    data: { user },
    message: user ? "인증 세션을 불러왔습니다." : "로그인 세션이 없습니다.",
  });
}
