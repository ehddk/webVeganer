import { RestaurantQuery } from "@/\bapi/query";
import HomeView from "@/views/Home/Home.view";

export default async function HomePage() {
  const response = await RestaurantQuery.getList({});
  if ("message" in response) throw new Error("조회 중 실패");
  return <HomeView data={response} />;
}
