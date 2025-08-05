import { Stack } from 'expo-router'

import { PRESENTATION } from '@/src/utils/navigation/presentation'

export default function StoresLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' }, headerShown: false }}>
      <Stack.Screen name="new" options={PRESENTATION.MODAL} />
    </Stack>
  )
}
