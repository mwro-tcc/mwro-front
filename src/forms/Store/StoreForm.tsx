import { useForm } from 'react-hook-form'
import { Store, StoreForm as StoreFormType } from '@src/types/store'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import Button from '@ui/Button'
import StoreFormStep1 from './components/StoreFormStep1'
import { useStore } from '@hooks/useStore'
import { Stack, useRouter } from 'expo-router'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as TextRN
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import HStack from '@ui/HStack'
import { useState } from 'react'

type Props = {
  store?: Store
  community?: any
}

export default function StoreForm(props: Props) {
  const router = useRouter()

  const { store, community } = props

  const { create_store, update_store } = useStore()

  const [pendingLeave, setPendingLeave] = useState(false)

  const form = useForm<StoreFormType>({
    defaultValues: store,
    values: store
  })

  const handleLeaveCommunity = () => {
    setPendingLeave(true)
  }

  const handleUpdate = async (storeData: StoreFormType) => {
    if (pendingLeave) {
      storeData.communityUuid = null
    }
    const { data }: any = await update_store(storeData)
    router.replace(`/stores/${data.uuid}`)
  }

  const handleCreate = async (storeData: StoreFormType) => {
    const { data }: any = await create_store(storeData)
    router.replace(`/stores/${data.uuid}`)
  }

  const handleSubmit = form.handleSubmit(store ? handleUpdate : handleCreate)

  const body = (() => {
    return (
      <>
        <StoreFormStep1 form={form} />
        {community && (
          <View style={styles.container}>
            <Text style={styles.infoText}>
              Esta loja pertence à comunidade:
            </Text>
            <View style={styles.communityRow}>
              <TextRN
                style={[
                  styles.communityName,
                  pendingLeave && styles.pendingLeave
                ]}
              >
                {community.name}
              </TextRN>
              {!pendingLeave && (
                <TouchableOpacity
                  onPress={handleLeaveCommunity}
                  style={styles.leaveButton}
                >
                  <Text style={styles.leaveButtonText}>Sair</Text>
                </TouchableOpacity>
              )}
            </View>
            {pendingLeave && (
              <Text style={styles.warningText}>
                A saída será confirmada ao salvar as alterações.
              </Text>
            )}
          </View>
        )}
      </>
    )
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

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
    position: 'relative',
    height: 80
  },
  infoText: {
    fontSize: 12,
    marginBottom: 6,
    color: '#333',
    fontWeight: 600
  },
  communityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32
  },
  communityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  leaveButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6
  },
  leaveButtonText: {
    color: '#fff',
    fontSize: 14
  },
  pendingLeave: {
    color: '#ff6b6b',
    textDecorationLine: 'line-through'
  },
  warningText: {
    color: '#ff6b6b',
    fontSize: 12,
    position: 'absolute',
    bottom: 0,
    left: 16
  }
})
