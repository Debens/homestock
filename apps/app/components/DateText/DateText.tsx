import { useMemo } from 'react'

import dayjs from 'dayjs'

import Text, { type TextProps } from '@/components/Text/Text'

type Props = { children: string | dayjs.Dayjs; format?: string | ((date: dayjs.Dayjs) => string) } & TextProps

export const DateText: React.FC<Props> = (props) => {
  const { children, format, ...text } = props

  const date = useMemo(() => (typeof children === 'string' ? dayjs(children) : children), [children])
  const str = useMemo(() => {
    switch (typeof format) {
      case 'string':
        return date.format(format)
      case 'function':
        return format(date)
      default:
        return date.format('DD MMMM YYYY')
    }
  }, [format, date])

  return <Text {...text}>{str}</Text>
}
