import { ErrorType } from "next/dist/client/components/react-dev-overlay/pages/pages-dev-overlay";
import { IRestaurant } from "./Restaurant.type";

interface IRestaurant {
  id: string;
  upso_name: string;
  rdn_code: string;
  source_id: string;
  category: string;
  latitude?: Int;
  longitude?: Int;
  rdn_detail_addr: string;
  ctfc_gbn_name: string;
  source_type: string;
  created_at: Date;
  cgg_code_name: string;
  tel_no: string;
  image_url?: string;
}

declare global {
  /**목록 조회 */
  type getRestaurantsResponse = IRestaurant[];
  /**상세 조회 */
  type getRestaurantRequestPath = {
    id: string;
  };

  type getRestaurantResponse = IRestaurant;

  /**페이지네이션 */
  type getRestaurantsPaginationParams = {
    offset?: number;
    limit?: number;
    sort?: string;
  };
  /**생성 */

  type createRestaurantRequestBody = IRestaurant;

  type createRestaurantResponse = { statusCode: number; message: string };

  /**수정 */
  type updateRestaurantRequestPath = {
    id: string;
  };
  type updateRestaurantRequestBody = Omit<
    IRestaurant,
    "id" | "created_at" | "source_id"
  >;
  type updateRestaurantResponse = { statusCode: number; message: string };

  type deleteRestaurantResponse = { statusCode: number; message: string };

  declare namespace Restaurant {
    /**
     * @path /api/Restaurant
     * @description 목록 조회
     */

    namespace GetList {
      type Path = {};
      type Params = {};
      type Body = {};
      type Request = {
        path?: Path;
        param?: Params;
        body?: Body;
      };
      type Response = getRestaurantsResponse;
    }

    /**
     * @path /api/Restaurant/:id
     * @description 상세 조회
     */
    namespace GetOne {
      type Path = getRestaurantRequestPath;
      type Params = {};
      type Body = {};

      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = getRestaurantResponse;
    }
    /**
     * @path /api/Restaurant
     * @description 생성
     */

    namespace Post {
      type Path = {};
      type Params = {};
      type Body = createRestaurantRequestBody;
      type Request = {
        path?: Path;
        params?: Params;
        body: Body;
      };
      type Response = createRestaurantResponse;
    }

    /**
     * @path /api/Restaurant/:id
     * @description 수정
     */
    namespace Put {
      type Path = updateRestaurantRequestPath;
      type Params = {};
      type Body = updateRestaurantRequestBody;
      type Request = {
        path: Path;
        params?: Params;
        body: Body;
      };
      type Response = updateRestaurantResponse;
    }

    /**
     * @path /api/Restaurant/:id
     * @description 삭제
     */
    namespace Delete {
      type Path = deleteRestaurantRequestPath;
      type Params = {};
      type Body = {};
      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = deleteRestaurantResponse;
    }
  }
}
export {};
