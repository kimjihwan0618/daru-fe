import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { briefingId } = await request.json();
  return NextResponse.json({
    success: true,
    data: { briefingId, action: "share" },
    message: "브리핑 공유를 기록했습니다.",
  });
}
