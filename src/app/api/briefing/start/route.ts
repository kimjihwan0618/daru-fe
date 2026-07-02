import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { briefingId } = await request.json();
  return NextResponse.json({
    success: true,
    data: { briefingId, action: "start" },
    message: "3분 브리핑을 시작합니다.",
  });
}
