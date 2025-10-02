const ROUTE_KEY = {
  APP_DIR: "appDir",
  URI: "uri",
} as const;

interface WithIdParams {
  id?: string;
}

export const LINK_ROUTE = {
  ARTICLE: {
    DEFAULT: { [ROUTE_KEY.APP_DIR]: "/commu", [ROUTE_KEY.URI]: "/commu" },

    DETAIL: {
      [ROUTE_KEY.APP_DIR]: "/commu/detail/[id]",
      [ROUTE_KEY.URI]: (params?: WithIdParams) => `/commu/detail/${params?.id}`,
    },
    EDIT: {
      [ROUTE_KEY.APP_DIR]: "/commu/Edit/[id]",
      [ROUTE_KEY.URI]: (params?: WithIdParams) => `/commu/edit/${params?.id}`,
    },
    REGISTER: {
      [ROUTE_KEY.APP_DIR]: "/commu/Register",
      [ROUTE_KEY.URI]: "/commu/register",
    },
  },
};
