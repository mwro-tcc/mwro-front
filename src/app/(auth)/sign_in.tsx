import { useRouter } from 'expo-router'
import Button from '@ui/Button'
import TextInput from '@ui/TextInput'
import { useForm } from 'react-hook-form'
import { SignInForm } from '@src/types/user'
import useAuth from '@hooks/useAuth'
import VStack from '@ui/VStack'

export default function SignIn() {
  const { control, handleSubmit } = useForm<SignInForm>()
  const router = useRouter()
  const { sign_in } = useAuth()

  return (
    <VStack justify='between' h='100%'>
      <VStack gap={10}>
        <TextInput
          label='E-mail'
          placeholder='exemplo@email.com'
          autoComplete='email'
          keyboardType='email-address'
          required
          name={'email'}
          control={control}
        />
        <TextInput
          label='Senha'
          placeholder='seNha_suPer$ecret@'
          autoComplete='current-password'
          secureTextEntry
          required
          name={'password'}
          control={control}
        />
      </VStack>
      <VStack gap={10} p={20}>
        <Button onPress={handleSubmit(sign_in)} variant='primary'>
          Próximo
        </Button>
        <Button onPress={() => router.replace('/welcome')}>Voltar</Button>
      </VStack>
    </VStack>
  )
}
