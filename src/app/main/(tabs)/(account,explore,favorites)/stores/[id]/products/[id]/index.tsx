import { Routes } from '@api/mwro'
import useModel from '@hooks/useModel'
import {
  Redirect,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter
} from 'expo-router'
import { Product as ProductType } from '@src/types/product'
import useCache from '@hooks/useCache'
import { openWhatsApp } from 'components/WhatsAppIcon'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Text from '@ui/Text'
import colors, { ui } from '@ui/config/colors'
import VStack from '@ui/VStack'
import { priceFormatter } from 'utils'
import Button from '@ui/Button'
import scope from '@lib/scope'
import Image from '@ui/Image'
import Menu from '@ui/Menu'
import HStack from '@ui/HStack'
import { ChevronDown, ImageIcon, Pencil, Trash2 } from 'lucide-react-native'
import { parse_style_shorthands } from '@ui/types/style_shorthands'
import Spacer from '@ui/Spacer'
import useAuth from '@hooks/useAuth'
import useImagePicker from '@hooks/useImagePicker'
import ImageUploader from '@api/mwro/image_uploader'
import Show from '@ui/Show'
import Api from '@api/mwro/api'
import Toast from '@lib/toast'
import { useQuery } from '@tanstack/react-query'

export default function ProductId() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const {
    data: response,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => Api.get(Routes.Product.get(id))
  })

  const data = response?.data as ProductType

  const { user } = useAuth()

  const isOwner = user?.data === data?.owner?.uuid

  const {
    image,
    loading: imageIsLoading,
    pickImage
  } = useImagePicker({
    aspectRatio: [1, 1],
    initialImage: Routes.Image.src(data?.uuid),
    onPick: ImageUploader.createUploader(data?.uuid)
  })

  const imageSize = Dimensions.get('window').width

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

  const handleDelete = () => {
    const title = 'Deletar produto'
    const description =
      'Tem certeza que deseja deletar esse produto? Essa ação é irreversível.'

    const action = () => {
      Api.delete(Routes.Product.delete(data?.uuid))
        .then(() => {
          Toast.success('Produto deletado com sucesso')
          router.push('..')
        })
        .catch((error) => {
          console.error(error)
          Toast.error('Erro ao deletar produto')
        })
    }

    Alert.alert(title, description, [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Deletar',
        onPress: action,
        style: 'destructive'
      }
    ])
  }

  const content = scope(() => {
    if (loading) return <ActivityIndicator style={{ flex: 1 }} />
    if (error || !data) return <Text>{error?.message}</Text>

    return (
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <VStack>
          <HStack
            items='center'
            justify='between'
            absolute
            z={1}
            w='100%'
            p={12}
          >
            <TouchableOpacity
              onPress={() => router.push('..')}
              style={parse_style_shorthands({
                bg: '#00000060',
                rounded: 50,
                p: 4
              })}
            >
              <ChevronDown color='#ffffff' />
            </TouchableOpacity>
            <Show when={isOwner}>
              <Menu
                bg='#00000000'
                color='#ffffff'
                containerStyle={{
                  bg: '#00000060',
                  rounded: 50,
                  p: 4
                }}
                items={[
                  {
                    label: 'Editar',
                    onPress: handleEdit,
                    color: ui.fg,
                    icon: <Pencil />
                  },
                  {
                    label: 'Alterar Imagem',
                    onPress: pickImage,
                    color: ui.fg,
                    icon: <ImageIcon />
                  },
                  {
                    label: 'Deletar',
                    onPress: handleDelete,
                    icon: <Trash2 />,
                    color: ui.destructive
                  }
                ]}
              />
            </Show>
          </HStack>
          <Image
            src={image}
            h={imageSize}
            loading={imageIsLoading}
            hasAuthenticationHeaders
          />
          <HStack
            w='100%'
            h={10}
            bg={ui.bg}
            absolute
            z={10}
            b={0}
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          />
        </VStack>
        <VStack flex={1} px={16} py={8} gap={8}>
          <Text weight='bold' size={20}>
            {data.name}
          </Text>
          <Text size={15} color={ui.subtle}>
            {data.description}
          </Text>
          <Text color={ui.subtle} size={15}>
            {priceFormatter(data.price)}
          </Text>
          <Spacer />
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
        </VStack>
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
          }
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>{content}</SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
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
