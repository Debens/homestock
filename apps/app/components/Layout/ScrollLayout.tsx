import { ScrollView, type ScrollViewProps } from 'tamagui'

const DEFAULTS: ScrollViewProps = {
  alwaysBounceHorizontal: false,
  alwaysBounceVertical: false,
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
  overScrollMode: 'always',
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
}

export const ScrollLayout: React.FC<ScrollViewProps> = (props) => <ScrollView {...DEFAULTS} {...props} />
