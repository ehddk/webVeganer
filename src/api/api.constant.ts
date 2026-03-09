const isMock = false;
const isDev =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? true : false;
const isLocal = false;
const localURL = "http://localhost:4000";

export const API_MOCK_URL = "https://67a4467431d0d3a6b785c768.mockapi.io/";
export const API_BASE_URL = (() => {
  if (isMock) return API_MOCK_URL;
  if (isLocal) return localURL;
  return isDev ? "http://localhost:4000" : "https://veganerserver.onrender.com";
})();
