import { StyleSheet, Text, View } from 'react-native'
import colors, { ui } from '@ui/config/colors'
import Image from '@ui/Image'
import rounded from '@ui/config/rounded'
import useImagePicker from '@hooks/useImagePicker'
import ImageUploader from '@api/mwro/image_uploader'
import { Routes } from '@api/mwro'
import Button from '@ui/Button'
import VStack from '@ui/VStack'
import { Asset } from '@src/types/asset'

type Props = Readonly<{
  asset: Asset
  averageScore?: number | null
  childCategory: string
  hasPermissionsToEdit?: boolean
}>

export default function AssetHeader(props: Props) {
  const { asset, averageScore, childCategory, hasPermissionsToEdit } = props
  const { uuid: id, name, description } = asset

  const { image, loading, pickImage } = useImagePicker({
    initialImage: Routes.Image.src(id),
    onPick: ImageUploader.createUploader(id)
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
            border={[StyleSheet.hairlineWidth, 'solid', ui.border]}
          />
          {hasPermissionsToEdit && (
            <Button variant='text' onPress={pickImage}>
              Alterar
            </Button>
          )}
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
              <Text style={styles.description}>{description}</Text>
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
    backgroundColor: colors.background
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
    color: ui.yellow
  },
  description: {
    color: colors.ui_7,
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 300
  },
  scoreAndDescription: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  category: {
    backgroundColor: colors.background,
    color: colors.ui_9,
    paddingHorizontal: 13,
    marginTop: 9,
    marginBottom: 3,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
