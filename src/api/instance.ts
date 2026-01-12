import axios from "axios";
import qs from "qs";

import { API_BASE_URL } from "./api.constant";
import Cookies from "js-cookie";

export const baseAjax = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // adapter: "fetch",
  // fetchOptions: {
  //   cache: "force-cache",
  // },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

//     try {
//       let token;

//       if (typeof window === "undefined") {
//         // Server Environment
//         try {
//           const headers = await import("next/headers");
//           const cookieStore = await headers.cookies();
//           token = cookieStore?.get(STORAGE_KEY.ACCESS_TOKEN)?.value;
//         } catch (e) {
//           // headers API를 사용할 수 없는 경우 (generateStaticParams 등)
//           return config;
//         }
//       } else {
//         const Cookies = (await import("js-cookie")).default;

//         // token =
//         //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzgxMjE0NiwiaWF0IjoxNzAxMjIwMTQ2LCJqdGkiOiI4YmNmNjNiNzYzOTk0ZmI2ODE3NDAwZDVjMzg4MzhkNCIsInVzZXJfaWQiOiJMa2JCUVY4RHd0ZiJ9.dDS9_aVvlVT6YB2tM65aVwSb4hYrryqynMe2xWlmpsI";
//         token = Cookies.get(STORAGE_KEY.ACCESS_TOKEN);
//       }

//       if (token && !config.headers.Authorization) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       if (!token || config.headers["Auth"] === "false") {
//         config.headers.Authorization = undefined;
//         config.headers["Auth"] = undefined;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     return config;
//   },
//   async function (err) {
//     return Promise.reject(err);
//   }
// );
baseAjax.interceptors.request.use(
  function (config) {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      const token = Cookies.get("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Bearer 추가!
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
baseAjax.interceptors.response.use(
  async function (config) {
    return config;
  },
  async function (err) {
    // console.log(JSON.stringify(err.response.data, null, 2));
    throw new Error(err?.response?.data?.detail);
  }
);

export const createServerAjax = (accessToken: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
