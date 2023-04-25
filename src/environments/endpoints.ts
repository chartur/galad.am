export const makeEndpoints = (baseUrl: string) => ({
  banner: {
    getAll: `${baseUrl}/banner/actives`,
  },
  categories: {
    loadAll: `${baseUrl}/category/actives`
  },
  products: {
    newArrivals: `${baseUrl}/product/new-arrivals`,
    getById: `${baseUrl}/product/:id`,
  },
  specialSections: {
    getAll: `${baseUrl}/special-section/actives`,
  }
})
