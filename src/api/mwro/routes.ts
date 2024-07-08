const Routes = {
  Community: {
    list: '/communities',
    list_user_communities: '/communities/created',
    create: '/communities',
    update: '/communities/:id',
    get: (id: number | string | undefined | null) => `/communities/${id}`
  }
}

export default Routes
