import { RestaurantQuery, ReviewQuery } from "@/api/query";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import RestaurantInfoView from "@/views/Restaurant/Detail/RestauranDetail.view";

type RestaurantInfoPageProps = PageProps<
  {
    id: string;
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
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const session = {
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
        }
      : null,
  };
  const currentUserId = data.user?.id ?? null;

  const response = await RestaurantQuery.getOne({ path: { id } });
  const restaurantData = response as Restaurant.GetOne.Response;
  const reviewData = await ReviewQuery.getList({
    params: {
      offset: offsetValue,
      limit: limitValue,
    },
    path: { restaurant_id },
  });

  if ("message" in response || "message" in reviewData)
    throw new Error("데이터 조회 중 실패");
  return (
    <RestaurantInfoView
      data={restaurantData}
      reviewData={reviewData.data}
      session={session}
      currentUserId={currentUserId}
    />
  );
}
