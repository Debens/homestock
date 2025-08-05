import type React from 'react'
import { type ComponentProps, forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react'

import { motify } from 'moti'
import {
  type TextInput as BaseComponent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  type TextInputFocusEventData,
} from 'react-native'
import '@tamagui/animate-presence'

import { Controller, useFormContext } from 'react-hook-form'
import { AnimatePresence, styled, Input as TamaguiInput, type ThemeParsed, useTheme } from 'tamagui'

import Icon, { type IconName } from '../Icon/Icon'
import Layout from '../Layout/Layout'
import { Tag } from '../Tag/Tag'
import Text from '../Text/Text'

const Input = motify(
  styled(TamaguiInput, {
    backgroundColor: '$field-backround',
    borderRadius: 8,
    borderWidth: 1,
    height: 52,
    name: 'Input',
    py: 0,
    underlineColorAndroid: 'transparent',
  })
)()

export type Props = React.ComponentProps<typeof Input> & {
  label?: string
  error?: string
  icon?: IconName
}

const useSelection = (props: Props) => {
  const [isFocused, setFocus] = useState(false)

  const { onFocus: focus, onBlur: blur } = props
  const onFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(true)
      focus?.(event)
    },
    [focus]
  )
  const onBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(false)
      blur?.(event)
    },
    [blur]
  )

  return { handlers: { onBlur, onFocus }, isFocused }
}

type ThemeKeys = keyof ThemeParsed
const isThemeKey = (key: string, theme: Record<string, unknown>): key is ThemeKeys => key in theme

const getBackgroundColor = (props: Props, isFocused: boolean): ThemeKeys | string => {
  switch (true) {
    case !!props.error:
      return '$field-error'
    case isFocused:
      return '$field-selected'
    case !!props.backgroundColor:
      return props.backgroundColor as string
    default:
      return '$field-border'
  }
}

const useBackground = (props: Props, isFocused: boolean) => {
  const token = getBackgroundColor(props, isFocused)
  const theme = useTheme()
  return isThemeKey(token, theme) ? theme[token].val : theme['field-backround'].val
}

export type TextInputRef = {
  clear: () => void
  focus: () => void
}

const TextInput = forwardRef<TextInputRef, Props>((props, ref) => {
  const [value, setValue] = useState<string | undefined>(props.value)
  const { onChangeText: change, icon, label, maxLength, error, testID } = props
  const onChangeText = useCallback(
    (text: string) => {
      setValue(text)
      change?.(text)
    },
    [change]
  )

  const inner = useRef<BaseComponent>(null)
  useImperativeHandle(ref, () => ({
    clear: () => inner.current?.clear(),
    focus: () => inner.current?.focus(),
  }))

  const { handlers: selection, isFocused } = useSelection(props)
  const borderColor = useBackground(props, isFocused)
  return (
    <Pressable style={styles.front} onPress={inner.current?.focus}>
      <AnimatePresence exitBeforeEnter custom={{ load: !!value }} initial={false}>
        {value && (
          <Layout position="absolute" top={-8} left={16} zIndex={1}>
            <Tag key={`${testID}:top:${!!value}`} animation="medium" py={4}>
              <Text variant="tiny" color="$text-placeholder" ml={8}>
                {label}
              </Text>
            </Tag>
          </Layout>
        )}
      </AnimatePresence>
      <Input
        ref={inner}
        placeholder={label}
        pr={icon ? 42 : 12}
        {...props}
        {...selection}
        onChangeText={onChangeText}
        animate={{ borderColor }}
      />
      {icon && (
        <Layout position="absolute" right={12} top={0} bottom={0} center>
          <Icon name={icon} size={18} />
        </Layout>
      )}
      {error && (
        <Layout position="absolute" bottom={-8} gutter grow row>
          <Tag key={`${testID}:bottom:error:${!!error}`} bg="$destructive" py={4}>
            <Text variant="tiny" color="$text-on-dark" ml={8} bold>
              {error}
            </Text>
          </Tag>
        </Layout>
      )}
      {maxLength && !!value && (
        <Layout position="absolute" bottom={-8} right={0} gutter grow row>
          <Tag key={`${testID}:bottom:${!!value && !!maxLength}`} ml="auto" py={4}>
            <Text variant="tiny" mr={2}>
              {`${value.length}/${maxLength}`}
            </Text>
          </Tag>
        </Layout>
      )}
    </Pressable>
  )
})

const styles = StyleSheet.create({
  front: { zIndex: 1 },
})

const Field: React.FC<ComponentProps<typeof TextInput> & { name: string }> = (props) => {
  const context = useFormContext()

  const { name, defaultValue, ...input } = props

  return (
    <Controller
      control={context.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <TextInput
            {...field}
            onChangeText={field.onChange}
            error={fieldState.isTouched ? fieldState.error?.message : undefined}
            {...input}
          />
        )
      }}
    />
  )
}

export default Object.assign(memo(TextInput), { Field })
