import { pathToUrl } from "@/utils/path.util";
import { AxiosInstance } from "axios";

const COMMENT_ROUTES = {
  GET_LIST: "/api/comments/:article_id",
  PUT: "/api/comments/:article_id/:id",
  POST: "/api/comments/:article_id",
  DELETE: "/api/comments/:article_id/:id",
};

export class CommentService {
  constructor(private _ajax: AxiosInstance) {}

  async getList(req: Comment.GetList.Request) {
    const data = await this._ajax.get<Comment.GetList.Response>(
      pathToUrl(COMMENT_ROUTES.GET_LIST, req.path),
      {
        params: req.params,
      }
    );
    return data;
  }

  async post(req: Comment.Post.Request) {
    const { data } = await this._ajax.post<Comment.Post.Response>(
      pathToUrl(COMMENT_ROUTES.POST, req.path),
      req.body
    );
    return data;
  }

  async put(req: Comment.Put.Request) {
    const { data } = await this._ajax.put<Comment.Put.Response>(
      pathToUrl(COMMENT_ROUTES.PUT, req.path),
      req.body
    );
    return data;
  }
  async delete(req: Comment.deleteComment.Request) {
    const { data } = await this._ajax.delete<Comment.deleteComment.Response>(
      pathToUrl(COMMENT_ROUTES.DELETE, req.path)
    );
    return data;
  }
}
