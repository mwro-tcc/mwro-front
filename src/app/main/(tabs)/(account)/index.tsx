import colors from '@ui/config/colors'
import { useRouter } from 'expo-router'
import ActionList from '@ui/ActionList'
import { Auth, Routes } from '@api/mwro'
import useModel from '@hooks/useModel'
import { Alert, RefreshControl, ScrollView } from 'react-native'
import Toast from '@lib/toast'
import { User as UserType } from '@src/types/user'
import User from '@api/mwro/user'
import ScreenLoading from '@ui/ScreenLoading'

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

  if (loading) return <ScreenLoading />

  if (!user || error) {
    Toast.error(error?.message as string)
  }

  const { name, phoneNumber } = user ?? {}

  const handleEditName = () => {
    router.push({
      pathname: '/main/(account)/edit_name',
      params: {
        name
      }
    })
  }

  const handleEditPhoneNumber = () => {
    router.push({
      pathname: '/main/(account)/edit_phone',
      params: {
        phoneNumber
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
        flex: 1,
        backgroundColor: colors.background
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
        label='Telefone'
        data={[
          {
            title: user?.phoneNumber ?? '',
            onPress: handleEditPhoneNumber
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
            onPress: () => router.push('/main/(account)/communities')
          },
          {
            title: 'Minhas Lojas',
            onPress: () => router.push('/main/(account)/stores')
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
