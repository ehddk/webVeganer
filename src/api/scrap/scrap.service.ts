import { pathToUrl } from "@/utils/path.util";
import { AxiosInstance } from "axios";

const SCRAP_ROUTES = {
  TOGGLE: "/api/scrap/:restaurant_id",
  GET_LIST: "/api/scrap",
};

export class ScrapService {
  constructor(private _ajax: AxiosInstance) {}

  async toggle(req: Scrap.Toggle.Request) {
    const { data } = await this._ajax.post<Scrap.Toggle.Response>(
      pathToUrl(SCRAP_ROUTES.TOGGLE, req.path)
    );
    return data;
  }

  async getList(req: Scrap.GetList.Request) {
    const { data } = await this._ajax.get<Scrap.GetList.Response>(
      SCRAP_ROUTES.GET_LIST,
      { params: req.params }
    );
    return data;
  }
}
