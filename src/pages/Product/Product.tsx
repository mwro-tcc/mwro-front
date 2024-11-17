import Text from '@ui/Text'
import { Stack, useRouter } from 'expo-router'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Product as ProductType } from '@src/types/product'
import { priceFormatter } from 'utils'
import Button from '@ui/Button'
import { openWhatsApp } from 'components/WhatsAppIcon'
import VStack from '@ui/VStack'
import colors from '@ui/config/colors'
import useCache from '@hooks/useCache'
import HeaderTextButton from '@ui/HeaderTextButton'

type Props = {
  id: string
}

export default function Product(props: Props) {
  const { id } = props

  const { data, loading, error, handleRefresh, refreshing } =
    useModel<ProductType>({
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
    add(id, data)
    router.push({
      pathname: `/main/(favorites)/products/${id}/edit`
    })
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (error || !data) return <Text>{error?.message}</Text>

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
          contentStyle: { backgroundColor: colors.background },
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              color={tintColor}
              onPress={handleEdit}
              weight='600'
            >
              Editar
            </HeaderTextButton>
          )
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <VStack>
          <Image
            source={{
              uri: 'https://www.proclinic-products.com/build/static/default-product.30484205.png'
            }}
            style={styles.image}
          />
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
