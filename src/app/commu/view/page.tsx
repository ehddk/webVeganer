import { ArticleQuery } from "@/\bapi/query";
import CommuView from "@/views/Commu/Commu.view";

export default async function CommuViewPage() {
  const data = await ArticleQuery.getList({});
  console.log("datasdsd");
  return <CommuView data={data} />;
}
