import dayjs from 'dayjs'
import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

import { TabBarSpacer } from './_layout'
import { Card } from '@/components/Card/Card'
import { DateText } from '@/components/DateText/DateText'
import { useCurrentHomeId } from '@/components/HomeProvider/HomeProvider'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import Loader from '@/components/Loader/Loader'
import { StockRow } from '@/components/StockRow/StockRow'
import { Tag } from '@/components/Tag/Tag'
import Text from '@/components/Text/Text'
import { useHomePageQuery } from '@/src/graphql/generated/documents'
import { GeneralError } from '@/src/utils/errors/general-error'

const MOCK_MEALS = [
  {
    id: 1,
    plannedFor: dayjs().add(1, 'day').toISOString(),
    recipe: {
      description: 'Chinese-American stir-fry that’s beloved for its balance of tender meat',
      ingrediants: {
        edges: Array.from({ length: 5 }),
      },
      name: 'Beef & Broccoli',
      rating: 5,
      timings: {
        cooking: 5,
        preparation: 20,
      },
    },
  },
  {
    id: 2,
    plannedFor: dayjs().add(2, 'day').toISOString(),
    recipe: {
      description: 'Chinese-American stir-fry that’s beloved for its balance of tender meat',
      ingrediants: {
        edges: Array.from({ length: 5 }),
      },
      name: 'Beef & Broccoli',
      rating: 5,
      timings: {
        cooking: 5,
        preparation: 20,
      },
    },
  },
]

export default function Home() {
  const router = useRouter()

  const id = useCurrentHomeId()
  const { data, loading, error } = useHomePageQuery({
    onCompleted(result) {
      if (result.viewer.homes.byId.__typename !== 'Home') {
        new GeneralError(result.viewer.homes.byId).handle()
      }
    },
    skip: !id,
    variables: { id },
  })

  const result = data?.viewer.homes.byId
  const home = result?.__typename === 'Home' ? result : undefined

  return (
    <Layout style={StyleSheet.absoluteFill} bg="$background">
      <Layout.Scroll>
        <Layout grow gap={36} mb="32" mt={24}>
          <Layout gap={18}>
            <Card row items="center" elevation="low" size="compact" gap={8} gutter>
              <Tag bg="$background" mr="auto">
                Stores
              </Tag>
              <Loader data={home?.stores} loading={loading} guard={(a) => a.__typename === 'Stores'}>
                <Loader.Loading>
                  <Tag bg="$background"> </Tag>
                </Loader.Loading>
                {({ data: stores }) => <Tag bg="$background">{stores.edges.length}</Tag>}
              </Loader>
            </Card>

            <Loader data={home?.stores} loading={loading} guard={(d) => d.__typename === 'Stores'} map={(d) => d.edges}>
              <Loader.Empty>
                <Layout grow center gap={12} my={12}>
                  <Layout center gap={4}>
                    <Icon.Refrigerator color="$text-muted" />
                    <Text variant="small" color="$text-muted">
                      Your home is empty
                    </Text>
                  </Layout>
                  <Tag onPress={() => router.navigate('/stores/new')}> Setup</Tag>
                </Layout>
              </Loader.Empty>
              {({ data: stores }) => (
                <Layout.Scroll horizontal overflow="visible">
                  <Layout row gap={8} px={16}>
                    {stores
                      .map((edge) => edge.node)
                      .map((store) => (
                        <Card key={store.name} size="compact" outlined row bg="$background" px={16} gap={8}>
                          <Text>{store.name}</Text>
                          <Layout borderRightWidth={1} mx={4} />
                          <Loader data={store.stock} guard={(d) => d.__typename === 'Inventory'}>
                            <Loader.Error>
                              <Layout center grow>
                                <Icon.TriangleAlert size="4" color="$destructive" />
                              </Layout>
                            </Loader.Error>
                            {({ data: inventory }) => (
                              <Layout row items="center" gap={6}>
                                <Text>{inventory.edges.length}</Text>
                              </Layout>
                            )}
                          </Loader>
                        </Card>
                      ))}
                  </Layout>
                </Layout.Scroll>
              )}
            </Loader>
          </Layout>
          <Layout gutter gap={18}>
            <Card row items="center" elevation="low" size="compact" gap={8}>
              <Tag bg="$background" mr="auto">
                Expiring soon
              </Tag>
              <Loader data={home?.inventory} loading={loading} guard={(a) => a.__typename === 'Inventory'}>
                <Loader.Loading>
                  <Tag bg="$background"> </Tag>
                </Loader.Loading>
                {({ data: expiring }) => <Tag bg="$background">{expiring.edges.length}</Tag>}
              </Loader>
            </Card>
            <Loader
              data={home?.inventory}
              loading={loading}
              guard={(a) => a.__typename === 'Inventory'}
              map={(d) => d.edges}>
              <Loader.Empty>
                <Layout grow center gap={12} my={12}>
                  <Layout center gap={4}>
                    <Icon.Sparkle color="$text-muted" />
                    <Text variant="small" color="$text-muted">
                      All fresh here
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
          <Layout gap={18}>
            <Card row items="center" elevation="low" size="compact" gap={8} gutter>
              <Tag bg="$background" mr="auto">
                Coming up
              </Tag>
              <Tag bg="$background">
                <Icon.ArrowRight size={16} />
              </Tag>
            </Card>

            <Layout gutter gap={12}>
              {MOCK_MEALS.map((meal, i, arr) => (
                <Layout key={meal.id} gap={12}>
                  <Layout row items="center" gap={8}>
                    <Icon.CalendarFold color="$secondary" />
                    <DateText variant="caption" format="DD MMMM" color="$secondary">
                      {meal.plannedFor}
                    </DateText>
                  </Layout>
                  <Layout
                    ml={12}
                    pl={12}
                    pb={24}
                    gap={12}
                    borderLeftWidth={Number(+(i < arr.length - 1))}
                    borderColor="$secondary">
                    <Layout row gap={12}>
                      <Card center p={24}>
                        <Icon.Image />
                      </Card>
                      <Layout gap={12} shrink>
                        <Layout grow elevation="low">
                          <Text variant="h3">{meal.recipe.name}</Text>
                          <Text variant="caption">{meal.recipe.description}</Text>
                        </Layout>
                      </Layout>
                    </Layout>
                    <Layout row gap="8" alignItems="flex-start" shrink flexWrap="wrap">
                      <Tag icon="UtensilsCrossed">{meal.recipe.timings.preparation} mins</Tag>
                      <Tag icon="CookingPot">{meal.recipe.timings.cooking} mins</Tag>
                      <Tag icon="Package">{meal.recipe.ingrediants.edges.length}</Tag>
                      <Tag icon="Star">{meal.recipe.rating}</Tag>
                    </Layout>
                  </Layout>
                </Layout>
              ))}
            </Layout>
          </Layout>
        </Layout>
        <TabBarSpacer />
        <Layout.SafeBottom />
      </Layout.Scroll>
    </Layout>
  )
}
