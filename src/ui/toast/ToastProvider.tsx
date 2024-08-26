import useToast from './toast_store'
import VStack from '../VStack'
import BaseToast from './BaseToast'

export default () => {
  const [toasts] = useToast((state) => [state.toasts])

  return toasts?.length === 0 ? null : (
    <VStack absolute p={10} t={60} z={2} w='100%' gap={10}>
      {toasts.map((toastProps) => (
        <BaseToast {...toastProps} />
      ))}
    </VStack>
  )
}
