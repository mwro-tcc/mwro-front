import { useForm } from 'react-hook-form'
import {
  Store as StoreType,
  StoreForm as StoreFormType
} from '@src/types/store'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import { Stack } from 'expo-router'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as TextRN
} from 'react-native'

import { useState } from 'react'
import colors from '@ui/config/colors'
import TextInput from '@ui/TextInput'
import HeaderTextButton from '@ui/HeaderTextButton'
import Store from '@api/mwro/store'

type Props = {
  onFinish: any
  store?: StoreType
  community?: any
}

export default function StoreForm(props: Props) {
  const { store, community, onFinish } = props

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
      contentContainerStyle={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          headerTitle: `${store ? 'Editar' : 'Criar'} Loja`,
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_10
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
      <VStack p={20} flex={1} gap={30} h={'100%'}>
        <VStack gap={30} flex={1}>
          {body}
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
