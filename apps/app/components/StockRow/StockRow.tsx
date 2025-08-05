import dayjs from 'dayjs'

import { DateText } from '../DateText/DateText'
import Layout from '../Layout/Layout'
import { Tag } from '../Tag/Tag'
import Text from '../Text/Text'
import type { StockFragment } from '@/src/graphql/generated/documents'

type Props = { stock: StockFragment }

export const StockRow: React.FC<Props> = (props) => {
  const { stock } = props

  return (
    <Layout row>
      <Layout grow>
        <Text variant="body" bold>
          {stock.ingredient.name}
        </Text>
        <DateText variant="caption" format="DD MMMM">
          {stock.createdOn}
        </DateText>
      </Layout>

      <Layout justifyContent="flex-end">
        <Tag icon="Clock">{dayjs().to(stock.expiresOn, true)}</Tag>
      </Layout>
    </Layout>
  )
}
