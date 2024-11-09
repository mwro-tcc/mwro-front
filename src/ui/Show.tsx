import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  when?: any
  unless?: any
  placeholder?: ReactNode
}

function Show(props: Props) {
  const { children, when, unless, placeholder = null } = props

  if (when === undefined && unless !== undefined) {
    return Boolean(unless) ? placeholder : children
  }

  if (Boolean(unless)) return placeholder
  if (Boolean(when)) return children
  return placeholder
}

export default Show
