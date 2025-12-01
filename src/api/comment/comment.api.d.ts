import { offset } from "@popperjs/core";

interface IComment {
  id: string;
  article_id: string;
  user_id: string;
  user: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface PaginatedComment {
  items: IComment[];
  total: number;
}

declare global {
  /**목록 조회 */

  type getCommentsPaginationParams = {
    offset?: number;
    limit?: number;
    sort?: string;
  };
  type getCommentRequestPath = { article_id: string };
  type getCommentsResponse = PaginatedComment;

  /**생성 */
  type createCommentRequestPath = { article_id: string };
  type createCommentRequestBody = {
    content: string;
  };
  type createCommentResponse = IComment;
  /**수정 */
  type updateCommentRequestPath = { article_id: string; id: string };
  type updateCommentRequestBody = { content: string };
  type updateCommentResponse = IComment;

  /**삭제 */
  type deleteCommentRequestPath = { article_id: string; id: string };
  type deleteCommentResponse = { statusCode: number; message: string };

  declare namespace Comment {
    namespace GetList {
      type Path = getCommentRequestPath;
      type Params = getCommentsPaginationParams;
      type Body = {};

      type Request = {
        path: Path;
        params: Params;
        body?: Body;
      };
      type Response = getCommentsResponse;
    }

    namespace Put {
      type Path = updateCommentRequestPath;
      type Params = {};
      type Body = updateCommentRequestBody;
      type Request = {
        path: Path;
        params?: Params;
        body: Body;
      };
      type Response = updateCommentResponse;
    }

    namespace Post {
      type Path = createCommentRequestPath;
      type Params = {};
      type Body = createCommentRequestBody;

      type Request = {
        path: Path;
        params?: Params;
        body: Body;
      };
      type Response = createCommentResponse;
    }
    namespace deleteComment {
      type Path = deleteCommentRequestPath;
      type Params = {};
      type Body = {};

      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = deleteCommentResponse;
    }
  }
}

export {};
