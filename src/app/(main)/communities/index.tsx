import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Toast from '@lib/toast'
import { Community } from '@src/types/community'
import colors from '@ui/config/colors'
import VStack from '@ui/VStack'
import { useCallback, useMemo } from 'react'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import IconButton from '@ui/IconButton'
import ActionList, { ActionListSwipeAction, ActionType } from '@ui/ActionList'
import * as Location from 'expo-location'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { MaterialIcons } from '@expo/vector-icons'

export default function Communities() {
  const router = useRouter()

  const {
    data: communities = [],
    loading,
    handleRefresh,
    error
  } = useCollection<Community>({
    url: useMemo(() => Routes.Community.list_user_communities, [])
  })

  if (error) {
    Toast.error(error.message)
  }

  const data: ActionType[] = communities.map((item) => ({
    id: item.uuid,
    title: item.name,
    onPress: () => router.push(`communities/${item.uuid}`)
  }))

  useFocusEffect(useCallback(() => void handleRefresh(), []))

  const handleDelete = async (id: string) => {
    Lib.error_callback(
      await Lib.safe_call(Api.delete, [Routes.Community.delete(id)]),
      Toast.error
    )

    handleRefresh()
  }

  const swipeActions: ActionListSwipeAction = (item) => [
    {
      label: 'Excluir',
      color: colors.red_5,
      onPress: () => handleDelete(item.id as string)
    }
  ]

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return
    }

    const location = await Location.getCurrentPositionAsync({})

    router.push({
      pathname: '/communities/map/',
      params: {
        lat: location.coords.latitude,
        long: location.coords.longitude
      }
    })
  }

  return (
    <VStack gap={10} flex={1} p={16}>
      <Stack.Screen
        options={{
          headerTitle: 'Minhas Comunidades',
          headerRight: () => (
            <IconButton
              onPress={() => router.push('/communities/create/')}
              icon='plus'
            />
          )
        }}
      />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <HStack justify='center'>
          <TouchableOpacity
            style={styles.button}
            onPress={getLocationPermission}
          >
            <Text style={styles.buttonText}>Ver Mapa das Comunidades</Text>
            <MaterialIcons name={'location-on'} size={20} color={'white'} />
          </TouchableOpacity>
        </HStack>
        <ActionList data={data} swipeActions={swipeActions} keyFrom='id' />
      </ScrollView>
    </VStack>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    gap: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
