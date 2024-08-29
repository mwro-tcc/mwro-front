import { useState } from 'react'

export default function useBoolean(initialState: boolean) {
  const [value, setValue] = useState<boolean>(initialState)

  return {
    value,
    setTrue: () => void setValue(true),
    setFalse: () => void setValue(false)
  }
}
