import { type ComponentProps, memo, useEffect, useMemo, useState } from 'react'

import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'

import Layout from '../Layout/Layout'
import Text from '../Text/Text'

type Props = {
  onChange?: (date: string) => void
}

const DatePicker: React.FC<Props> = (props) => {
  const { onChange } = props
  const [selected, select] = useState<dayjs.Dayjs>()
  const [data] = useState(() => Array.from({ length: 20 }).map((_, i) => dayjs().add(i, 'day')))

  const str = useMemo(() => selected?.format('YYYY-MM-DD'), [selected?.format])
  useEffect(() => {
    if (str) {
      onChange?.(str)
    }
  }, [onChange, str])

  return (
    <Layout gap={8}>
      <Layout rounded outlined bg="$field-backround">
        <FlatList
          style={{ padding: 12 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item: date }) => {
            const isSelected = selected === date
            return (
              <Layout
                px={16}
                py={12}
                gap={2}
                rounded
                bg={isSelected ? '$button' : '$none'}
                elevation={isSelected ? 'low' : undefined}
                center
                onPress={() => select(date)}>
                <Text variant="h2" fontFamily="$mono" fontSize={16} color={isSelected ? '$text-button' : '$text'}>
                  {date.format('ddd')}
                </Text>
                <Text variant="small" fontFamily="$mono" bold color={isSelected ? '$text-button' : '$text'}>
                  {date.format('DD')}
                </Text>
              </Layout>
            )
          }}
        />
      </Layout>
    </Layout>
  )
}

const Field: React.FC<ComponentProps<typeof DatePicker> & { name: string }> = (props) => {
  const context = useFormContext()

  const { name, ...input } = props

  return (
    <Controller
      control={context.control}
      name={name}
      render={({ field }) => {
        return <DatePicker {...field} onChange={field.onChange} {...input} />
      }}
    />
  )
}

export default Object.assign(memo(DatePicker), { Field })
