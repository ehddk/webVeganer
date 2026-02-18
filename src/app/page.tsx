import { RestaurantQuery } from "@/\bapi/query";
import { fetchImagesForRestaurant } from "@/utils/imageCrawl";
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

  const restaurants = response as Restaurant.GetList.Response;
  if (restaurants.length === 0) {
    return <p>등록된 식당이 없습니다.</p>;
  }

  return <HomeView data={restaurants || []} />;
}
