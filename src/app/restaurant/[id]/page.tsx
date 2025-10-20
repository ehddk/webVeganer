import { RestaurantQuery } from "@/\bapi/query";
import { fetchImagesForRestaurant } from "@/utils/imageCrawl";
import RestaurantInfoView from "@/views/Restaurant/Detail/RestauranDetail.view";

type RestaurantInfoPageProps = PageProps<{
  id: string;
}>;

export default async function RestaurantInfoPage(
  props: RestaurantInfoPageProps
) {
  const { params } = props;
  const { id } = await params;
  const response = await RestaurantQuery.getOne({ path: { id } });
  const restaurantData = response as Restaurant.GetOne.Response;

  const initialImages = await fetchImagesForRestaurant(
    restaurantData.upso_name
  );
  const dataForView = {
    ...restaurantData,
    // 뷰 컴포넌트에서 사용할 이미지 배열을 추가
    initialBlogImages: initialImages,
  };

  if ("message" in response) throw new Error("상세 데이터 조회 중 실패");
  return <RestaurantInfoView data={dataForView} />;
}
