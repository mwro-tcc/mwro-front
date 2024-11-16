import React from 'react'
import colors from './config/colors'
import HStack from './HStack'

type StepsIndicatorProps = {
  currentStep: number
  totalSteps: number
}

const StepsIndicator = ({ currentStep, totalSteps }: StepsIndicatorProps) => {
  const steps = Array.from({ length: totalSteps })

  return (
    <HStack gap={5} pr={6}>
      {steps.map((_, index) => (
        <HStack
          key={index}
          w={5}
          h={5}
          rounded={40}
          bg={index + 1 === currentStep ? colors.ui_8 : colors.ui_6}
        />
      ))}
    </HStack>
  )
}

export default StepsIndicator
