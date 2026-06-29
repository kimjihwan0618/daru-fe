import { NextResponse } from "next/server";
import { demoBriefing } from "@/features/briefing/model";

export async function GET() {
  return NextResponse.json(demoBriefing);
}
