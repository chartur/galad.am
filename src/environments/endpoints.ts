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
  },
  auth: {
    signIn: `${baseUrl}/auth/user/sign-in`,
    signUp: `${baseUrl}/auth/user/sign-up`,
    getUser: `${baseUrl}/auth/user/user`
  },
  profile: {
    updatePersonalSettings: `${baseUrl}/profile/personal-settings`
  }
})
