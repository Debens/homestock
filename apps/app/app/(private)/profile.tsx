import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import { OnBack } from '@/components/OnBack/OnBack'
import { Tag } from '@/components/Tag/Tag'
import Text from '@/components/Text/Text'
import { Toolbar } from '@/components/Toolbar/Toolbar'
import { useLogout } from '@/src/authentication/AuthProvider'

const MOCK_USER = { email: 'a.debens@gmail.com', name: { full: 'Andrew Debens' }, no: 132 }

export default function Profile() {
  const onLogout = useLogout()

  return (
    <Layout bg="$background" grow>
      <Layout.SafeTop />
      <Layout.Scroll>
        <Toolbar gap={12}>
          <OnBack />
        </Toolbar>
        <Layout grow>
          <Layout gutter>
            <Layout gap={4}>
              <Layout row gap={12}>
                <Icon.CircleUserRound size={82} strokeWidth={1.2} />
                <Layout justify="center">
                  <Text variant="h1">{MOCK_USER.name.full}</Text>
                  <Text variant="caption" color="$text-muted">
                    {MOCK_USER.email}
                  </Text>
                </Layout>
              </Layout>
              <Layout width={82} items="center">
                <Tag backgroundColor="$foreground" color="$text-on-dark" elevation="low">
                  #{MOCK_USER.no}
                </Tag>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
        <Layout grow />
        <Layout gutter row>
          <Tag bg="$destructive" color="$text-on-dark" onPress={onLogout}>
            Logout
          </Tag>
        </Layout>
        <Layout.SafeBottom mt="32" />
      </Layout.Scroll>
    </Layout>
  )
}
