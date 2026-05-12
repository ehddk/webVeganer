declare global {
  type IScrappedRestaurant = IRestaurant & {
    scrapped_at: string;
  };

  interface PaginatedScraps {
    items: IScrappedRestaurant[];
    total: number;
  }

  /* 토글 */
  type toggleScrapRequestPath = { restaurant_id: string };
  type toggleScrapResponse = { scrapped: boolean };

  /* 내 스크랩 목록 */
  type getScrapsRequestParams = {
    limit?: number;
    offset?: number;
  };
  type getScrapsResponse = PaginatedScraps;

  declare namespace Scrap {
    /**
     * @path /api/scrap/:restaurant_id
     * @description 스크랩 토글
     */
    namespace Toggle {
      type Path = toggleScrapRequestPath;
      type Params = {};
      type Body = {};

      type Request = {
        path: Path;
        params?: Params;
        body?: Body;
      };
      type Response = toggleScrapResponse;
    }

    /**
     * @path /api/scrap
     * @description 내 스크랩 목록
     */
    namespace GetList {
      type Path = {};
      type Params = getScrapsRequestParams;
      type Body = {};

      type Request = {
        path?: Path;
        params?: Params;
        body?: Body;
      };
      type Response = getScrapsResponse;
    }
  }
}

export {};
