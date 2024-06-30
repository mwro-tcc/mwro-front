import { useForm } from 'react-hook-form'
import TextInput from '../../ui/TextInput'
import { SignUpForm } from '../../types/user'
import { useRouter } from 'expo-router'
import useAuth from '../../hooks/useAuth'
import Button from '../../ui/Button'
import VStack from '../../ui/VStack'

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpForm>()
  const router = useRouter()
  const { sign_up } = useAuth()

  return (
    <VStack justify='between' h='100%'>
      <VStack gap={10}>
        <TextInput
          label='Nome'
          placeholder='Maria João'
          autoComplete='name'
          required
          control={control}
          name={'name'}
        />
        <TextInput
          label='E-mail'
          placeholder='exemplo@email.com'
          autoComplete='email'
          keyboardType='email-address'
          required
          control={control}
          name={'email'}
        />
        <TextInput
          label='Senha'
          placeholder='seNha_suPer$ecret@'
          autoComplete='current-password'
          secureTextEntry
          required
          control={control}
          name={'password'}
        />
        <TextInput
          label='Confirmar senha'
          placeholder='seNha_suPer$ecret@'
          autoComplete='current-password'
          secureTextEntry
          required
          control={control}
          name={'confirm_password'}
        />
      </VStack>
      <VStack gap={10} p={20}>
        <Button onPress={handleSubmit(sign_up)} variant='primary'>
          Próximo
        </Button>
        <Button onPress={() => router.replace('/welcome')}>Voltar</Button>
      </VStack>
    </VStack>
  )
}
