// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  //searchParams.get("next")가 null이면 바로 "/"를 할당하도록 확실히 처리
  const next = searchParams.get("next") || "/";

  if (code) {
    const supabase = await createSupabaseServerClient();

    // 세션 교환 성공 시 supabaseServer.ts의 setAll 로직에 의해
    // 브라우저 쿠키에 자동으로 세션 정보가 저장됩니다.
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 성공 시 원래 가려던 페이지나 메인으로 이동
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 실패 시 에러 페이지나 로그인 페이지로 이동
  return NextResponse.redirect(`${origin}/login?message=auth-failed`);
}
