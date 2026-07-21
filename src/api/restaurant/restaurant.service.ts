import { pathToUrl } from "@/utils/path.util";
import { AxiosInstance } from "axios";
import { createServerAjax } from "../instance";
const RESTAURANT_ROUTES = {
  GET_LIST: "/api/restaurant",
  GET_ONE: "/api/restaurant/:id",
  PUT: "/api/restaurant/:id",
  POST: "/api/restaurant",
};
export class RestaurantService {
  constructor(private _ajax: AxiosInstance) {}

  async getList(req: Restaurant.GetList.Request) {
    const data = await this._ajax.get<Restaurant.GetList.Response>(
      pathToUrl(RESTAURANT_ROUTES.GET_LIST)
    );

    return data;
  }

  async getOne(req: Restaurant.GetOne.Request) {
    const ajax = req.token ? createServerAjax(req.token) : this._ajax;

    const { data } = await ajax.get<Restaurant.GetOne.Response>(
      pathToUrl(RESTAURANT_ROUTES.GET_ONE, req.path)
    );
    return data;
  }

  async post(req: Restaurant.Post.Request) {
    const { data } = await this._ajax.post<Restaurant.Post.Response>(
      RESTAURANT_ROUTES.POST,
      req.body
    );

    return data;
  }

  async put(req: Restaurant.Put.Request) {
    const { data } = await this._ajax.put<Restaurant.Put.Response>(
      pathToUrl(RESTAURANT_ROUTES.PUT, req.path),
      req.body
    );
    return data;
  }
}
