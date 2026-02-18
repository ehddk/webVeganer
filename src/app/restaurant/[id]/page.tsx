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
interface JwtPayload {
  userId: number;
  role: string;
  [key: string]: any;
}

function getUserIdFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Payload 부분 (두 번째) Base64 디코딩
    const base64Payload = parts[1];
    const decodedPayload = Buffer.from(base64Payload, "base64").toString(
      "utf8"
    );
    const payload = JSON.parse(decodedPayload) as JwtPayload;

    if (typeof payload.userId === "number" && payload.userId > 0) {
      return String(payload.userId); // userId를 문자열로 변환하여 반환
    }
    return null;
  } catch (error) {
    console.error("JWT 디코딩 오류:", error);
    return null;
  }
}

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
  const accessToken = (await cookieStore).get("accessToken")?.value;

  let currentUserId: string | null = null;

  if (accessToken) {
    // 추출된 accessToken 변수를 디코딩 함수에 전달
    currentUserId = getUserIdFromToken(accessToken);
  }

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
      isAuthenticated={isAuthenticated}
      currentUserId={currentUserId}
    />
  );
}
