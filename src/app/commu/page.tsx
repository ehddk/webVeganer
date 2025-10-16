"use server";
import { ArticleQuery } from "@/\bapi/query";
import CommuView from "@/views/Commu/Default/Commu.view";

type CommuPageProps = PageProps<"", Article.GetList.Params>;
export default async function CommuViewPage(props: CommuPageProps) {
  const { searchParams } = props;

  // const { offset = 0, limit } = await searchParams;
  const rawOffset = (await searchParams).offset;
  const rawLimit = (await searchParams).limit;

  const offsetValue = rawOffset ? parseInt(String(rawOffset), 10) : 0;
  const limitValue = rawLimit ? parseInt(String(rawLimit), 10) : 20;

  const data = await ArticleQuery.getList({
    params: {
      offset: offsetValue,
      limit: limitValue,
    },
  });

  if ("message" in data) throw new Error("조회 중 실패");
  console.log("daata", data);
  return <CommuView data={data} offset={offsetValue} />;
}
