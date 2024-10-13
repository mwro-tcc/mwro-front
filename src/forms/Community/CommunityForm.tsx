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

type Props = {
  community?: Community
}

export default function CommunityForm(props: Props) {
  const { community } = props
  const router = useRouter()
  const form = useForm<CommunityFormType>({
    defaultValues: community
  })
  const { create_community, update_community } = useCommunity()

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
            <Image w={75} h={75} bg={colors.blue_1} rounded={rounded.sm} />
            <Button variant='text'>Selecionar...</Button>
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
            label='Localizaçãp'
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
