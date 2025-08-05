import { Stack } from 'expo-router'

export default function StockLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' }, headerShown: false }}>
      <Stack.Screen name="new" />
    </Stack>
  )
}
