import { useForm } from 'react-hook-form'
import {
  Community,
  CommunityForm as CommunityFormType
} from '@src/types/community'
import useSteps from '@hooks/useSteps'
import CommunityFormStep1 from './components/CommunityFormStep1'
import CommunityFormStep2 from './components/CommunityFormStep2'
import CommunityFormStep3 from './components/CommunityFormStep3'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import StepsIndicator from '@ui/StepsIndicator'
import Button from '@ui/Button'
import { useCommunity } from '@hooks/useCommunity'
import SafeKeyboardScrollView from '@ui/SafeKeyboardScrollView'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Keyboard } from 'react-native'

type Props = {
  onCancel: () => void
  community?: Community
}

export default function CommunityForm(props: Props) {
  const form = useForm<CommunityFormType>({
    defaultValues: props.community
  })

  const steps = props.community ? 1 : 3

  const { step, next, back } = useSteps(steps)
  const { create_community, update_community } = useCommunity()

  const handleSubmit = form.handleSubmit(
    props.community ? update_community : create_community
  )

  const body = (() => {
    if (props.community) {
      switch (step) {
        case 1:
          return <CommunityFormStep1 form={form} />
        default:
          return null
      }
    }

    switch (step) {
      case 1:
        return <CommunityFormStep1 form={form} />
      case 2:
        return <CommunityFormStep2 form={form} />
      case 3:
        return <CommunityFormStep3 form={form} />
      default:
        return null
    }
  })()

  return (
    <SafeKeyboardScrollView>
      <VStack p={20} flex={1} gap={30}>
        <VStack items='center' gap={20}>
          <Text size={28} weight='600'>
            {props.community ? 'Editar' : 'Criar'} Comunidade
          </Text>
          {steps > 1 ? (
            <StepsIndicator currentStep={step} totalSteps={steps} />
          ) : null}
        </VStack>
        <VStack gap={30} flex={1}>
          {body}
        </VStack>
        <VStack gap={10}>
          <Button
            variant='primary'
            onPress={step < steps ? next : handleSubmit}
            disabled={!form.formState.isValid}
          >
            {step < steps ? 'Próximo' : 'Concluir'}
          </Button>
          <Button onPress={step > 1 ? back : props.onCancel}>
            {step > 1 ? 'Voltar' : 'Cancelar'}
          </Button>
        </VStack>
      </VStack>
    </SafeKeyboardScrollView>
  )
}
