type IAuth = {
  id: string;
  email: string;
  name: string;
  password: string;
};

declare global {
  /*목록 조회 */

  type getAuthParams = {};
  type getAuthRequestPath = { id: string };
  type getAuthResponse = IAuth;

  /*생성 */
  type createAuthRequestPath = {};
  type createAuthRequestBody = {
    email: string;
    name: string;
    password: string;
  };
  type createAuthResponse = IAuth;
  /*수정 */
  type updateAuthRequestPath = { id: string };

  type updateAuthRequestBody = { name?: string; password?: string };
  type updateAuthResponse = IAuth;

  /* 삭제 */
  type deleteAuthRequestPath = { id: string };
  type deleteAuthResponse = true;

  declare namespace Auth {
    namespace Login {
      type Path = {};
      type Params = {};
      type Body = {
        email: string;
        password: string;
      };
      type Request = {
        path?: Path;
        params?: Params;
        body: Body;
      };
      type Response = true;
    }
    namespace Logout {
      type Path = {};
      type Params = {};
      type Body = {};
      type Request = {
        path?: Path;
        params?: Params;
        body?: Body;
      };
      type Response = true;
    }
    namespace GetOne {
      type Path = getAuthRequestPath;
      type Params = getAuthParams;
      type Body = {};

      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = getAuthResponse;
    }

    namespace Post {
      type Path = createAuthRequestPath;
      type Params = {};
      type Body = createAuthRequestBody;

      type Request = {
        path?: Path;
        params?: Params;
        body: Body;
      };
      type Response = createAuthResponse;
    }

    namespace Put {
      type Path = updateAuthRequestPath;
      type Params = {};
      type Body = updateAuthRequestBody;

      type Request = {
        path: Path;
        params?: Params;
        body: Body;
      };
      type Response = updateAuthResponse;
    }

    namespace DeleteAuth {
      type Path = deleteAuthRequestPath;
      type Params = {};
      type Body = {};

      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = deleteAuthResponse;
    }
  }
}
export {};
