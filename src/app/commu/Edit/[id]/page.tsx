import { ArticleQuery } from "@/\bapi/query";
import CommuEditView from "@/views/Commu/Edit/CommuEdit.view";

type CommuEditPageProps = PageProps<{
  id: string;
}>;

export default async function CommuEditPage(props: CommuEditPageProps) {
  const { params, searchParams } = props;
  const { id } = await params;
  console.log("idddd", id);
  const response = await ArticleQuery.getOne({ path: { id } });
  if ("message" in response) throw new Error("데이터 조회 중 실패");
  return <CommuEditView data={response} />;
}
