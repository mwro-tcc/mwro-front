import { User } from "./user"

export type Community = {
  uuid: string
  name: string
  description: string
  latitude: number
  longitude: number
  owner: User
}

export type CommunityForm = Partial<Omit<Community, 'id'>>

