import { RestaurantQuery } from "@/\bapi/query";
import HomeView from "@/views/Home/Home.view";

export default async function HomePage() {
  const response = await RestaurantQuery.getList({});

  let data: getRestaurantsResponse;

  if ("message" in response) {
    console.error("레스토랑 데이터 조회 중 서버 오류 발생:", response.message);
    data = [];
  } else {
    // 정상적인 응답일 경우 데이터 사용
    data = response;
  }

  return <HomeView data={data || []} />;
}
