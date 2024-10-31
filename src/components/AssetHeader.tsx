import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '@ui/config/colors'

type AssetHeaderProps = {
  image?: string
  name?: string
  description?: string
  averageScore?: number | null
  childCategory: string
}

export default function AssetHeader({
  image,
  name,
  description,
  averageScore,
  childCategory
}: Readonly<AssetHeaderProps>) {
  return (
    <>
      <View style={styles.assetContainer}>
        <Image
          source={{
            uri:
              image ??
              'https://media-cdn.tripadvisor.com/media/photo-s/04/56/4d/9b/loja-sole-comidas-artesanais.jpg'
          }}
          resizeMode='cover'
          style={styles.image}
        />
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
    color: colors.ui_9
  },
  averageScore: {
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.yellow_6
  },
  description: {
    color: colors.ui_6,
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
    color: colors.ui_8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
