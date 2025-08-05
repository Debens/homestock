import type { IconProps } from '@tamagui/helpers-icon'
import * as icons from '@tamagui/lucide-icons'

export type IconName = keyof typeof icons
type Props = IconProps
type NamedProps = { name: IconName } & Props

const Icon: React.FC<NamedProps> = (props) => {
  const { name } = props
  const Comp = icons[name]

  if (!Comp) {
    return null
  }

  return <Comp color="$icon" {...props} />
}

export default Object.assign(Icon, icons)
