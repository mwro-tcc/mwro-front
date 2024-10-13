import colors from '@ui/config/colors'
import VStack from '@ui/VStack'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import ActionList from '@ui/ActionList'
import { Auth, Routes } from '@api/mwro'
import useModel from '@hooks/useModel'
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView
} from 'react-native'
import Toast from '@lib/toast'
import { User as UserType } from '@src/types/user'
import { useCallback } from 'react'
import User from '@api/mwro/user'

export default function Account() {
  const router = useRouter()

  const {
    data: user,
    loading,
    refreshing,
    handleRefresh,
    error
  } = useModel<UserType>({
    url: Routes.Auth.me
  })

  useFocusEffect(useCallback(() => void handleRefresh(), []))

  if (loading)
    return (
      <VStack flex={1} items='center' justify='center'>
        <ActivityIndicator />
      </VStack>
    )

  if (!user || error) {
    Toast.error(error?.message as string)
  }

  const name = user?.name

  const handleEditName = () => {
    router.push({
      pathname: '/account/edit_name',
      params: {
        name
      }
    })
  }

  const handleDeleteAccount = () => {
    const title = 'Deletar conta'
    const description =
      'Tem certeza que deseja deletar essa conta e todos os seus dados? Essa ação é irreversível.'
    Alert.alert(title, description, [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => void (await User.delete()),
        style: 'destructive'
      }
    ])
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{
        padding: 20,
        gap: 20,
        flex: 1
      }}
    >
      <ActionList
        label='Email'
        data={[
          {
            title: user?.email ?? '',
            disabled: true
          }
        ]}
      />
      <ActionList
        label='Celular'
        data={[
          {
            title: user?.phoneNumber ?? '',
            disabled: true
          }
        ]}
      />
      <ActionList
        label='Nome'
        data={[
          {
            title: user?.name ?? '',
            onPress: handleEditName
          }
        ]}
      />
      <ActionList
        label='Gerenciar'
        data={[
          {
            title: 'Minhas Comunidades',
            onPress: () => router.push('/main/account/communities')
          },
          {
            title: 'Minhas Lojas',
            onPress: () => router.push('/main/account/stores')
          }
        ]}
      />
      <ActionList
        data={[
          {
            title: 'Encerrar Sessão',
            onPress: Auth.signOut
          },
          {
            title: 'Deletar Conta',
            onPress: handleDeleteAccount,
            color: colors.red_5
          }
        ]}
      />
    </ScrollView>
  )
}
