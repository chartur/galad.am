import { makeEndpoints } from "@environment/endpoints";

export const baseUrl = "https://back.galad.am";
export const appUrl: string = "https://dev.galad.am"

export const publicPath = (path: string): string => {
  return path[0] === "/"
    ? `${baseUrl}${path.replace("/public", "")}`
    : `${baseUrl}${path.replace("public", "")}`
}

export const endpoints = makeEndpoints(baseUrl);

export const environment = {
  production: false
};
