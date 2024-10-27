import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  when?: any
  unless?: any
}

function Show(props: Props) {
  const { children, when, unless } = props

  if (when === undefined && unless !== undefined) {
    return Boolean(unless) ? null : children
  }

  if (Boolean(unless)) return null
  if (Boolean(when)) return children
  return null
}

export default Show
