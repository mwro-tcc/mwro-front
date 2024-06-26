import useToast from './toast_store'
import VStack from '../VStack'
import BaseToast from './BaseToast'

export default () => {
  const [toasts] = useToast((state) => [state.toasts])

  return (
    <VStack absolute p={10} t={20} z={2} w='100%' gap={10}>
      {toasts.map((toastProps) => (
        <BaseToast {...toastProps} />
      ))}
    </VStack>
  )
}
