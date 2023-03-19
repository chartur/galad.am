import { makeEndpoints } from "@environment/endpoints";

export const baseUrl = "http://localhost:3000";

export const publicPath = (path: string): string => {
  return path[0] === "/"
    ? `${baseUrl}${path.replace("/public", "")}`
    : `${baseUrl}${path.replace("public", "")}`
}

export const endpoints = makeEndpoints(baseUrl);
