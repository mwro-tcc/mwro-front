const Routes = {
  Auth: {
    sign_up: '/users/sign-up',
    sign_in: '/users/sign-in'
  },
  Community: {
    list: '/communities',
    list_user_communities: '/communities/created',
    create: '/communities',
    update: '/communities/:id',
    get: (id: string | undefined | null) => `/communities/${id}`,
    delete: (id: string | undefined | null) => `/communities/${id}`,
    get_community_products: (id: string | undefined | null) =>
      `/communities/${id}/products`,
    get_community_stores: (id: string | undefined | null) =>
      `/communities/${id}/stores`
  },
  Store: {
    list_user_stores: '/stores/mine',
    create: '/stores',
    update: (uuid: string | undefined | null) => `/stores/${uuid}`,
    get: (uuid: string | undefined | null) => `/stores/${uuid}`,
    get_store_products: (id: string | undefined | null) =>
      `/stores/${id}/products`,
    delete: (uuid: string | undefined | null) => `/stores/${uuid}`
  },
  Product: {
    create: '/products',
    get: (uuid: string | undefined | null) => `/products/${uuid}`,
    update: (uuid: string | undefined | null) => `/products/${uuid}`,
    delete: (uuid: string | undefined | null) => `/products/${uuid}`
  }
}

export default Routes
