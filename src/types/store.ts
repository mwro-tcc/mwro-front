import { User } from "./user"

export type Store = {
  uuid: string
  name: string
  phoneNumber?: string
  description: string
  image?: string
  averageScore?: number
  isFavorite: boolean
  communityUuid?: string | null
  createdAt?: string
  userUuid?: string
  owner: User
}

export type StoreForm = Partial<Omit<Store, 'id'>>
