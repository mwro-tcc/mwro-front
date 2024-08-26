import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Storage from 'storage'
import useAsync from './useAsync'

export default () => {
  const auth = useAsyncStorage(Storage.AUTH_TOKEN)

  const { data: token, loading, error } = useAsync(auth.getItem)

  if (error) console.error(error)

  return {
    token,
    loading
  }
}
