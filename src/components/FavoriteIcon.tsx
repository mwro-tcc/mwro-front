import React from 'react'
import { TouchableOpacity } from 'react-native'
import Favorite from '@api/mwro/favorite'
import { Heart } from 'lucide-react-native'
import { FavoriteIconStyle } from '@ui/config/colors'

type Asset = {
  id: string
  isFavorite?: boolean
}

type ToggleProps = {
  asset: Asset
}

type IconProps = {
  asset: Asset
  onAfterClick?: () => void
}

export const handleToggleFavorite = async ({ asset }: ToggleProps) => {
  asset?.isFavorite
    ? await Favorite.unfavorite(asset.id)
    : await Favorite.favorite(asset.id)
}

export default function FavoriteIcon({ asset, onAfterClick }: IconProps) {
  const handleClick = async () => {
    await handleToggleFavorite({ asset })
    onAfterClick && onAfterClick()
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <Heart
        size={21}
        fill={
          asset?.isFavorite
            ? FavoriteIconStyle.FILLED.fill
            : FavoriteIconStyle.OUTLINED.fill
        }
        stroke={
          asset?.isFavorite
            ? FavoriteIconStyle.FILLED.stroke
            : FavoriteIconStyle.OUTLINED.stroke
        }
      />
    </TouchableOpacity>
  )
}
