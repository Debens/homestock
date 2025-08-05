import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

import { useCurrentHomeId } from '@/components/HomeProvider/HomeProvider'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import Loader from '@/components/Loader/Loader'
import { StockRow } from '@/components/StockRow/StockRow'
import { Tag } from '@/components/Tag/Tag'
import Text from '@/components/Text/Text'
import { useInventoryQuery } from '@/src/graphql/generated/documents'

export default function Stock() {
  const id = useCurrentHomeId()
  const { data, loading, error } = useInventoryQuery({ variables: { home: id } })

  const router = useRouter()
  const stock =
    data?.viewer.homes.byId.__typename === 'Home'
      ? data.viewer.homes.byId.inventory.__typename === 'Inventory'
        ? data.viewer.homes.byId.inventory.edges
        : undefined
      : undefined

  return (
    <Layout.Scroll style={StyleSheet.absoluteFill}>
      <Layout grow gutter py={16}>
        <Loader style={{ flex: 1 }} data={stock} loading={loading}>
          <Loader.Empty>
            <Layout grow center gap={12} my={12}>
              <Layout center gap={4}>
                <Icon.PackageOpen color="$text-muted" />
                <Text variant="small" color="$text-muted">
                  There nothing here, yet.
                </Text>
              </Layout>
              <Tag onPress={() => router.navigate('/stock/new')}>Create</Tag>
            </Layout>
          </Loader.Empty>
          {({ data: expiring }) => (
            <Layout gap={12}>
              {expiring.map((edge) => (
                <StockRow key={edge.cursor} stock={edge.node} />
              ))}
            </Layout>
          )}
        </Loader>
      </Layout>
    </Layout.Scroll>
  )
}
