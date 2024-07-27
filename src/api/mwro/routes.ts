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
    get: (id: number | string | undefined | null) => `/communities/${id}`,
    get_community_products: (id: number | string | undefined | null) =>
      `/communities/${id}/products`
  },
  Store: {
    list_user_stores: '/stores/mine',
    create: '/stores',
    update: (uuid: number | string | undefined | null) => `/stores/${uuid}`,
    get: (id: number | string | undefined | null) => `/stores/${id}`,
    get_store_products: (id: number | string | undefined | null) =>
      `/stores/${id}/products`,
    delete: (uuid: number | string | undefined | null) => `/stores/${uuid}`
  }
}

export default Routes
