import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Community as CommunityType } from '@src/types/community'
import FilterHeader, { Tab } from 'components/FilterHeader'
import Show from '@ui/Show'
import VStack from '@ui/VStack'
import IconButton from '@ui/IconButton'
import useCache from '@hooks/useCache'
import Toast from '@lib/toast'
import List from 'components/List'
import AddStoreModal from 'components/AddStoreModal'
import colors from '@ui/config/colors'
import { createURL } from 'expo-linking'
import * as Clipboard from 'expo-clipboard'
import scope from '@lib/scope'
import { Product } from '@src/types/product'
import { Store } from '@src/types/store'

const TABS: Tab[] = [
  {
    id: 'products',
    label: 'Produtos',
    icon: 'shopping-outline'
  },
  {
    id: 'stores',
    label: 'Lojas',
    icon: 'storefront-outline'
  }
]

export default function Community() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { add } = useCache()

  const { data, loading, refreshing, error, handleRefresh } =
    useModel<CommunityType>({
      url: Routes.Community.get(id)
    })

  const [tab, setTab] = useState<string>(TABS[0]?.id)

  const [addStoreModalVisible, setAddStoreModalVisible] = useState(false)

  const handleEdit = () => {
    if (id) {
      add(id, data)
      router.push(`/(communities)/${id}/edit`)
    } else {
      Toast.error('Nenhum ID encontrado')
    }
  }

  const communityLink = createURL(`/(communities)/${id}`)

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(communityLink)

    Toast.success('O link foi copiado para sua área de transferência!')
  }

  if (error) return <Redirect href='/main' />

  const list = scope(() => {
    switch (tab) {
      case 'stores':
        return (
          <List
            getItemRoute={(item: Store) => {
              return {
                pathname: `/(communities)/${id}/store`,
                params: {
                  storeId: item.uuid
                }
              }
            }}
            numOfColumns={2}
            url={Routes.Community.get_community_stores(id)}
          />
        )
      case 'products':
        return (
          <List
            getItemRoute={(item: Product) => ({
              pathname: `/(communities)/products/${item.uuid}`
            })}
            numOfColumns={2}
            url={Routes.Community.get_community_products(id)}
          />
        )
      default:
        return null
    }
  })

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitle: 'Voltar',
          headerTitle: 'Comunidade',
          headerRight: () => (
            <IconButton icon='pencil-outline' onPress={handleEdit} />
          )
        }}
      />
      <Show when={loading}>
        <VStack flex={1} justify='center' items='center'>
          <ActivityIndicator />
        </VStack>
      </Show>
      <Show unless={loading}>
        <View style={styles.container}>
          <HStack justify='between' pt={20} pr={20} items='center'>
            <HStack gap={10}>
              <Text style={{ fontSize: 20, fontWeight: '600', gap: 4 }}>
                {data?.name}
              </Text>
              <IconButton
                icon='link'
                onPress={() => copyToClipboard()}
                color={colors.ui_6}
              />
            </HStack>
            <HStack gap={10}>
              <IconButton
                icon='store-plus-outline'
                onPress={() => setAddStoreModalVisible(true)}
                style={styles.iconContainer}
                color='black'
              />
              <IconButton
                icon='location-on'
                onPress={() => router.push(`/(communities)/${id}/map`)}
                style={styles.iconContainer}
                color='black'
                fromCommunity={false}
              />
            </HStack>
          </HStack>
          <Text>{data?.description}</Text>
        </View>
        <FilterHeader activeTab={tab} onTabChange={setTab} tabs={TABS} />
        {list}
      </Show>
      <Show when={addStoreModalVisible}>
        <AddStoreModal
          modalVisible={addStoreModalVisible}
          setModalVisible={setAddStoreModalVisible}
          communityUuid={id}
        />
      </Show>
    </>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  container: {
    backgroundColor: '#fff',
    height: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10
    },
    width: '100%',
    paddingLeft: 20
  }
})
