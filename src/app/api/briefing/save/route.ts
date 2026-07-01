import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { briefingId, saved } = await request.json();
  return NextResponse.json({ success: true, data: { briefingId, action: "save" }, message: saved ? "브리핑을 저장했습니다." : "저장을 취소했습니다." });
}
