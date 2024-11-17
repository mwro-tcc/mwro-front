import { StyleSheet, Text, View } from 'react-native'
import colors from '@ui/config/colors'
import Image from '@ui/Image'
import rounded from '@ui/config/rounded'
import useImagePicker from '@hooks/useImagePicker'
import ImageUploader from '@api/mwro/image_uploader'
import { Routes } from '@api/mwro'
import { Community } from '@src/types/community'
import { Product } from '@src/types/product'
import { Store } from '@src/types/store'
import Button from '@ui/Button'
import VStack from '@ui/VStack'

type Props = Readonly<{
  asset: Community | Store | Product
  averageScore?: number | null
  childCategory: string
}>

export default function AssetHeader(props: Props) {
  const { asset, averageScore, childCategory } = props

  const { uuid: id, name, description } = asset

  const { image, loading, pickImage } = useImagePicker({
    initialImage: Routes.Image.src(id),
    onPick: ImageUploader.createUploader(id),
    debug: true
  })

  return (
    <>
      <View style={styles.assetContainer}>
        <VStack items='center' gap={5}>
          <Image
            loading={loading}
            src={image}
            style={styles.image}
            hasAuthenticationHeaders
            w={92}
            h={92}
            rounded={rounded.circle}
          />
          <Button variant='text' onPress={pickImage}>
            Alterar
          </Button>
        </VStack>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.scoreAndDescription}>
            {averageScore! > 0 && (
              <Text style={styles.averageScore}>⭐ {averageScore}</Text>
            )}
            {averageScore === null && (
              <Text style={styles.averageScore}>Novidade!</Text>
            )}
            {description && (
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.description}
              >
                {description}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.category}>{childCategory}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 17,
    padding: 16,
    backgroundColor: colors.ui_1
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.ui_10
  },
  averageScore: {
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.yellow_6
  },
  description: {
    color: colors.ui_7,
    fontSize: 13,
    maxWidth: 141
  },
  scoreAndDescription: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  category: {
    backgroundColor: colors.ui_1,
    color: colors.ui_9,
    paddingHorizontal: 16,
    paddingVertical: 9,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
