import React, { useCallback, useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Control, useController } from 'react-hook-form'
import DSText from './Text'
import HStack from './HStack'
import colors from './config/colors'
import rounded from './config/rounded'
import spacings from './config/spacings'
import shadows from './config/shadows'

type SwitchProps = {
  rightOption: string
  LeftOption: string
  name: string
  control: Control<any>
  label?: string
  required?: boolean
  defaultValue?: boolean
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: rounded.sm,
    borderColor: colors.ui_6,
    ...shadows.sm
  },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: spacings.sm,
    borderRadius: rounded.sm
  },
  selectedOption: {
    backgroundColor: colors.ui_9
  },
  unselectedOption: {
    backgroundColor: colors.ui_1
  },
  optionText: {
    fontSize: 12,
    fontWeight: '700'
  },
  selectedText: {
    color: colors.ui_1
  },
  unselectedText: {
    color: colors.ui_9
  }
})

const Switch = ({
  label,
  required,
  rightOption,
  LeftOption,
  name,
  control,
  defaultValue
}: SwitchProps) => {
  const options = [
    { name: LeftOption, value: true },
    { name: rightOption, value: false }
  ]

  const {
    field: { value, onChange }
  } = useController({
    control,
    defaultValue: defaultValue ?? options[0].value,
    name
  })

  const [selectedOption, setSelectedOption] = useState(value)

  const handleOptionChange = useCallback((value: boolean) => {
    setSelectedOption(value)
    onChange(value)
  }, [])

  useEffect(() => {
    handleOptionChange(defaultValue ?? value)
  }, [defaultValue])

  return (
    <View>
      <HStack gap={3} mb={3} ml={3}>
        {label && (
          <DSText size={12} weight='600'>
            {label}
          </DSText>
        )}
        {required && (
          <DSText weight='600' size={12} color={colors.red_6}>
            *
          </DSText>
        )}
      </HStack>
      <View style={styles.container}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOption === option.value
                ? styles.selectedOption
                : styles.unselectedOption
            ]}
            onPress={() => handleOptionChange(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option.value
                  ? styles.selectedText
                  : styles.unselectedText
              ]}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Switch
