import { useForm } from 'react-hook-form'
import { Store, StoreForm as StoreFormType } from '@src/types/store'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import Button from '@ui/Button'
import StoreFormStep1 from './components/StoreFormStep1'
import { useStore } from '@hooks/useStore'
import { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { ScrollView, TouchableOpacity } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import HStack from '@ui/HStack'

type Props = {
  store?: Store
}

export default function StoreForm(props: Props) {
  const router = useRouter()

  const { store } = props

  const { create_store, update_store } = useStore()

  const form = useForm<StoreFormType>({
    defaultValues: store
  })

  useEffect(() => {
    form.reset(store)
  }, [store])

  const handleUpdate = async (storeData: StoreFormType) => {
    const { data }: any = await update_store(storeData)
    router.replace(`/stores/${data.uuid}`)
  }

  const handleCreate = async (storeData: StoreFormType) => {
    const { data }: any = await create_store(storeData)
    router.replace(`/stores/${data.uuid}`)
  }

  const handleSubmit = form.handleSubmit(store ? handleUpdate : handleCreate)

  const body = (() => {
    return <StoreFormStep1 form={form} />
  })()

  return (
    <ScrollView
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='never'
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          headerTitle: 'Loja',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                store
                  ? router.replace(`/stores/${store.uuid}`)
                  : router.replace(`/stores/`)
              }
            >
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
                <Text size={16}>Voltar</Text>
              </HStack>
            </TouchableOpacity>
          )
        }}
      />
      <VStack p={20} flex={1} gap={30} h={'100%'}>
        <VStack items='center' gap={20}>
          <Text size={28} weight='600'>
            {store ? 'Editar' : 'Criar'} Loja
          </Text>
        </VStack>
        <VStack gap={30} flex={1}>
          {body}
        </VStack>
        <VStack gap={10}>
          <Button
            variant='primary'
            onPress={handleSubmit}
            disabled={!form.formState.isValid}
          >
            Concluir
          </Button>
          <Button
            onPress={() =>
              store
                ? router.replace(`/stores/${store.uuid}`)
                : router.replace(`/stores`)
            }
          >
            Cancelar
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
