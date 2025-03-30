import colors, { ui } from '@ui/config/colors'
import { useRouter } from 'expo-router'
import ActionList from '@ui/ActionList'
import { Auth, Routes } from '@api/mwro'
import { Alert, RefreshControl, ScrollView } from 'react-native'
import Toast from '@lib/toast'
import { User as UserType } from '@src/types/user'
import User from '@api/mwro/user'
import ScreenLoading from '@ui/ScreenLoading'
import useBoolean from '@hooks/useBoolean'
import { useEffect } from 'react'
import Show from '@ui/Show'
import { useQuery } from '@tanstack/react-query'
import Api from '@api/mwro/api'
import { Shield } from 'lucide-react-native'

export default function Account() {
  const router = useRouter()

  const isSubscribed = useBoolean(false)

  const {
    data: user,
    isLoading: loading,
    isRefetching: refreshing,
    refetch: handleRefresh,
    error
  } = useQuery<
    UserType & {
      isSubscribed: boolean
    }
  >({
    queryKey: ['me'],
    queryFn: () => Api.get(Routes.Auth.me).then((res) => res.data)
  })

  useEffect(() => {
    if (!user || user?.isSubscribed !== isSubscribed.value) return

    if (user?.isSubscribed) {
      Toast.success('Sua assinatura foi ativada com sucesso!')
      isSubscribed.setTrue()
    } else {
      isSubscribed.setFalse()
    }
  }, [user, isSubscribed])

  if (loading) return <ScreenLoading />

  if (!user || error) {
    Toast.error(error?.message as string)
  }

  const { name, phoneNumber } = user ?? {}

  const handleEditName = () => {
    router.push({
      pathname: '/main/(tabs)/(account)/edit_name',
      params: {
        name
      }
    })
  }

  const handleEditPhoneNumber = () => {
    router.push({
      pathname: '/main/(tabs)/(account)/edit_phone',
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
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Deletar conta',
        onPress: async () => void (await User.delete()),
        style: 'destructive'
      }
    ])
  }

  const handleSubscribe = () => {
    router.push('/main/(account)/subscribe')
  }

  const handleUnsubscribe = () => {
    const title = 'Encerrar Assinatura'
    const description =
      'Tem certeza que deseja encerrar a assinatura? Caso encerre, todas as suas comunidades serão removidas. Essa ação é irreversível.'

    Alert.alert(title, description, [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Encerrar assinatura',
        onPress: () => {},
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
      <Show
        when={isSubscribed.value}
        placeholder={
          <ActionList
            label='Gerenciar'
            data={[
              {
                title: 'Minhas Lojas',
                onPress: () => router.push('/main/(account)/stores')
              },
              {
                title: 'Tornar-se Administrador',
                onPress: handleSubscribe,
                color: ui.yellow
              }
            ]}
          />
        }
      >
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
            },
            {
              title: 'Encerrar Assinatura',
              onPress: handleUnsubscribe,
              color: ui.destructive
            }
          ]}
        />
      </Show>
      <ActionList
        label='Solicitações'
        data={[
          {
            title: 'Solicitações Pendentes',
            onPress: () => router.push('/main/(account)/requests/pending')
          },
          {
            title: 'Solicitações Recebidas',
            onPress: () => router.push('/main/(account)/requests/received')
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
            color: ui.destructive
          }
        ]}
      />
    </ScrollView>
  )
}
