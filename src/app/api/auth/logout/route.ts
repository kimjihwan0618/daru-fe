import { NextResponse } from "next/server";
import { z } from "zod";
import {
  authErrorResponse,
  clearAuthSession,
  getStoredAuth,
  requestAuthBackend,
} from "@/app/api/auth/_lib/server";

export async function POST() {
  const { accessToken, refreshToken } = await getStoredAuth();
  try {
    if (accessToken && refreshToken) {
      await requestAuthBackend("/api/v1/auth/logout", z.null(), {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    }
  } catch (error) {
    await clearAuthSession();
    return authErrorResponse(error);
  }

  await clearAuthSession();
  return NextResponse.json({
    success: true,
    data: null,
    message: "로그아웃되었습니다.",
  });
}
