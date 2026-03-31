const isMock = false;
const isDev =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? true : false;
const isLocal = true;
const localURL = "http://localhost:4000";

export const API_MOCK_URL = "https://67a4467431d0d3a6b785c768.mockapi.io/";
export const API_BASE_URL = (() => {
  if (isMock) return API_MOCK_URL;
  if (isLocal) return localURL;
  return (
    process.env.NEXT_PUBLIC_API_URL || "https://veganerserver.onrender.com"
  );
  // ✅ 환경변수로 관리
})();
