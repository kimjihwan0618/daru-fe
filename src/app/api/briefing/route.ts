import { NextResponse } from "next/server";
import { demoBriefing } from "@/app/(page)/(home)/type/briefing";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: demoBriefing,
    message: "오늘의 브리핑을 불러왔습니다.",
  });
}
