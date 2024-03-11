import { useForm } from 'react-hook-form'
import TextInput from '../../ui/TextInput'
import { SignUpForm } from '../../types/user'
import { useRouter } from 'expo-router'
import useAuth from '../../hooks/useAuth'
import { t } from '../../../translations'
import Button from '../../ui/Button'
import VStack from '../../ui/VStack'
import { useRef } from 'react'

export default function SignUp() {
    const { control, handleSubmit } = useForm<SignUpForm>()
    const router = useRouter()
    const { sign_up } = useAuth()

    const email_ref = useRef<HTMLInputElement>(null)
    const password_ref = useRef<HTMLInputElement>(null)
    const confirm_password_ref = useRef<HTMLInputElement>(null)

    return (
        <VStack justify="between" h="100%" gap={10}>
            <VStack gap={10}>
                <TextInput
                    label={t('authentication.name.label')}
                    placeholder={t('authentication.name.placeholder')}
                    autoComplete="name"
                    required
                    control={control}
                    returnKeyType="next"
                    onSubmitEditing={() => email_ref.current?.focus()}
                    name={'name'}
                />
                <TextInput
                    ref={email_ref}
                    label={t('authentication.email.label')}
                    placeholder={t('authentication.email.placeholder')}
                    autoComplete="email"
                    keyboardType="email-address"
                    required
                    control={control}
                    returnKeyType="next"
                    onSubmitEditing={() => password_ref.current?.focus()}
                    name={'email'}
                />
                <TextInput
                    ref={password_ref}
                    label={t('authentication.password.label')}
                    placeholder={t('authentication.password.placeholder')}
                    autoComplete="current-password"
                    secureTextEntry
                    required
                    control={control}
                    onSubmitEditing={() =>
                        confirm_password_ref.current?.focus()
                    }
                    returnKeyType="next"
                    name={'password'}
                />
                <TextInput
                    ref={confirm_password_ref}
                    label={t('authentication.password.confirmation')}
                    placeholder={t('authentication.password.placeholder')}
                    autoComplete="current-password"
                    secureTextEntry
                    required
                    control={control}
                    returnKeyType="done"
                    name={'confirm_password'}
                />
            </VStack>
            <VStack gap={10}>
                <Button onPress={handleSubmit(sign_up)} variant="primary">
                    {t('authentication.sign_up.button')}
                </Button>
                <Button onPress={router.back}>
                    {t('authentication.back')}
                </Button>
            </VStack>
        </VStack>
    )
}
