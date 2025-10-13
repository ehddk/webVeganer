"use server";
import { ArticleQuery } from "@/\bapi/query";
import CommuView from "@/views/Commu/Default/Commu.view";

type CommuPageProps = PageProps<"", Article.GetList.Params>;
export default async function CommuViewPage(props: CommuPageProps) {
  const { searchParams } = props;

  const { offset = 0, limit = 15 } = await searchParams;

  const data = await ArticleQuery.getList({
    params: {
      offset: offset ? +offset : 0,
      limit: limit ? +limit : 15,
    },
  });
  if ("message" in data) throw new Error("조회 중 실패");
  return <CommuView data={data} offset={offset} />;
}
