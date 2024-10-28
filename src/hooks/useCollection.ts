import Api from '@api/mwro/api'
import { useQuery } from '@tanstack/react-query'

type Options = {
  url: string
  keys: string[]
}

function useCollection<Response>(options: Options) {
  const { url, keys = [] } = options

  const queryFn = async () => Api.get(url)

  const {
    data,
    error,
    refetch: handleRefresh,
    isRefetching: refreshing,
    isLoading: loading
  } = useQuery({
    queryKey: keys,
    queryFn
  })

  console.log('DATATATATATTA', data)

  return {
    data: (data?.data ?? []) as Response[],
    handleRefresh,
    loading,
    refreshing,
    error
  }
}

export default useCollection
