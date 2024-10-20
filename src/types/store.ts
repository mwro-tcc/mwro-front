export type Store = {
  uuid: string
  name: string
  phoneNumber: string
  description: string
  isFavorite?: boolean
  communityUuid?: string | null
  createdAt?: string
  userUuid?: string
}

export type StoreForm = Partial<Omit<Store, 'id'>>
