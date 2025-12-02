import { pathToUrl } from "@/utils/path.util";
import { AxiosInstance } from "axios";

const AUTH_ROUTES = {
  GET_ONE: "/api/auth/:id",
  PUT: "/api/auth/:id",
  POST: "/api/auth",
  DELETE: "/api/auth/:id",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
};

export class AuthService {
  constructor(private _ajax: AxiosInstance) {}

  async getOne(req: Auth.GetOne.Request) {
    const { data } = await this._ajax.get<Auth.GetOne.Response>(
      pathToUrl(AUTH_ROUTES.GET_ONE, req.path)
    );

    return data;
  }

  async post(req: Auth.Post.Request) {
    const data = await this._ajax.post<Auth.Post.Response>(
      AUTH_ROUTES.POST,
      req.body
    );

    return data;
  }

  async put(req: Auth.Put.Request) {
    const data = await this._ajax.put<Auth.Put.Response>(
      AUTH_ROUTES.PUT,
      req.body
    );
    return data;
  }

  async delete(req: Auth.DeleteAuth.Request) {
    const data = await this._ajax.delete<Auth.DeleteAuth.Response>(
      AUTH_ROUTES.DELETE
    );

    return data;
  }

  async login(req: Auth.Login.Request) {
    const data = await this._ajax.post<Auth.Login.Response>(
      AUTH_ROUTES.LOGIN,
      req.body,
      { withCredentials: true }
    );

    return data;
  }
  async logout(req: Auth.Logout.Request) {
    const data = await this._ajax.post<Auth.Logout.Response>(
      AUTH_ROUTES.LOGOUT,

      { withCredentials: true }
    );

    return data;
  }
}
