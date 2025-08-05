import { useEffect } from 'react'

import { Stack, useRouter } from 'expo-router'

import { HomeProvider } from '@/components/HomeProvider/HomeProvider'
import { useLoginState } from '@/src/authentication/AuthProvider'
import { PRESENTATION } from '@/src/utils/navigation/presentation'

export default function PrivateLayout() {
  const router = useRouter()
  const isLoggedIn = useLoginState()

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/')
    }
  }, [isLoggedIn, router.replace])

  return (
    <HomeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="stock" />
        <Stack.Screen name="homes" options={PRESENTATION.MODAL} />
        <Stack.Screen name="stores" options={PRESENTATION.MODAL} />
        <Stack.Screen name="new" options={PRESENTATION.MODAL} />
      </Stack>
    </HomeProvider>
  )
}
