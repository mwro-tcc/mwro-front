import { Slot } from 'expo-router'
import ToastProvider from '../ui/toast/ToastProvider'

export default function Root() {
  return (
    <>
      <ToastProvider />
      <Slot />
    </>
  )
}
