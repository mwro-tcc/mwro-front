export type Store = {
  uuid: string
  name: string
  description: string
  communityUuid?: string | null
  createdAt?: string
  userUuid?: string
}

export type StoreForm = Partial<Omit<Store, 'id'>>
