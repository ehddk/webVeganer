type IReview = {
  id: string;
  user_id: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
};

interface PaginatedReview {
  items: IReview[];
  total: number;
}

declare global {
  /*목록 조회 */

  type getReviewsPaginationParams = {
    limit?: number;
    offset?: number;
    sort?: string;
  };
  type getReviewPaginationRequestPath = { restaurant_id: string };
  type getReviewResponse = PaginatedReview;

  /*생성 */
  type createReviewRequestPath = { restaurant_id: string };
  type createReviewRequestBody = {
    content: string;
    rating: number;
  };
  type createReviewResponse = IReview;
  /*수정 */
  type updateReviewRequestPath = { restaurant_id: string; id: string };

  type updateReviewRequestBody = { content: string; rating: number };
  type updateReviewResponse = IReview;

  /* 삭제 */
  type deleteReviewRequestPath = { restaurant_id: string; id: string };
  type deleteReviewResponse = true;

  declare namespace Review {
    namespace GetList {
      type Path = getReviewPaginationRequestPath;
      type Params = getReviewsPaginationParams;
      type Body = {};

      type Request = {
        path: Path;
        params: Params;
        body?: Body;
      };
      type Response = getReviewResponse;
    }

    namespace Post {
      type Path = createReviewRequestPath;
      type Params = {};
      type Body = createReviewRequestBody;

      type Request = {
        path: Path;
        params?: Params;
        body: Body;
      };
      type Response = createReviewResponse;
    }

    namespace Put {
      type Path = updateReviewRequestPath;
      type Params = {};
      type Body = updateReviewRequestBody;

      type Request = {
        path: Path;
        params?: Params;
        body: Body;
      };
      type Response = updateReviewResponse;
    }

    namespace DeleteReview {
      type Path = deleteReviewRequestPath;
      type Params = {};
      type Body = {};

      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = deleteReviewResponse;
    }
  }
}
export {};
