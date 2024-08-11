import { useEffect, useState } from 'react'
import Api from '@api/mwro/api'
import safe_call from '@lib/safe_call'
import { AxiosResponse } from 'axios'

type Options = {
  url: string
}

export default function useCollection<Response>(options: Options) {
  const [refreshing, setRefreshing] = useState(false)
  const [response, setResponse] = useState<AxiosResponse<Response[]> | null>(
    null
  )
  const [error, setError] = useState<Error | null>(null)

  const caller = async () => {
    return await safe_call(Api.get<Response[]>, [options.url])
  }

  const handleFetchData = async () => {
    if (response) {
      setRefreshing(true)
    }
    await caller().then((result) => {
      const [response, error] = result
      if (response) setResponse(response)
      if (error) setError(error)
      setRefreshing(false)
    })
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return {
    data: response?.data,
    handleRefresh: handleFetchData,
    loading: !response && !error,
    refreshing,
    error
  }
}
