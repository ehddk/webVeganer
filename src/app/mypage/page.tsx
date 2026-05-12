"use server";
import { redirect } from "next/navigation";
import { ArticleQuery, ScrapQuery } from "@/api/query";
import { LINK_ROUTE } from "@/constants/link.constants";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import MypageView from "@/views/Mypage/Mypage.view";

type MypagePageProps = PageProps<"", Article.GetByAuthorId.Params>;

export default async function MypagePage(props: MypagePageProps) {
  const { searchParams } = props;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(LINK_ROUTE.LOGIN.appDir);
  }

  const rawOffset = (await searchParams).offset;
  const rawLimit = (await searchParams).limit;
  const offsetValue = rawOffset ? parseInt(String(rawOffset), 10) : 0;
  const limitValue = rawLimit ? parseInt(String(rawLimit), 10) : 15;

  const [data, scrapData] = await Promise.all([
    ArticleQuery.getByAuthorId({
      path: { author_id: user.id },
      params: { offset: offsetValue, limit: limitValue },
    }),
    ScrapQuery.getList({
      params: { offset: offsetValue, limit: limitValue },
    }),
  ]);
  if ("message" in data || "message" in scrapData) {
    throw new Error();
  }

  const displayName = user.user_metadata?.name ?? user.email ?? "사용자";

  return (
    <MypageView
      data={data}
      scrapData={scrapData}
      offset={offsetValue}
      userName={displayName}
      userEmail={user.email ?? ""}
    />
  );
}
