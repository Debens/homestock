import { type PropsWithChildren, useCallback } from 'react'

import { useRouter } from 'expo-router'
import { TabList, TabSlot, Tabs, TabTrigger } from 'expo-router/ui'

import { useCurrentHome } from '@/components/HomeProvider/HomeProvider'
import Icon, { type IconName } from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import Loader from '@/components/Loader/Loader'
import { RoundedPressable } from '@/components/RoundedPressable/RoundedPressable'
import Text from '@/components/Text/Text'
import { Toolbar } from '@/components/Toolbar/Toolbar'

export default function TabLayout() {
  const router = useRouter()

  const [home, { loading }] = useCurrentHome()

  const onChangeHome = useCallback(() => router.navigate('/homes/select'), [router.navigate])

  return (
    <Layout bg="$background" grow>
      <Layout.SafeTop />
      <Toolbar gap={12} borderBottomWidth={1} elevation="low" bg="$background" zIndex={1}>
        <Layout row grow gap={12} items="center">
          <RoundedPressable onPress={() => router.navigate('/profile')}>
            <Icon.CircleUserRound />
          </RoundedPressable>
          <Loader data={home} loading={loading}>
            <Loader.Empty>
              <></>
            </Loader.Empty>
            <Loader.Loading>
              <Layout />
            </Loader.Loading>
            {({ data }) => (
              <Layout
                borderRadius={32}
                maxWidth={180}
                p={4}
                gap={8}
                row
                items="center"
                bg="$foreground"
                onPress={onChangeHome}>
                <Text color="$text-on-dark" numberOfLines={1} ellipsizeMode="tail" pl={6} flexShrink={1}>
                  {data.name}
                </Text>
                <Layout diameter={24} bg="$text-on-dark" center>
                  <Icon.ChevronDown color="$foreground" size={18} mt={2} />
                </Layout>
              </Layout>
            )}
          </Loader>
        </Layout>
        <RoundedPressable onPress={() => router.navigate('/new')}>
          <Icon.CirclePlus />
        </RoundedPressable>
      </Toolbar>
      <Tabs>
        <TabSlot />
        <TabList asChild>
          <Bar>
            <TabTrigger name="home" href="/home" asChild>
              <Trigger icon="Home" />
            </TabTrigger>
            <TabTrigger name="stock" href="/stock" asChild>
              <Trigger icon="Package" />
            </TabTrigger>
            <TabTrigger name="shop" href="/shop" asChild>
              <Trigger icon="ShoppingCart" />
            </TabTrigger>
            <TabTrigger name="eat" href="/eat" asChild>
              <Trigger icon="CookingPot" />
            </TabTrigger>
            <TabTrigger name="index" href="/" />
            <Layout.SafeBottom />
          </Bar>
        </TabList>
      </Tabs>
    </Layout>
  )
}

const Bar: React.FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <Layout position="absolute" bottom={16} width="100%" elevation="high">
      <Layout gutter row center grow rounded={3} my="32" p="12" bg="$foreground" justifyContent="space-evenly">
        {children}
      </Layout>
    </Layout>
  )
}

const Trigger: React.FC<{ icon: IconName; isFocused?: boolean }> = (props) => {
  const { icon, isFocused, ...trigger } = props

  return (
    <Layout grow rounded bg={isFocused ? '$background' : undefined} mx="auto" py="8" px="12" {...trigger}>
      <Icon name={icon} mx="auto" color={isFocused ? '$foreground' : '$background'} />
    </Layout>
  )
}

export const TabBarSpacer = () => <Layout height={70} />
