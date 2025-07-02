import { IArticle } from "./article.type";

interface IArticle {
  id: string;
  author_id: string;
  author: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

declare global {
  /**목록 조회 */
  type getArticlesResponse = IArticle[];
  /**상세 조회 */
  type getArticleRequestPath = {
    id: string;
  };

  type getArticleResponse = IArticle;

  /**생성 */

  type createArticleRequestBody = {
    title: string;
    content: string;
    author: string;
    author_id: string;
  };

  type createArticleResponse = true;

  /**수정 */
  type updateArticleRequestPath = {
    id: string;
  };
  type updateArticleRequestBody = {
    title: string;
    content: string;
  };
  type updateArticleResponse = true;

  type deleteArticleResponse = true;

  declare namespace Article {
    /**
     * @path /api/article
     * @description 목록 조회
     */

    namespace GetList {
      type Path = {};
      type Params = {};
      type Body = {};
      type Request = {
        path?: Path;
        params?: Params;
        body?: Body;
      };
      type Response = getArticlesResponse;
    }

    /**
     * @path /api/article/:id
     * @description 상세 조회
     */
    namespace GetOne {
      type Path = getArticleRequestPath;
      type Params = {};
      type Body = {};

      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = getArticleResponse;
    }
    /**
     * @path /api/article
     * @description 생성
     */

    namespace Post {
      type Path = {};
      type Params = {};
      type Body = createArticleRequestBody;
      type Request = {
        path?: Path;
        params?: Params;
        body: Body;
      };
      type Response = createArticleResponse;
    }

    /**
     * @path /api/article/:id
     * @description 수정
     */
    namespace Put {
      type Path = updateArticleRequestPath;
      type Params = {};
      type Body = updateArticleRequestBody;
      type Request = {
        path: Path;
        params?: Params;
        body: Body;
      };
      type Response = updateArticleResponse;
    }

    /**
     * @path /api/article/:id
     * @description 삭제
     */
    namespace Delete {
      type Path = deleteArticleRequestPath;
      type Params = {};
      type Body = {};
      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = deleteArticleResponse;
    }
  }
}
export {};
