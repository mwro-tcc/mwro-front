import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Community as CommunityType } from '@src/types/community'
import Show from '@ui/Show'
import IconButton from '@ui/IconButton'
import useCache from '@hooks/useCache'
import Toast from '@lib/toast'
import AddStoreModal from 'components/AddStoreModal'
import colors from '@ui/config/colors'
import { createURL } from 'expo-linking'
import * as Clipboard from 'expo-clipboard'
import { Store } from '@src/types/store'
import AssetList from 'components/AssetList'
import useCollection from '@hooks/useCollection'
import ScreenLoading from '@ui/ScreenLoading'
import AssetHeader from 'components/AssetHeader'
import Menu from '@ui/Menu'
import { Pencil, Trash } from 'lucide-react-native'

export default function Community() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { add } = useCache()

  const {
    data,
    loading,
    refreshing: isCommunityRefreshing,
    error,
    handleRefresh: handleCommunityRefresh
  } = useModel<CommunityType>({
    url: Routes.Community.get(id)
  })

  const {
    formattedData: stores,
    loading: isLoadingStores,
    refreshing: storesRefreshing,
    handleRefresh: handleStoresRefresh
  } = useCollection<Store>({
    url: Routes.Community.get_community_stores(id),
    dataFormatter: (data) => {
      return data?.map((store) => ({
        ...store,
        onPress: () =>
          router.push(`../../stores/${store.uuid}`, {
            relativeToDirectory: true
          })
      }))
    }
  })

  const refreshing = isCommunityRefreshing || storesRefreshing

  const handleRefresh = () => {
    handleCommunityRefresh()
    handleStoresRefresh()
  }

  const [addStoreModalVisible, setAddStoreModalVisible] = useState(false)

  const handleEdit = () => {
    if (id) {
      add(id, data)
      router.push(`./edit`, {
        relativeToDirectory: true
      })
    } else {
      Toast.error('Nenhum ID encontrado')
    }
  }

  const communityLink = createURL(`/communities/${id}`)

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(communityLink)

    Toast.success('O link foi copiado para sua área de transferência!')
  }

  if (error) return <Redirect href='/main' />

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitle: 'Voltar',
          headerTitle: '',
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerRight: ({ tintColor }) => (
            <Menu
              debug
              color={tintColor}
              items={[
                {
                  label: 'Editar',
                  onPress: handleEdit,
                  icon: <Pencil />
                }
              ]}
            />
          )
        }}
      />
      <Show unless={loading}>
        <AssetHeader asset={data!} childCategory='Lojas' />
        <View style={styles.container}>
          <HStack justify='between' pt={20} pr={20} items='center'>
            <HStack gap={10}>
              <Text style={{ fontSize: 20, fontWeight: '600', gap: 4 }}>
                {data?.name}
              </Text>
              <IconButton
                icon='link'
                onPress={() => copyToClipboard()}
                color={colors.ui_7}
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
                onPress={() =>
                  router.push(`./${id}/map`, { relativeToDirectory: true })
                }
                style={styles.iconContainer}
                color='black'
                fromCommunity={false}
              />
            </HStack>
          </HStack>
        </View>
        <Show unless={isLoadingStores} placeholder={<ScreenLoading />}>
          <AssetList
            data={stores}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        </Show>
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
    backgroundColor: colors.ui_1,
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
