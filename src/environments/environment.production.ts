import { makeEndpoints } from "@environment/endpoints";

export const baseUrl = "https://server.galad.am";
export const appUrl: string = "https://galad.am"
export const walletAddress = "0:0059bfe065d99a21249a171d98645a71a5757dbf1a61362fe18cef5c038b478b";

export const publicPath = (path: string): string => {
  return path[0] === "/"
    ? `${baseUrl}${path.replace("/public", "")}`
    : `${baseUrl}${path.replace("public", "")}`
}

export const endpoints = makeEndpoints(baseUrl);

export const environment = {
  production: false
};
