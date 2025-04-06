import { useForm } from 'react-hook-form'
import {
  Store as StoreType,
  StoreForm as StoreFormType
} from '@src/types/store'
import VStack from '@ui/VStack'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native'

import colors from '@ui/config/colors'
import TextInput from '@ui/TextInput'
import HeaderTextButton from '@ui/HeaderTextButton'
import Store from '@api/mwro/store'

type Props = {
  onFinish: any
  store?: StoreType
}

export default function StoreForm(props: Props) {
  const { store, onFinish } = props

  const form = useForm<StoreFormType>({
    defaultValues: store,
    values: store
  })

  const handleUpdate = async (storeData: StoreFormType) => {
    await Store.update(storeData)
    onFinish()
  }

  const handleCreate = async (storeData: StoreFormType) => {
    await Store.create(storeData)
    onFinish()
  }

  const handleSubmit = form.handleSubmit(store ? handleUpdate : handleCreate)

  const body = (() => {
    return (
      <>
        <TextInput
          control={form.control}
          name={'name'}
          label='Nome da Loja'
          required
        />
        <TextInput
          control={form.control}
          name={'description'}
          label='Descrição'
          required
          multiline={true}
          height={150}
        />
      </>
    )
  })()

  return (
    <ScrollView
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='never'
      contentContainerStyle={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          headerTitle: `${store ? 'Editar' : 'Criar'} Loja`,
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_10
          },
          headerBackVisible: false,
          headerLeft: () => (
            <HeaderTextButton color={colors.primary} onPress={onFinish}>
              Cancelar
            </HeaderTextButton>
          ),
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
      <VStack p={20} flex={1} gap={30} h={'100%'}>
        <VStack gap={30} flex={1}>
          {body}
        </VStack>
      </VStack>
    </ScrollView>
  )
}
