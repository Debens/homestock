import type { PropsWithChildren } from 'react'

import type { Token } from 'tamagui'

import type { IconName } from '../Icon/Icon'
import Icon from '../Icon/Icon'
import Layout, { type LayoutProps } from '../Layout/Layout'
import Text from '../Text/Text'

type Props = PropsWithChildren<{ icon?: IconName; color?: Token } & LayoutProps>

export const Tag: React.FC<Props> = (props) => {
  const { icon, color = '$text', children, ...layout } = props

  return (
    <Layout circle row bg="$surface" center px={16} py={6} gap={6} {...layout}>
      {icon && <Icon name={icon} size={12} color={color} strokeWidth={3} />}
      <Text variant="tag" color={color}>
        {children}
      </Text>
    </Layout>
  )
}
