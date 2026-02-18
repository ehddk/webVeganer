import { RestaurantQuery } from "@/\bapi/query";
import { fetchImagesForRestaurant } from "@/utils/imageCrawl";
import RestaurantView from "@/views/Restaurant/Restaurant.view";

export default async function RestaurantPage() {
  const response = await RestaurantQuery.getList({});
  const restaurants = response as Restaurant.GetList.Response;
  if (restaurants.length === 0) {
    return <p>등록된 식당이 없습니다.</p>;
  }

  // const imagePromises = restaurants.map((restaurant) =>
  //   fetchImagesForRestaurant(restaurant.upso_name)
  // );
  // const allImages = await Promise.all(imagePromises);

  // const dataWithImages = restaurants.map((restaurant, index) => ({
  //   ...restaurant,
  //   // 각 식당 객체에 해당 식당의 이미지 배열을 추가
  //   initialBlogImages: allImages[index],
  // }));

  if ("message" in response) throw new Error("조회 중 실패");
  return <RestaurantView data={restaurants} />;
}
