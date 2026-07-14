import { NextResponse } from "next/server";
import {
  registerRequestSchema,
  tokenResponseSchema,
} from "@/app/(page)/type/auth";
import {
  authErrorResponse,
  mapAuthUser,
  persistAuthSession,
  requestAuthBackend,
} from "@/app/api/auth/_lib/server";

export async function POST(request: Request) {
  const parsed = registerRequestSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "회원가입 정보를 확인해 주세요.",
        code: "INVALID_REGISTER_INPUT",
      },
      { status: 400 },
    );
  }

  try {
    const token = await requestAuthBackend(
      "/api/v1/auth/register",
      tokenResponseSchema,
      {
        method: "POST",
        body: JSON.stringify({
          email: parsed.data.email,
          password: parsed.data.password,
          nickname: parsed.data.nickname,
        }),
      },
    );
    const user = mapAuthUser(token.user, parsed.data.email);
    await persistAuthSession(token, user, parsed.data.remember);
    return NextResponse.json({
      success: true,
      data: { user },
      message: "회원가입이 완료되었습니다.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
