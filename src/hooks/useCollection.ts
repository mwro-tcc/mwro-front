import useAsync from './useAsync'
import Api from '@api/mwro/api'

type Options = {
  url: string
}

export default function useCollection<Response>(options: Options) {
  const caller = async () => {
    return await Api.get<Response>(options.url)
  }

  const { data: res, loading, error } = useAsync(caller)

  return {
    data: res?.data as null | Response[],
    loading,
    error
  }
}
