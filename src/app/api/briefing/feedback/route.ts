import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { briefingId } = await request.json();
  return NextResponse.json({ success: true, data: { briefingId, action: "feedback" }, message: "피드백을 반영했습니다. 다음 브리핑에 활용할게요." });
}
