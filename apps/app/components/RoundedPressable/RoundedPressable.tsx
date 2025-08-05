import Layout, { type LayoutProps } from '../Layout/Layout'

export const RoundedPressable: React.FC<LayoutProps> = (props) => {
  const { children } = props

  return (
    <Layout
      circle
      diameter={32}
      center
      bg="$background"
      pressStyle={{ backgroundColor: '$button-muted-pressed' }}
      {...props}>
      {children}
    </Layout>
  )
}
