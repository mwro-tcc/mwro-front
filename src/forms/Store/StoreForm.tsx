import { useForm } from 'react-hook-form'
import { Store, StoreForm as StoreFormType } from '@src/types/store'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import Button from '@ui/Button'
import StoreFormStep1 from './components/StoreFormStep1'
import { useStore } from '@hooks/useStore'
import SafeKeyboardScrollView from '@ui/SafeKeyboardScrollView'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

type Props = {
  onCancel: () => void
  store?: Store
}

export default function StoreForm(props: Props) {
  const form = useForm<StoreFormType>({
    defaultValues: props.store
  })

  const router = useRouter()

  useEffect(() => {
    form.reset(props.store)
  }, [props.store])

  const store_created = props.store

  const { create_store, update_store } = useStore()

  const handleUpdate = async (storeData: StoreFormType) => {
    await update_store(storeData)
    router.replace(`/stores/${storeData.uuid}`)
  }

  const handleCreate = async (storeData: StoreFormType) => {
    const { data }: any = await create_store(storeData)
    router.replace(`/stores/${data.uuid}`)
  }

  const handleSubmit = form.handleSubmit(
    store_created ? handleUpdate : handleCreate
  )

  const body = (() => {
    return <StoreFormStep1 form={form} />
  })()

  return (
    <SafeKeyboardScrollView>
      <VStack p={20} flex={1} gap={30} h={'100%'}>
        <VStack items='center' gap={20}>
          <Text size={28} weight='600'>
            {props.store ? 'Editar' : 'Criar'} Loja
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
          <Button onPress={props.onCancel}>Cancelar</Button>
        </VStack>
      </VStack>
    </SafeKeyboardScrollView>
  )
}
