import { compile } from "path-to-regexp";

// export const parsePath = (path: string) => {
//   /** Locale */
//   const { locale } = LOCALE_URL_REGEX.exec(path)?.groups || {};

//   /** Locale 제외한 Path */
//   const pathname = path.replace(LOCALE_URL_REGEX, "$<path>");

//   return {
//     locale,
//     pathname,
//   };
// };

/** get Pathname */
export const getParamPath = (
  params: { [key: string]: any },
  pathname: string
) => {
  const paramMap = new Map(
    Object.entries(params).map(([key, value]) => [value, key])
  );

  const pathArray = pathname.split("/").map((path) => {
    const paramKey = paramMap.get(path);

    return `${paramKey ? `:${paramKey}` : path}`;
  });

  return pathArray.join("/").replace(/^\/(:locale)/, "") || "/";
};

/** remove baseUrl */
// export const removeBaseUrl = (urlString: string) => {
//   const baseUrl = STATIC_S3_URL;
//   const url = new URL(urlString);

//   // Ensure the base URL matches
//   if (url.origin + "/" === baseUrl) {
//     return url.pathname.slice(1); // Remove leading slash
//   }

//   return urlString; // If base URL doesn't match, return the original URL
// };

export const pathToUrl = (path: string, params?: Record<string, string>) => {
  const toPath = compile(path);
  return toPath(params);
};
