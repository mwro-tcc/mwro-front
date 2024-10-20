import React from 'react'
import { TouchableOpacity } from 'react-native'
import Favorite from '@api/mwro/favorite'
import { Heart } from 'lucide-react-native'
import colors from '@ui/config/colors'

type Props = {
  isFavorite?: boolean
  id: string
  handleRefresh: () => void
}

export const handleToggleFavorite = async ({
  isFavorite,
  id,
  handleRefresh
}: Props) => {
  isFavorite ? await Favorite.unfavorite(id) : await Favorite.favorite(id)
  handleRefresh()
}

export default function FavoriteIcon({ isFavorite, id, handleRefresh }: Props) {
  const handleClick = () =>
    handleToggleFavorite({ isFavorite, id, handleRefresh })

  return (
    <TouchableOpacity onPress={handleClick}>
      <Heart
        size={24}
        fill={isFavorite ? '#FF4E7A' : colors.ui_1}
        stroke={isFavorite ? '#FF4E7A' : colors.ui_6}
      />
    </TouchableOpacity>
  )
}
