import { useRouter } from 'expo-router'

import { Card } from '@/components/Card/Card'
import { useCurrentHome } from '@/components/HomeProvider/HomeProvider'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import { ModalScreen, useModalRef } from '@/components/ModalScreen/ModalScreen'
import { RoundedPressable } from '@/components/RoundedPressable/RoundedPressable'
import Text from '@/components/Text/Text'
import { Toolbar } from '@/components/Toolbar/Toolbar'

export default function NewHome() {
  const router = useRouter()
  const modal = useModalRef()

  const [home] = useCurrentHome()

  return (
    <ModalScreen ref={modal}>
      <Toolbar grow>
        <Text variant="h3" mr="auto">
          What would you like to add?
        </Text>
        <RoundedPressable onPress={modal.current?.close}>
          <Icon.X />
        </RoundedPressable>
      </Toolbar>

      <Layout gap={8} py={24} gutter>
        <Card row gap={16} items="center" onPress={() => router.replace('/homes/new')}>
          <Layout bg="$background" diameter={42} center>
            <Icon.HousePlus />
          </Layout>
          <Text mr="auto" bold>
            Home
          </Text>
          <Icon.ChevronRight color="$icon-muted" />
        </Card>
        <Card row gap={16} items="center" onPress={() => router.replace('/stores/new')}>
          <Layout bg="$background" diameter={42} center>
            <Icon.Boxes />
          </Layout>
          <Layout mr="auto" flexShrink={1}>
            <Text bold>Store</Text>
            <Text variant="caption">{home?.name}</Text>
          </Layout>
          <Icon.ChevronRight color="$icon-muted" />
        </Card>
        <Card row gap={16} items="center" onPress={() => router.replace('/stock/new')}>
          <Layout bg="$background" diameter={42} center>
            <Icon.Package />
          </Layout>
          <Layout mr="auto" flexShrink={1}>
            <Text bold>Stock</Text>
            <Text variant="caption">{home?.name}</Text>
          </Layout>
          <Icon.ChevronRight color="$icon-muted" />
        </Card>
      </Layout>
    </ModalScreen>
  )
}
