import { create } from 'zustand'

type CacheStore = {
  cache: Record<string, any>;
  add: (key: string, value: any) => void;
}

const cache_store = create<CacheStore>((set) => ({
  cache: {},
  add: (key: string, value: any) => {
    return set((state) => {
      if (state.cache.length >= 3) {
        delete state.cache[Object.keys(state.cache)[0]]
      }

      return {
        cache: {
          ...state.cache,
          [key]: value
        }
      }
    })
  }
}))

function useCache<T>() {
  return cache_store((state) => ({
    get: (key: string) => state.cache[key] as T ?? null,
    add: state.add
  }))
}

export default useCache