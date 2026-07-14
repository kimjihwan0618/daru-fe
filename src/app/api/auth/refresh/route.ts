import { NextResponse } from "next/server";
import { accessTokenResponseSchema } from "@/app/(page)/type/auth";
import {
  authErrorResponse,
  clearAuthSession,
  getStoredAuth,
  requestAuthBackend,
  updateAccessToken,
} from "@/app/api/auth/_lib/server";

export async function POST() {
  const { refreshToken } = await getStoredAuth();
  if (!refreshToken) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "갱신할 로그인 세션이 없습니다.",
        code: "MISSING_REFRESH_TOKEN",
      },
      { status: 401 },
    );
  }

  try {
    const token = await requestAuthBackend(
      "/api/v1/auth/refresh",
      accessTokenResponseSchema,
      {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
    );
    await updateAccessToken(token.access_token, token.expires_in);
    return NextResponse.json({
      success: true,
      data: null,
      message: "로그인 세션을 갱신했습니다.",
    });
  } catch (error) {
    await clearAuthSession();
    return authErrorResponse(error);
  }
}
