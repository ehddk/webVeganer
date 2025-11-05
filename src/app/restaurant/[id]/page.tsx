import { RestaurantQuery, ReviewQuery } from "@/\bapi/query";
import { fetchImagesForRestaurant } from "@/utils/imageCrawl";
import RestaurantInfoView from "@/views/Restaurant/Detail/RestauranDetail.view";
import { cookies } from "next/headers";

type RestaurantInfoPageProps = PageProps<
  {
    id: string;
    // restaurant_id:string;
  },
  Review.GetList.Params
>;

export default async function RestaurantInfoPage(
  props: RestaurantInfoPageProps
) {
  const { params, searchParams } = props;
  const { id } = await params;
  const restaurant_id = id;

  const rawOffset = (await searchParams).offset;
  const rawLimit = (await searchParams).limit;
  const offsetValue = rawOffset ? parseInt(String(rawOffset), 10) : 0;
  const limitValue = rawLimit ? parseInt(String(rawLimit), 10) : 20;

  //로그인 확인
  const cookieStore = cookies();
  const isAuthenticated = (await cookieStore).has("accessToken");

  const response = await RestaurantQuery.getOne({ path: { id } });
  const restaurantData = response as Restaurant.GetOne.Response;
  const reviewData = await ReviewQuery.getList({
    params: {
      offset: offsetValue,
      limit: limitValue,
    },
    path: { restaurant_id },
  });

  const initialImages = await fetchImagesForRestaurant(
    restaurantData.upso_name
  );
  const dataForView = {
    ...restaurantData,
    // 뷰 컴포넌트에서 사용할 이미지 배열을 추가
    initialBlogImages: initialImages,
  };

  if ("message" in response || "message" in reviewData)
    throw new Error("데이터 조회 중 실패");
  return (
    <RestaurantInfoView
      data={dataForView}
      reviewData={reviewData.data}
      isAuthenticated={isAuthenticated}
    />
  );
}
