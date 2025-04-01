import { useForm } from 'react-hook-form'
import TextInput from '../../ui/TextInput'
import { SignUpForm } from '../../types/user'
import { useRouter } from 'expo-router'
import Button from '../../ui/Button'
import VStack from '../../ui/VStack'
import Text from '@ui/Text'
import { Auth } from '@api/mwro'
import PhoneInput from '@ui/PhoneInput'

export default function SignUp() {
  const { control, handleSubmit, formState } = useForm<SignUpForm>()
  const router = useRouter()

  return (
    <VStack flex={1} p={20}>
      <VStack flex={1} items='center' justify='center'>
        <Text size={28} weight='600'>
          Criar Conta
        </Text>
      </VStack>
      <VStack gap={10} flex={2}>
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
        <PhoneInput
          label='Telefone'
          placeholder='+55 (21) 99999-9999'
          required
          control={control}
          name={'phoneNumber'}
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
      <VStack gap={10} pt={20}>
        <Button
          onPress={handleSubmit(Auth.signUp)}
          variant='primary'
          disabled={!formState.isValid}
        >
          Próximo
        </Button>
        <Button onPress={() => router.replace('/welcome')}>Voltar</Button>
      </VStack>
    </VStack>
  )
}
