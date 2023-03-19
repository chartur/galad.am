export const makeEndpoints = (baseUrl: string) => ({
  banner: {
    getAll: `${baseUrl}/banner/actives`,
  },
  categories: {
    loadAll: `${baseUrl}/category/actives`
  }
})
