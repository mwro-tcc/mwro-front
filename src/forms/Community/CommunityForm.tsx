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
import StepsIndicator from '@ui/StepsIndicator'
import Button from '@ui/Button'
import { useCommunity } from '@hooks/useCommunity'
import { ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import colors from '@ui/config/colors'

type Props = {
  community?: Community
}

export default function CommunityForm(props: Props) {
  const { community } = props
  const router = useRouter()
  const form = useForm<CommunityFormType>({
    defaultValues: community
  })

  const steps = community ? 1 : 3

  const { step, next, back } = useSteps(steps)
  const { create_community, update_community } = useCommunity()

  const handleSubmit = (value: any) => {
    form.handleSubmit(props.community ? update_community : create_community)(
      value
    )

    router.back()
  }

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
    <VStack p={20} flex={1} gap={30}>
      <Stack.Screen
        options={{
          headerTitle: `${community?.uuid ? 'Editar' : 'Criar'} Comunidade`,
          contentStyle: {
            backgroundColor: colors.ui_1
          },
          headerBackTitle: 'Voltar'
        }}
      />
      <VStack items='center' gap={20}>
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
        <Button onPress={step > 1 ? back : router.back}>
          {step > 1 ? 'Voltar' : 'Cancelar'}
        </Button>
      </VStack>
    </VStack>
  )
}
