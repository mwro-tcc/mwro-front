/* eslint-disable react-hooks/exhaustive-deps */
import Api from '@api/mwro/api'
import { AxiosError } from 'axios'
import { debounce, isEqual } from 'lodash'
import { useCallback, useEffect, useReducer, useRef } from 'react'

type Options = {
  url: string
  params?: Record<string, string | number>
  debounce?: number
}

type State<Response, Error> =
  | {
    data: null
    loading: true
    refreshing: false
    error: null
  }
  | {
    data: Response | null
    loading: false
    refreshing: true
    error: Error | null
  }
  | {
    data: null
    loading: false
    refreshing: false
    error: Error
  }
  | {
    data: Response
    loading: false
    refreshing: false
    error: null
  }

enum ActionType {
  LOADING = 'LOADING',
  REFRESHING = 'REFRESHING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Action<Response, Error> =
  | {
    type: ActionType.LOADING
    payload: boolean
  }
  | {
    type: ActionType.REFRESHING
    payload: boolean
  }
  | {
    type: ActionType.SUCCESS
    payload: Response
  }
  | {
    type: ActionType.ERROR
    payload: Error
  }


function createReducer<Response, Error>() {
  return (state: State<Response, Error>, action: Action<Response, Error>): State<Response, Error> => {
    switch (action.type) {
      case ActionType.LOADING:
        return { loading: true, refreshing: false, error: null, data: null }
      case ActionType.REFRESHING:
        return { ...state, refreshing: true, loading: false }
      case ActionType.SUCCESS:
        return { data: action.payload, error: null, loading: false, refreshing: false }
      case ActionType.ERROR:
        return { error: action.payload, data: null, loading: false, refreshing: false }
      default:
        return state
    }
  }
}

type Result<Response, Error> = State<Response, Error> & {
  handleRefresh: () => void
}

function useCollection<Model>(options: Options): Result<Model[], Error> {
  const optionsRef = useRef<Options>()

  const [state, dispatch] = useReducer(createReducer<Model[], Error>(), {
    loading: true,
    refreshing: false,
    data: null,
    error: null
  })

  const fetchFn = useCallback(debounce((options: Options) => {
    console.log(`FETCHING ${options.url}`, options)

    return (
      Api.get<Model[]>(options.url, {
        params: options?.params
      }).then((response) => {
        console.log(`FETCHED ${options.url}`, response.data)
        dispatch({ type: ActionType.SUCCESS, payload: response.data })
      }).catch((error: AxiosError) => {
        console.error(`FETCHED ${options.url}`, error.response?.data)
        dispatch({ type: ActionType.ERROR, payload: error })
      }))
  }, options.debounce ?? 300), [])

  useEffect(() => {
    if (isEqual(options, optionsRef.current)) return
    dispatch({ type: ActionType.LOADING, payload: true })
    optionsRef.current = options
    fetchFn(options)
  }, [fetchFn, options])

  const handleRefresh = useCallback(() => {
    dispatch({ type: ActionType.REFRESHING, payload: true })
    fetchFn(options)
  }
    , [fetchFn, optionsRef.current])

  return {
    ...state,
    handleRefresh
  }
}

export default useCollection
