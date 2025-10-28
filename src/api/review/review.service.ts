import { pathToUrl } from "@/utils/path.util";
import { AxiosInstance } from "axios";

const REVIEW_ROUTES = {
  GET_LIST: "/api/review/:restaurant_id",
  PUT: "/api/review/:restaurant_id/:id",
  POST: "/api/review/:restaurant_id",
  DELETE: "/api/review/:restaurant_id/:id",
};

export class ReviewService {
  constructor(private _ajax: AxiosInstance) {}

  async getList(req: Review.GetList.Request) {
    const data = await this._ajax.get<Review.GetList.Response>(
      pathToUrl(REVIEW_ROUTES.GET_LIST, req.path),
      {
        params: req.params, // ✅ offset, limit을 쿼리 파라미터로 전달
      }
    );
    //console.log("리뷰데이터?", data);
    return data;
  }

  async post(req: Review.Post.Request) {
    const data = await this._ajax.post<Review.Post.Response>(
      REVIEW_ROUTES.POST,
      req.body
    );

    return data;
  }

  async put(req: Review.Put.Request) {
    const data = await this._ajax.put<Review.Put.Response>(
      REVIEW_ROUTES.PUT,
      req.body
    );
    return data;
  }

  async delete(req: Review.DeleteReview.Request) {
    const data = await this._ajax.delete<Review.DeleteReview.Response>(
      REVIEW_ROUTES.DELETE
    );

    return data;
  }
}
