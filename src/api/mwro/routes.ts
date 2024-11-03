import { MWRO_API_BASE_URL } from "./api"

const Routes = {
  User: {
    update: '/users',
    delete: '/users'
  },
  Auth: {
    me: '/users/me',
    sign_up: '/users/sign-up',
    sign_in: '/users/sign-in'
  },
  Favorite: {
    favorite: (id: string) => `/favorites/${id}`,
    unfavorite: (id: string) => `/favorites/${id}`,

  },
  Community: {
    list: '/communities',
    list_user_communities: '/communities/created',
    create: '/communities',
    update: (id: string | undefined | null) => `/communities/${id}`,
    get: (id: string | undefined | null) => `/communities/${id}`,
    delete: (id: string | undefined | null) => `/communities/${id}`,
    get_community_products: (id: string | undefined | null) =>
      `/communities/${id}/products`,
    get_community_stores: (uuid: string | undefined | null) =>
      `/communities/${uuid}/stores`
  },
  Store: {
    list_user_stores: '/stores/mine',
    create: '/stores',
    update: (uuid: string | undefined | null) => `/stores/${uuid}`,
    get: (uuid: string | undefined | null) => `/stores/${uuid}`,
    get_store_products: (id: string | undefined | null) =>
      `/stores/${id}/products`,
    delete: (uuid: string | undefined | null) => `/stores/${uuid}`,
    get_favorites: () => `/stores/favorites`
  },
  Product: {
    create: '/products',
    get: (uuid: string | undefined | null) => `/products/${uuid}`,
    update: (uuid: string | undefined | null) => `/products/${uuid}`,
    delete: (uuid: string | undefined | null) => `/products/${uuid}`
  },
  Image: {
    get: (assetId: string) => `/images/${assetId}`,
    src: (assetId?: string) => assetId ? `${MWRO_API_BASE_URL}images/${assetId}` : null,
    create: (assetId: string) => `/images/${assetId}`
  }
}

export default Routes
