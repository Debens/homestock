import { useRouter } from 'expo-router'

import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card/Card'
import { useCurrentHome } from '@/components/HomeProvider/HomeProvider'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import Loader from '@/components/Loader/Loader'
import { ModalScreen, useModalRef } from '@/components/ModalScreen/ModalScreen'
import { RoundedPressable } from '@/components/RoundedPressable/RoundedPressable'
import Text from '@/components/Text/Text'
import { Toolbar } from '@/components/Toolbar/Toolbar'
import { useHomesQuery } from '@/src/graphql/generated/documents'

export default function NewHome() {
  const router = useRouter()
  const modal = useModalRef()

  const [selected, { select }] = useCurrentHome()
  const { data, loading } = useHomesQuery()

  return (
    <ModalScreen ref={modal}>
      <Toolbar grow>
        <Text variant="h3" mr="auto">
          Your Homes
        </Text>
        <RoundedPressable onPress={modal.current?.close}>
          <Icon.X />
        </RoundedPressable>
      </Toolbar>
      <Layout gap={24} py={12} mb={12} gutter>
        <Loader data={data?.viewer.homes.edges.map((edge) => edge.node)} loading={loading}>
          {({ data: homes }) => (
            <Layout gap={12}>
              {homes.map((home) => {
                const isSelected = selected?.id === home.id

                return (
                  <Card
                    key={home.id}
                    row
                    gap={12}
                    bg={isSelected ? '$foreground' : '$background'}
                    elevation={isSelected ? 'low' : undefined}
                    onPress={() => select(home)}>
                    {isSelected ? <Icon.CircleArrowRight color="$text-on-dark" /> : <Icon.Circle color="$text" />}
                    <Text color={isSelected ? '$text-on-dark' : '$text'}>{home.name}</Text>
                  </Card>
                )
              })}
            </Layout>
          )}
        </Loader>
        <Layout row gap={12}>
          <Layout row grow borderBottomWidth={1} height="55%" />
          <Text variant="caption">OR</Text>
          <Layout row grow borderBottomWidth={1} height="55%" />
        </Layout>
        <Button variant="secondary" onPress={() => router.navigate('/homes/new')}>
          Create Home
        </Button>
      </Layout>
    </ModalScreen>
  )
}
