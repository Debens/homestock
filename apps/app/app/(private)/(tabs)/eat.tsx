import { Text } from 'tamagui'

import Layout from '@/components/Layout/Layout'

export default function Screen() {
  return (
    <Layout grow>
      <Layout.SafeTop />
      <Layout grow center>
        <Text>Cook</Text>
      </Layout>
    </Layout>
  )
}
