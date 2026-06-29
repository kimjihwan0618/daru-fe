import { briefingSchema, type Briefing } from "./model";

export async function getBriefing(): Promise<Briefing> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const response = await fetch(`${baseUrl}/api/briefing`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("브리핑을 불러오지 못했습니다.");
  return briefingSchema.parse(await response.json());
}
