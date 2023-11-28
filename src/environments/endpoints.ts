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
    relatedProducts: `${baseUrl}/product/related/:id`,
  },
  specialSections: {
    getAll: `${baseUrl}/special-section/actives`,
  }
})
