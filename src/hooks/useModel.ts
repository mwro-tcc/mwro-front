import Api from '@api/mwro/api'
import safe_call from '@lib/safe_call'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

type Options = {
  url: string
}

export default function useModel<Response>(options: Options) {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<AxiosResponse<Response> | null>(null)
  const [error, setError] = useState<Error | null>(null)

  console.log(options.url)

  const caller = async () => {
    return await safe_call(Api.get<Response>, [options.url])
  }

  const handleFetchData = async () => {
    setLoading(true)
    caller().then((result) => {
      const [response, error] = result
      if (response) setResponse(response)
      if (error) setError(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    handleFetchData()
  }, [])

  return {
    data: response?.data,
    handleRefresh: handleFetchData,
    loading,
    error
  }
}