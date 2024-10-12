import Text from '@ui/Text'
import { Stack } from 'expo-router'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Product as ProductType } from '@src/types/product'
import { priceFormatter } from 'utils'
import IconButton from '@ui/IconButton'
import Form from '@forms/index'
import useBoolean from '@hooks/useBoolean'
import { isNil } from 'lodash'
import Button from '@ui/Button'
import { openWhatsApp } from 'components/WhatsAppIcon'
import VStack from '@ui/VStack'

type Props = {
  id: string
}

export default function Product(props: Props) {
  const { id } = props

  const { data, loading, error } = useModel<ProductType>({
    url: Routes.Product.get(id)
  })

  const {
    value: edit,
    setTrue: enableEditMode,
    setFalse: disabledEditMode
  } = useBoolean(false)

  if (edit) {
    if (isNil(data?.storeUuid)) return

    return (
      <Form.Product
        product={data}
        storeId={data.storeUuid}
        onCancel={disabledEditMode}
        onFinish={disabledEditMode}
      />
    )
  }

  const handleEdit = () => {
    if (!data || !id) return

    enableEditMode()
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (error || !data) return <Text>{error?.message}</Text>

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton icon='pencil-outline' onPress={handleEdit} />
          ),
          headerTitle: 'Produto'
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
            onPress={() =>
              openWhatsApp({
                phoneNumber: '5521997025550',
                message: 'Olá, gostaria de fazer um pedido'
              })
            }
            style={styles.contactButton}
            icon='whatsapp'
            variant='default'
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
    backgroundColor: '#fff',
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
    color: '#888',
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    color: '#333'
  },
  contactButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12
  }
})
