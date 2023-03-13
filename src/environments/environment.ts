export const baseUrl = "http://data.galad.am/";

export const publicPath = (path: string): string => {
  return path[0] === "/"
    ? `${baseUrl}${path.replace("/public", "")}`
    : `${baseUrl}/${path.replace("public", "")}`
}

export const endpoints = {
  banner: {
    getAll: `${baseUrl}/banner/actives`,
  }
}
