"use server";
import { ArticleQuery, AuthQuery, CommentQuery } from "@/\bapi/query";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import CommuDetailView from "@/views/Commu/Detail/CommuDetail.view";
import { cookies } from "next/headers";
type CommuDetailPageProps = PageProps<
  {
    id: string;
  },
  Comment.GetList.Params
>;

interface JwtPayload {
  userId: number;
  role: string;
  [key: string]: any;
}

function getUserIdFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Payload 부분 (두 번째) Base64 디코딩
    const base64Payload = parts[1];
    const decodedPayload = Buffer.from(base64Payload, "base64").toString(
      "utf8"
    );
    const payload = JSON.parse(decodedPayload) as JwtPayload;

    if (typeof payload.userId === "number" && payload.userId > 0) {
      return String(payload.userId); // userId를 문자열로 변환하여 반환
    }
    return null;
  } catch (error) {
    console.error("JWT 디코딩 오류:", error);
    return null;
  }
}

export default async function CommuDetailPage(props: CommuDetailPageProps) {
  const { params, searchParams } = props;
  const { id } = await params;
  const article_id = id;
  const rawOffset = (await searchParams).offset;
  const rawLimit = (await searchParams).limit;
  const offsetValue = rawOffset ? parseInt(String(rawOffset), 10) : 0;
  const limitValue = rawLimit ? parseInt(String(rawLimit), 10) : 20;

  //로그인 확인
  const supabase = createSupabaseServerClient();
  const { data } = await (await supabase).auth.getUser();
  const session = {
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
        }
      : null,
  };
  let currentUserId: string | null = null;
  let currentUserName: string | null = null;

  if (data.user) {
    currentUserId = data.user.id; //  Supabase user id (uuid)
    currentUserName = data.user.email ?? null;
  }

  if (data.user) {
    currentUserId = data.user.id;
    currentUserName = data.user.user_metadata?.name ?? data.user.email ?? null;
  }

  const [response, commentData] = await Promise.all([
    ArticleQuery.getOne({ path: { id } }),
    CommentQuery.getList({
      params: {
        offset: offsetValue,
        limit: limitValue,
      },
      path: { article_id },
    }),
  ]);

  if ("message" in response || "message" in commentData)
    throw new Error("데이터 조회 중 실패");
  return (
    <CommuDetailView
      data={response}
      session={session}
      commentData={commentData.data}
      currentUserId={currentUserId}
      currentUserName={currentUserName}
    />
  );
}
