import { Routes } from '@api/mwro'
import useModel from '@hooks/useModel'
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Product as ProductType } from '@src/types/product'
import useCache from '@hooks/useCache'
import { openWhatsApp } from 'components/WhatsAppIcon'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Text from '@ui/Text'
import colors, { ui } from '@ui/config/colors'
import HeaderTextButton from '@ui/HeaderTextButton'
import VStack from '@ui/VStack'
import { priceFormatter } from 'utils'
import Button from '@ui/Button'
import scope from '@lib/scope'
import Image from '@ui/Image'

export default function ProductId() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, loading, error } = useModel<ProductType>({
    url: Routes.Product.get(id)
  })

  const router = useRouter()

  const { add } = useCache()

  const handleOpenWhatsApp = () => {
    openWhatsApp({
      phoneNumber: '5521997025550',
      message: 'Olá, gostaria de fazer um pedido'
    })
  }

  const handleEdit = () => {
    add('product', data)
    router.push(
      {
        pathname: `./edit`
      },
      { relativeToDirectory: true }
    )
  }

  const content = scope(() => {
    if (loading) return <ActivityIndicator style={{ flex: 1 }} />
    if (error || !data) return <Text>{error?.message}</Text>

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <VStack>
          <Image src={Routes.Image.src(data.uuid)} style={styles.image} />
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>{`1x ${priceFormatter(data.price)}`}</Text>
          <Text style={styles.description}>{data.description}</Text>
        </VStack>
        <TouchableOpacity>
          <Button
            onPress={handleOpenWhatsApp}
            style={styles.contactButton}
            icon='whatsapp'
            variant='primary'
          >
            Entrar em contato
          </Button>
        </TouchableOpacity>
      </ScrollView>
    )
  })

  if (!id) return <Redirect href='/main/(account)/products' />

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitle: 'Voltar',
          headerTitle: '',
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colors.ui_10
          },
          headerStyle: {
            backgroundColor: ui.bg
          },
          contentStyle: {
            backgroundColor: ui.bg
          },
          headerRight: () => (
            <HeaderTextButton
              color={colors.primary}
              onPress={handleEdit}
              weight='600'
            >
              Editar
            </HeaderTextButton>
          )
        }}
      />
      {content}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    height: 390,
    borderRadius: 8,
    marginBottom: 16
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  description: {
    fontSize: 16
  },
  contactButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    color: colors.ui_1,
    backgroundColor: colors.primary
  }
})
