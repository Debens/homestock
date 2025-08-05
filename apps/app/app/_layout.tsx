import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'

import config from '../tamagui.config'
import { ConfettiProvider } from '@/components/ConfettiProivder/ConfettiProivder'
import { AuthProvider, useLoginState } from '@/src/authentication/AuthProvider'
import { GraphQLProvider } from '@/src/graphql/GraphQLProvider'
import { PRESENTATION } from '@/src/utils/navigation/presentation'

dayjs.extend(relativeTime)

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ?? 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ConfettiProvider>
          <AuthProvider>
            <GraphQLProvider>
              <Navigation />
            </GraphQLProvider>
          </AuthProvider>
        </ConfettiProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}

export const Navigation = () => {
  const isLoggedIn = useLoginState()

  const router = useRouter()
  useFocusEffect(() => {
    if (isLoggedIn) {
      router.navigate('/(private)/(tabs)/home')
    }
  })

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={PRESENTATION.MODAL} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(private)" />
      </Stack.Protected>
    </Stack>
  )
}
