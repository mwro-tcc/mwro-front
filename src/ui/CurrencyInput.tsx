/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from 'react'
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Pressable,
  ViewStyle
} from 'react-native'
import { Control, useController } from 'react-hook-form'
import Show from './Show'
import VStack from './VStack'
import HStack from './HStack'
import Text from './Text'
import colors from './config/colors'

type Variants = {
  default: ViewStyle
}

const formatCurrency = (value: string | number | undefined | null): string => {
  const onlyDigits = String(value).replace(/\D/g, '')

  const numeric = Number(onlyDigits) / 100

  return numeric.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export default ({
  variant = 'default',
  label,
  required = false,
  style,
  name,
  control,
  ...props
}: TextInputProps & {
  name: string
  control: Control<any, any>
  variant?: keyof Variants
  label?: string
  required?: boolean
  height?: number
}) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
    rules: { required }
  })

  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showCaret, setShowCaret] = useState(false)
  const [rawValue, setRawValue] = useState(field.value || '')

  const inputRef = useRef<TextInput>(null)

  const typingTimeout = useRef<NodeJS.Timeout | null>(null)
  const blinkingInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isFocused) {
      setShowCaret(false)
      clearInterval(blinkingInterval.current!)
      return
    }

    if (isTyping) {
      setShowCaret(true)
      clearInterval(blinkingInterval.current!)
      return
    }

    setShowCaret(true) // começa visível
    blinkingInterval.current = setInterval(() => {
      setShowCaret((prev) => !prev)
    }, 500)

    return () => clearInterval(blinkingInterval.current!)
  }, [isFocused, isTyping])

  useEffect(() => {
    const clean = String(field.value || '').replace(/\D/g, '')
    setRawValue(clean)
  }, [field.value])

  const handleChangeText = (text: string) => {
    const onlyDigits = text.replace(/\D/g, '')
    setRawValue(onlyDigits)
    field.onChange(onlyDigits)

    setIsTyping(true)
    setShowCaret(true)

    // Limpa o timeout anterior
    if (typingTimeout.current) clearTimeout(typingTimeout.current)

    // Marca como "parou de digitar" após 0,1s
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false)
    }, 100)
  }

  return (
    <Show when={label}>
      <VStack gap={3}>
        <HStack px={8} gap={3}>
          <Text weight='600' size={12}>
            {label}
          </Text>
          <Show when={required}>
            <Text weight='600' size={12} color={colors.red_6}>
              *
            </Text>
          </Show>
        </HStack>

        <Pressable onPress={() => inputRef.current?.focus()}>
          <View style={[styles.inputWrapper]}>
            <TextInput
              ref={inputRef}
              value={rawValue}
              onChangeText={handleChangeText}
              onFocus={() => {
                setIsFocused(true)
              }}
              onBlur={() => {
                setIsFocused(false)
                setIsTyping(false)
                setShowCaret(false)
                clearTimeout(typingTimeout.current!)
                clearInterval(blinkingInterval.current!)
              }}
              keyboardType='numeric'
              caretHidden
              style={styles.hiddenInput}
              {...props}
            />

            <Text size={15} color={colors.ui_10}>
              {rawValue ? formatCurrency(rawValue) : 'R$ 0,00'}
              {showCaret && (
                <Text color={colors.blue_8} size={15}>
                  |
                </Text>
              )}
            </Text>
          </View>
        </Pressable>
      </VStack>
    </Show>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.ui_4,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.ui_1,
    height: 48,
    justifyContent: 'center'
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 16
  }
})
