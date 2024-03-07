import { useRouter } from 'expo-router'
import React, { useCallback, useMemo, useState } from 'react'
import StepsIndicator from '../../../ui/components/StepsIndicator'
import Text from '../../../ui/Text'
import { useCommunity } from '../../../hooks/useCommunity'
import { useForm, useFormContext } from 'react-hook-form'
import Button from '../../../ui/Button'
import VStack from '../../../ui/VStack'
import { CreateCommunityForm } from '../../../types/community'
import { Step1 } from '../../../ui/screens/community/create/Step1'
import { Step2 } from '../../../ui/screens/community/create/Step2'
import { Step3 } from '../../../ui/screens/community/create/Step3'
import { CongratsScreen } from '../../../ui/screens/common/CongratsScreen'
import { t } from '../../../../translations'

export default function CreateCommunity() {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { isValid },
    } = useForm<CreateCommunityForm>()

    const router = useRouter()

    const { create_community } = useCommunity()

    const [step, setStep] = useState(1)
    const [location, setLocation] = useState('')
    const [communityCreated, setCommunityCreated] = useState(false)

    const CREATE_COMMUNITY_STEPS = 3

    const latitude = watch('latitude')
    const longitude = watch('longitude')

    const handleFormSubmit = handleSubmit((data) => {
        create_community(data)
        setCommunityCreated(true)
    })

    const handleNext = useCallback(() => {
        if (step < 3) {
            setStep(step + 1)
        }
    }, [step])

    const handleBack = useCallback(() => {
        if (step > 1) {
            setStep(step - 1)
        } else {
            router.back()
        }
    }, [step])

    const renderStep = useMemo(() => {
        switch (step) {
            case 1:
                return <Step1 control={control} />
            case 2:
                return (
                    <Step2
                        control={control}
                        latitude={latitude}
                        longitude={longitude}
                        location={location}
                        setLocation={setLocation}
                    />
                )
            case 3:
                return (
                    <Step3
                        latitude={latitude}
                        longitude={longitude}
                        setValue={setValue}
                    />
                )
            default:
                return null
        }
    }, [step])

    const renderButtons = useMemo(() => {
        return (
            <>
                <Button
                    variant="primary"
                    onPress={
                        step < CREATE_COMMUNITY_STEPS
                            ? handleNext
                            : handleFormSubmit
                    }
                    disabled={!isValid}
                >
                    {step < CREATE_COMMUNITY_STEPS
                        ? t('community.next')
                        : t('community.conclude')}
                </Button>
                <Button onPress={handleBack}>
                    {step > 1 ? t('community.back') : t('community.cancel')}
                </Button>
            </>
        )
    }, [step, isValid])

    const renderContent = useMemo(() => {
        if (!communityCreated) {
            return (
                <VStack p={20} flex={1} justify="between">
                    <VStack items="center" flex={1} gap={20} mt={'25%'}>
                        <Text size={28} weight="600">
                            Criar Comunidade
                        </Text>
                        <StepsIndicator
                            currentStep={step}
                            totalSteps={CREATE_COMMUNITY_STEPS}
                        />
                    </VStack>
                    <VStack flex={3} gap={30}>
                        {renderStep}
                    </VStack>
                    <VStack gap={10} flex={1} justify="center">
                        {renderButtons}
                    </VStack>
                </VStack>
            )
        } else {
            return (
                <CongratsScreen
                    title={t('community.created.title')}
                    buttonTitle={t('community.created.button')}
                    onClick={() => router.back()} // router.replace('community/edit/:id') ID FROM CREATED COMMUNITY
                />
            )
        }
    }, [step, communityCreated, isValid])

    return <>{renderContent}</>
}
