import { useForm } from 'react-hook-form'
import TextInput from '../../ui/TextInput'
import { SignUpForm } from '../../types/user'
import { useRouter } from 'expo-router'
import useAuth from '../../hooks/useAuth'
import Button from '../../ui/Button'
import VStack from '../../ui/VStack'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import Text from '@ui/Text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from '@ui/config/colors'

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpForm>()
  const router = useRouter()
  const { sign_up } = useAuth()

  return (
    <VStack flex={1} p={20}>
      <VStack flex={1} items='center' justify='center'>
        <Text size={28} weight='600'>
          Acessar Conta
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
      <VStack gap={10} bg={colors.ui_1} pt={20}>
        <Button onPress={handleSubmit(sign_up)} variant='primary'>
          Próximo
        </Button>
        <Button onPress={() => router.replace('/welcome')}>Voltar</Button>
      </VStack>
    </VStack>
  )
}
