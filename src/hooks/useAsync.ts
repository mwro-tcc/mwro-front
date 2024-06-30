import { useEffect, useState } from 'react'

export default (call: () => Promise<any>) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    call()
      .then((data) => setData(data))
      .catch((e) => {
        console.error(e)
        setError(e)
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    loading,
    data,
    error
  }
}
