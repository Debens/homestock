import { memo, type PropsWithChildren, useEffect, useMemo, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import Layout from '../Layout/Layout'
import { Tag } from '../Tag/Tag'

type ItemProps<T> = {
  data: T
  index: number
  selected: boolean
}

type Props<T> = PropsWithChildren<{
  data: T[]
  render: (props: ItemProps<T>) => string
  toKey: (item: T) => string
  onChange?: (key: string, item: T) => void
}>

export const TagSelect = <T,>(props: Props<T>) => {
  const { data, render, children, toKey, onChange } = props

  const [selected, select] = useState<T>()
  const selectedKey = useMemo(() => selected && toKey(selected), [selected, toKey])

  useEffect(() => {
    if (selected && selectedKey) {
      onChange?.(selectedKey, selected)
    }
  }, [onChange, selectedKey, selected])

  return (
    <Layout row gap={12} flexWrap="wrap" center>
      {data.map((item, index) => {
        const key = toKey(item)
        const active = key === selectedKey
        return (
          <Tag
            key={toKey(item)}
            bg="$button"
            color={active ? '$text-button' : '$text'}
            elevation={active ? 'low' : undefined}
            outlined={!active}
            onPress={() => select(item)}>
            {render({ data: item, index, selected: active })}
          </Tag>
        )
      })}
      {children}
    </Layout>
  )
}

const Field = <T,>(props: Props<T> & { name: string }) => {
  const context = useFormContext()

  const { name, ...input } = props

  return (
    <Controller
      control={context.control}
      name={name}
      render={({ field }) => {
        return <TagSelect {...field} onChange={field.onChange} {...input} />
      }}
    />
  )
}

export default Object.assign(memo(TagSelect), { Field })
