export type CommunityData = {
  id?: number;
  name: string;
  description: string;
  isPrivate: boolean;
  latitude: number;
  longitude: number;
};

export type CreateCommunityForm = Pick<
  CommunityData,
  "name" | "description" | "isPrivate" | "latitude" | "longitude"
>;

export type UpdateCommunityForm = Pick<
  CommunityData,
  "name" | "description" | "isPrivate"
>;
