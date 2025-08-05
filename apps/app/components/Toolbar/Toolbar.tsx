import type { PropsWithChildren } from 'react'

import Layout from '../Layout/Layout'

type Props = PropsWithChildren & React.ComponentProps<typeof Layout>

export const Toolbar: React.FC<Props> = (props) => {
  const { children, ...layout } = props

  return (
    <Layout row px={16} py="12" mt="12" items="center" {...layout}>
      {children}
    </Layout>
  )
}
