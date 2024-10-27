export type Community = {
  uuid: string
  name: string
  description: string
  latitude: number
  longitude: number
}

export type CommunityForm = Partial<Omit<Community, 'id'>>

