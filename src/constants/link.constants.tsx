const ROUTE_KEY = {
  APP_DIR: "appDir",
  URI: "uri",
} as const;

interface WithIdParams {
  id?: string;
}

export const LINK_ROUTE = {
  MAIN: {
    [ROUTE_KEY.APP_DIR]: "/",
    [ROUTE_KEY.URI]: "/",
  },
  BRAND: {
    [ROUTE_KEY.APP_DIR]: "/brand",
    [ROUTE_KEY.URI]: "/brand",
  },
  JOIN: {
    [ROUTE_KEY.APP_DIR]: "/join",
    [ROUTE_KEY.URI]: "/join",
  },
  LOGIN: {
    [ROUTE_KEY.APP_DIR]: "/login",
    [ROUTE_KEY.URI]: "/login",
  },
  ARTICLE: {
    DEFAULT: { [ROUTE_KEY.APP_DIR]: "/commu", [ROUTE_KEY.URI]: "/commu" },

    DETAIL: {
      [ROUTE_KEY.APP_DIR]: "/commu/detail/[id]",
      [ROUTE_KEY.URI]: (params?: WithIdParams) => `/commu/detail/${params?.id}`,
    },
    EDIT: {
      [ROUTE_KEY.APP_DIR]: "/commu/edit/[id]",
      [ROUTE_KEY.URI]: (params?: WithIdParams) => `/commu/edit/${params?.id}`,
    },
    REGISTER: {
      [ROUTE_KEY.APP_DIR]: "/commu/register",
      [ROUTE_KEY.URI]: "/commu/register",
    },
  },
  RESTAURANT: {
    DEFAULT: {
      [ROUTE_KEY.APP_DIR]: "/restaurant",
      [ROUTE_KEY.URI]: "/restaurant",
    },

    DETAIL: {
      [ROUTE_KEY.APP_DIR]: "/restaurant/[id]",
      [ROUTE_KEY.URI]: (params?: WithIdParams) => `/restaurant/${params?.id}`,
    },

    REGISTER: {
      [ROUTE_KEY.APP_DIR]: "/restaurant/Register",
      [ROUTE_KEY.URI]: "/restaurant/register",
    },
  },
};
