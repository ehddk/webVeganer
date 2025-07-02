import { pathToUrl } from "@/utils/path.util";
import { AxiosInstance } from "axios";

const ARTICLE_ROUTES = {
  GET_LIST: "/api/articles",
  GET_ONE: "/api/articles/:id",
  PUT: "/api/articles/:id",
  POST: "/api/articles",
  DELETE: "/api/articles/:id",
};
export class ArticleService {
  constructor(private _ajax: AxiosInstance) {}

  async getList(req: Article.GetList.Request) {
    console.log("getList 함수 시작");
    const { data } = await this._ajax.get<Article.GetList.Response>(
      ARTICLE_ROUTES.GET_LIST
    );
    console.log("getList Service data", data);
    return data;
  }

  async getOne(req: Article.GetOne.Request) {
    const { data } = await this._ajax.get<Article.GetOne.Response>(
      pathToUrl(ARTICLE_ROUTES.GET_ONE, req.path)
    );

    return data;
  }

  async post(req: Article.Post.Request) {
    const { data } = await this._ajax.put<Article.Post.Response>(
      ARTICLE_ROUTES.POST,
      req.body
    );
    console.log("body", req.body);
    return data;
  }

  async put(req: Article.Put.Request) {
    const { data } = await this._ajax.put<Article.Put.Response>(
      pathToUrl(ARTICLE_ROUTES.PUT, req.path),
      req.body
    );
    return data;
  }

  async delete(req: Article.Delete.Request) {
    const { data } = await this._ajax.delete<Article.Delete.Response>(
      pathToUrl(ARTICLE_ROUTES.DELETE, req.path)
    );
    return data;
  }
}
