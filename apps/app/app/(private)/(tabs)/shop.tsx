import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { type NativeSyntheticEvent, StyleSheet, type TextInputSubmitEditingEventData } from 'react-native'

import { TabBarSpacer } from './_layout'
import { Card } from '@/components/Card/Card'
import { useConfetti } from '@/components/ConfettiProivder/ConfettiProivder'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import Text from '@/components/Text/Text'
import TextInput, { type TextInputRef } from '@/components/TextInput/TextInput'

const MOCK_ITEMS = [
  {
    checked: false,
    id: 'cabbage',
    name: 'cabbage',
    quantity: 1,
  },
  {
    checked: false,
    id: 'carrots',
    name: 'carrots',
    quantity: 1,
  },
  {
    checked: false,
    id: 'potatoes',
    name: 'potatoes',
    quantity: 1,
  },
]

export default function Shop() {
  const ref = useRef<TextInputRef>(null)

  const [items, update] = useState(MOCK_ITEMS)
  const onSubmit = useCallback((event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    update((list) => [
      { checked: false, id: Math.random().toString(), name: event.nativeEvent.text, quantity: 1 },
      ...list,
    ])
    ref.current?.clear()
    ref.current?.focus()
  }, [])

  const onCheckChange = useCallback((id: string, checked: boolean) => {
    update((list) => {
      const item = list.find((item) => item.id === id)
      if (item) {
        item.checked = checked
      }
      return [...list]
    })
  }, [])

  const completed = useMemo(() => {
    if (!items.length) {
      return 0
    }

    return (items.filter((item) => item.checked).length / items.length) * 100
  }, [items])
  const isCompleted = completed === 100

  const confetti = useConfetti()
  useEffect(() => {
    if (isCompleted) {
      confetti?.play()
    }
  }, [isCompleted, confetti?.play, confetti])

  return (
    <Layout style={StyleSheet.absoluteFill} bg="$background">
      <Layout.Scroll pointerEvents="box-none">
        <Layout grow gap={24} pb="32" mt={24} gutter>
          <Layout gap={8}>
            <Layout row items="center" gap={12}>
              <Layout grow>
                <TextInput
                  ref={ref}
                  label="Add item"
                  maxLength={100}
                  icon="CornerRightDown"
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={onSubmit}
                />
              </Layout>
            </Layout>
          </Layout>
          <Layout grow gap={8}>
            {!items.length && (
              <Layout grow center gap={4}>
                <Icon.NotebookPen color="$primary-muted" />
                <Text color="$primary-muted" textAlign="center">
                  Start your list by adding items
                </Text>
              </Layout>
            )}
            {items.map((item) => (
              <ListItem key={item.id} item={item} onChange={onCheckChange} />
            ))}
          </Layout>
        </Layout>
        <TabBarSpacer />
        <Layout.SafeBottom />
      </Layout.Scroll>
      <Layout position="absolute" bottom={16} width="100%">
        <Card row gap={8} items="center" gutter>
          <Text variant="caption" bold>
            {items.length} items
          </Text>
          <Layout circle grow bg="$background" height={12}>
            <Layout
              circle
              grow
              bg={isCompleted ? '$success' : '$accent'}
              position="absolute"
              width={`${completed}%`}
              left={0}
              bottom={0}
              top={0}
            />
          </Layout>
          <Text variant="caption" bold>
            {completed.toPrecision(3)}%
          </Text>
        </Card>
        <TabBarSpacer />
        <Layout.SafeBottom />
      </Layout>
    </Layout>
  )
}

type Props = { item: (typeof MOCK_ITEMS)[number]; onChange?: (id: string, checked: boolean) => void }

const ListItem: React.FC<Props> = (props) => {
  const { item, onChange } = props

  const [checked, check] = useState(false)
  const toggle = useCallback(() => check((value) => !value), [])

  useEffect(() => {
    onChange?.(item.id, checked)
  }, [checked, item.id, onChange])

  return (
    <Layout
      key={item.id}
      items="center"
      rounded
      pl={12}
      row
      gap={8}
      onPress={toggle}
      bg={!checked ? '$surface-muted' : undefined}>
      {checked ? <Icon.CircleCheck /> : <Icon.Circle />}

      <Text mr="auto" py="12" textDecorationLine={checked ? 'line-through' : undefined} bold={!checked}>
        {item.name}
      </Text>
      <Layout row gap={8} onPress={(e) => e.stopPropagation()} p={12}>
        <Icon.CircleMinus />
        <Text>{item.quantity}</Text>
        <Icon.CirclePlus />
      </Layout>
    </Layout>
  )
}
