import { ArticleQuery } from "@/\bapi/query";
import CommuDetailView from "@/views/Commu/Detail/CommuDetail.view";
type CommuDetailPageProps = PageProps<{
  id: string;
}>;

export default async function CommuDetailPage(props: CommuDetailPageProps) {
  const { params, searchParams } = props;
  const { id } = await params;

  const response = await ArticleQuery.getOne({ path: { id } });
  if ("message" in response) throw new Error("데이터 조회 중 실패");
  return <CommuDetailView data={response} />;
}
