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
        params: req.params,
      }
    );
    //console.log("리뷰데이터?", data);
    return data;
  }

  async post(req: Review.Post.Request) {
    const { data } = await this._ajax.post<Review.Post.Response>(
      pathToUrl(REVIEW_ROUTES.POST, req.path),
      req.body
    );
    return data;
  }

  async put(req: Review.Put.Request) {
    const { data } = await this._ajax.put<Review.Put.Response>(
      pathToUrl(REVIEW_ROUTES.PUT, req.path),
      req.body
    );

    return data;
  }

  async delete(req: Review.DeleteReview.Request) {
    const { data } = await this._ajax.delete<Review.DeleteReview.Response>(
      pathToUrl(REVIEW_ROUTES.DELETE, req.path)
    );
    console.log("삭제 되나연", data);
    return data;
  }
}
