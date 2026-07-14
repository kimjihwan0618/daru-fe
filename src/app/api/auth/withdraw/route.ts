import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AuthBackendError,
  authErrorResponse,
  clearAuthSession,
  getStoredAuth,
  requestAuthBackend,
} from "@/app/api/auth/_lib/server";

export async function DELETE() {
  const { accessToken } = await getStoredAuth();
  if (!accessToken) {
    return authErrorResponse(
      new AuthBackendError("로그인이 필요합니다.", 401, "UNAUTHORIZED"),
    );
  }

  try {
    await requestAuthBackend("/api/v1/auth/withdraw", z.null(), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    await clearAuthSession();
    return NextResponse.json({
      success: true,
      data: null,
      message: "회원 탈퇴가 완료되었습니다.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
