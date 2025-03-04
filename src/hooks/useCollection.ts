/* eslint-disable react-hooks/exhaustive-deps */
import Api from '@api/mwro/api'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { useDebounce } from 'use-debounce';

const DEBOUNCE_TIME = 500

type Options<Response> = {
  url: string
  params?: Record<string, string | number>
  debounce?: number
  dataFormatter?: (data: Response) => any[]
}

type Result<Response, Error> = {
  data: Response | null
  error: Error | null
  loading: boolean
  refreshing: boolean
  formattedData: any[] | null
  handleRefresh: () => void
}

function useCollection<Model>(options: Options<Model[]>): Result<Model[], Error> {
  const key = useMemo(() => options?.url?.split('/')?.at(-1) ?? null, [options?.url])
  const params = useMemo(() => options?.params ? Object.values(options.params) : [], [options?.params])

  const [debouncedParams] = useDebounce(params, DEBOUNCE_TIME)

  const queryFn = async () => {
    return Api.get<Model[]>(options.url, { params: options?.params }).then((response) => response.data).catch((error) => {
      throw error
    })
  }

  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [key, ...debouncedParams],
    queryFn,
  })

  useFocusEffect(useCallback(() => void refetch(), []))

  const formattedData = useMemo(() => {
    if (options.dataFormatter) {
      return data ? options.dataFormatter(data) : []
    }

    return null
  }, [data])

  return {
    data: data ?? null,
    error,
    loading: isLoading,
    formattedData,
    refreshing: isRefetching,
    handleRefresh: refetch
  }
}

export default useCollection
