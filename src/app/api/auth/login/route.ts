import { NextResponse } from "next/server";
import { loginRequestSchema } from "@/features/auth/model";

export async function POST(request: Request) {
  const parsed = loginRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ success: false, data: null, message: "이메일과 비밀번호를 확인해 주세요.", code: "INVALID_LOGIN_INPUT" }, { status: 400 });

  return NextResponse.json({
    success: true,
    data: { user: { id: "demo-user", name: "지환", email: parsed.data.email, avatarUrl: null } },
    message: "로그인되었습니다. 오늘의 브리핑을 불러올게요.",
  });
}
