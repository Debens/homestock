import { useRouter } from 'expo-router'

import Icon from '../Icon/Icon'
import { RoundedPressable } from '../RoundedPressable/RoundedPressable'

export const OnBack: React.FC = () => {
  const router = useRouter()

  return (
    <RoundedPressable onPress={router.back}>
      <Icon.ChevronLeft color="$icon" />
    </RoundedPressable>
  )
}
