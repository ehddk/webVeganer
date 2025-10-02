import { ArticleQuery } from "@/\bapi/query";
import CommuView from "@/views/Commu/Default/Commu.view";

export default async function CommuPage() {
  const data = await ArticleQuery.getList({});
  console.log("datasdsd");
  return <CommuView data={data} />;
}
