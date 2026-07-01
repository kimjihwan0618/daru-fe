import { NextResponse } from "next/server";
import { socialProviderSchema } from "@/features/auth/model";

const providerNames = { kakao: "카카오", naver: "네이버", google: "Google" } as const;

export async function POST(request: Request) {
  const parsed = socialProviderSchema.safeParse((await request.json().catch(() => null))?.provider);
  if (!parsed.success) return NextResponse.json({ success: false, data: null, message: "지원하지 않는 로그인 방식입니다.", code: "INVALID_SOCIAL_PROVIDER" }, { status: 400 });

  return NextResponse.json({
    success: true,
    data: { user: { id: `demo-${parsed.data}`, name: "지환", email: `${parsed.data}@example.com`, avatarUrl: "/avatar-demo.svg" } },
    message: `${providerNames[parsed.data]} 계정으로 로그인했습니다.`,
  });
}
