import axios from "axios";
import qs from "qs";

import { API_BASE_URL } from "./api.constant";
// import Cookies from "js-cookie";

export const baseAjax = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },

  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

baseAjax.interceptors.request.use(
  async function (config) {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      const { supabase } = await import("@/lib/supabaseClient");
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const MAX_RETRY = 3;
const RETRY_DELAY_MS = 3000;

const isRetryableError = (err: unknown): boolean => {
  if (!axios.isAxiosError(err)) return false;
  if (err.code === "ECONNABORTED") return true;
  if (err.code === "ERR_NETWORK") return true;
  const status = err.response?.status;
  if (status && status >= 500 && status < 600) return true;
  return !err.response;
};

baseAjax.interceptors.response.use(
  async function (config) {
    return config;
  },
  async function (err) {
    const config = err?.config as
      | (import("axios").InternalAxiosRequestConfig & { __retryCount?: number })
      | undefined;

    if (!config || !isRetryableError(err)) {
      console.log("인터셉터에서 에러 감지!");
      return Promise.reject(err);
    }

    config.__retryCount = config.__retryCount ?? 0;
    if (config.__retryCount >= MAX_RETRY) {
      return Promise.reject(err);
    }

    config.__retryCount += 1;
    const delay = RETRY_DELAY_MS * config.__retryCount;
    console.log(
      `서버 응답 없음 - ${config.__retryCount}/${MAX_RETRY} 재시도 (${delay}ms 후)`
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    return baseAjax(config);
  }
);

//인증 정보가 포함된 Axios 인스턴스를 만들어주는 팩토리 함수
export const createServerAjax = (accessToken: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
