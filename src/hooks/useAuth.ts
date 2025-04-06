import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Storage from 'storage'
import useAsync from './useAsync'
import { useCallback } from 'react'
import { Asset } from '@src/types/asset'

export default () => {
  const authTokenStorage = useAsyncStorage(Storage.AUTH_TOKEN)
  const userStorage = useAsyncStorage(Storage.AUTH_USER)

  const token = useAsync(authTokenStorage.getItem)
  const user = useAsync(userStorage.getItem)

  if (token.error || user.error)
    console.error({
      token: token.error,
      user: user.error
    })

  const isAssetOwner = useCallback(
    (asset?: Asset) => {
      return asset?.owner?.uuid === user.data
    },
    [user.data]
  )

  const isCommunityOwner = useCallback(
    (community: any) => {
      return Boolean(
        community?.admins?.some((admin: any) => admin.uuid === user.data)
      )
    },
    [user.data]
  )

  return {
    token: token.data,
    user: user.data,
    isAssetOwner,
    isCommunityOwner,
    loading: token.loading || user.loading
  }
}
