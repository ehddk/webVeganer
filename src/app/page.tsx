import { RestaurantQuery } from "@/api/query";
import HomeView from "@/views/Home/Home.view";

const POPULAR_COUNT = 6;

/**
 * 인기 식당 추첨은 서버에서 한 번만 수행한다.
 * 클라이언트에서 Math.random()을 돌리면 SSR로 만든 HTML과 결과가 달라져
 * hydration 불일치가 발생한다.
 */
const pickRandom = (
  list: Restaurant.GetList.Response,
  count: number
): Restaurant.GetList.Response =>
  [...list].sort(() => 0.5 - Math.random()).slice(0, count);

export default async function HomePage() {
  const response = await RestaurantQuery.getList({});

  if ("message" in response) {
    console.error("레스토랑 데이터 조회 중 서버 오류 발생:", response.message);
    return <p>식당 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>;
  }

  const restaurants = response as Restaurant.GetList.Response;

  if (restaurants.length === 0) {
    return <p>등록된 식당이 없습니다.</p>;
  }

  return (
    <HomeView
      data={restaurants}
      popular={pickRandom(restaurants, POPULAR_COUNT)}
    />
  );
}
