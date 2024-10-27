import { useForm } from 'react-hook-form'
import {
  Community as CommunityType,
  CommunityForm as CommunityFormType
} from '@src/types/community'
import VStack from '@ui/VStack'
import { ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import colors from '@ui/config/colors'
import HeaderTextButton from '@ui/HeaderTextButton'
import TextInput from '@ui/TextInput'
import ActionList from '@ui/ActionList'
import CommunityImagePicker from './components/CommunityImagePicker'
import Show from '@ui/Show'
import { Community } from '@api/mwro'

type Props = {
  debug?: boolean
  community?: CommunityType
}

export default function CommunityForm(props: Props) {
  const { community, debug } = props
  const router = useRouter()
  const form = useForm<CommunityFormType>({
    defaultValues: community,
    reValidateMode: 'onChange'
  })

  if (debug) {
    console.log('FORM_ERRORS:', form.formState.errors)
    console.log('FORM_IS_VALID:', form.formState.isValid)
    console.log('community', community)
  }

  const handleSubmit = async (value: any) => {
    form.handleSubmit(community ? Community.update : Community.create)(value)
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
          <Show when={community?.uuid}>
            <CommunityImagePicker community={community!} />
          </Show>
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
