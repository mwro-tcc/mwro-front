import { useForm } from 'react-hook-form'
import {
  Community,
  CommunityForm as CommunityFormType
} from '@src/types/community'
import VStack from '@ui/VStack'
import { useCommunity } from '@hooks/useCommunity'
import { ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import colors from '@ui/config/colors'
import HeaderTextButton from '@ui/HeaderTextButton'
import TextInput from '@ui/TextInput'
import ActionList from '@ui/ActionList'
import Image from '@ui/Image'
import rounded from '@ui/config/rounded'
import HStack from '@ui/HStack'
import Button from '@ui/Button'
import useImagePicker from '@hooks/useImagePicker'
import ImageUploader from '@api/mwro/image_uploader'
import { Routes } from '@api/mwro'

type Props = {
  debug?: boolean
  community?: Community
}

export default function CommunityForm(props: Props) {
  const { community, debug } = props
  const router = useRouter()
  const form = useForm<CommunityFormType>({
    defaultValues: community
  })

  if (debug) console.log('community', community)

  const { create_community, update_community } = useCommunity()

  const { image, pickImage, loading } = useImagePicker({
    debug,
    initialImage: `http://mwro-stg.inkwo.dev${Routes.Image.get('4256cf97-200b-4685-a6e1-b5dcd2470129')}`,
    onPick: ImageUploader.createUploader('4256cf97-200b-4685-a6e1-b5dcd2470129')
  })

  const handleSubmit = async (value: any) => {
    await form.handleSubmit(
      props.community ? update_community : create_community
    )(value)

    router.back()
  }

  return (
    <VStack p={20} flex={1} gap={30}>
      <Stack.Screen
        options={{
          headerTitle: `${community?.uuid ? 'Editar' : 'Criar'} Comunidade`,
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_9
          },
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              color={tintColor}
              onPress={handleSubmit}
              weight='600'
              disabled={!form.formState.isValid}
            >
              Salvar
            </HeaderTextButton>
          ),
          headerBackTitle: 'Voltar'
        }}
      />
      <VStack gap={30} flex={1}>
        <ScrollView
          keyboardDismissMode='on-drag'
          contentContainerStyle={{ flex: 1, gap: 30 }}
        >
          <HStack items='center' gap={15}>
            <Image
              loading={loading}
              src={image}
              hasAuthenticationHeaders
              w={75}
              h={75}
              bg={colors.blue_1}
              rounded={rounded.sm}
            />
            <Button variant='text' onPress={pickImage}>
              Selecionar...
            </Button>
          </HStack>
          <TextInput
            control={form.control}
            name={'name'}
            label='Nome da Comunidade'
            required
          />
          <TextInput
            control={form.control}
            name={'description'}
            label='Descrição'
            multiline
            numberOfLines={3}
            height={100}
            required
          />
          <ActionList
            label='Localização'
            data={[
              {
                title: 'Definir'
              }
            ]}
          />
        </ScrollView>
      </VStack>
    </VStack>
  )
}
