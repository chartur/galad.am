import { makeEndpoints } from "@environment/endpoints";

export const baseUrl = "http://192.168.10.15:3000";

export const publicPath = (path: string): string => {
  return path[0] === "/"
    ? `${baseUrl}${path.replace("/public", "")}`
    : `${baseUrl}${path.replace("public", "")}`
}

export const endpoints = makeEndpoints(baseUrl);
