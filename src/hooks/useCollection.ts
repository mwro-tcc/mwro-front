import { useEffect, useState } from 'react'
import useAsync from './useAsync'
import Api from '@api/mwro/api'
import { Community } from '@api/mwro'
import safe_call from '@lib/safe_call'
import { AxiosResponse } from 'axios'
import error_callback from '@lib/error_callback'

type Options = {
  url: string
}

export default function useCollection<Response>(options: Options) {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<AxiosResponse<Response[]> | null>(
    null
  )
  const [error, setError] = useState<Error | null>(null)

  const caller = async () => {
    return await safe_call(Api.get<Response[]>, [options.url])
  }

  const handleFetchData = async () => {
    setLoading(true)
    caller().then((result) => {
      const response = error_callback(result, () => {
        console.error(error)
        setError(error)
      })
      setResponse(response)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return {
    data: response?.data ?? [],
    handleRefresh: handleFetchData,
    loading,
    error
  }
}
