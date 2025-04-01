import { useRouter } from 'expo-router'
import Button from '@ui/Button'
import TextInput from '@ui/TextInput'
import { useForm } from 'react-hook-form'
import { SignInForm } from '@src/types/user'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import { KeyboardAvoidingView } from 'react-native'
import { Auth } from '@api/mwro'

export default function SignIn() {
  const { control, handleSubmit, formState } = useForm<SignInForm>()
  const router = useRouter()

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <VStack flex={1} p={20}>
        <VStack flex={1} items='center' justify='center'>
          <Text size={28} weight='600'>
            Acessar Conta
          </Text>
        </VStack>
        <VStack gap={16} flex={2}>
          <TextInput
            label='E-mail'
            placeholder='exemplo@email.com'
            autoComplete='email'
            keyboardType='email-address'
            required
            returnKeyType='next'
            name={'email'}
            control={control}
            autoCorrect={false}
          />
          <TextInput
            label='Senha'
            placeholder='seNha_suPer$ecret@'
            autoComplete='current-password'
            secureTextEntry
            required
            name={'password'}
            control={control}
            autoCorrect={false}
          />
        </VStack>
        <VStack gap={10}>
          <Button
            onPress={handleSubmit(Auth.signIn)}
            variant='primary'
            disabled={!formState.isValid}
          >
            Próximo
          </Button>
          <Button onPress={() => router.replace('/welcome')}>Voltar</Button>
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  )
}
