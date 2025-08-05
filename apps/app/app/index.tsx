import { useCallback } from 'react'

import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import { StyleSheet } from 'react-native'

import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import Text from '@/components/Text/Text'

export default function Index() {
  const router = useRouter()

  const onStart = useCallback(() => {
    router.navigate('/login')
  }, [router])

  return (
    <Layout grow>
      <Layout.SafeTop />
      <LottieView
        resizeMode="cover"
        autoPlay
        loop
        style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}
        source={require('../assets/floating-dots.json')}
      />
      <Layout grow center justifyContent="flex-end" py="16" gutter>
        <Button onPress={onStart}>
          <Text color="$text-on-dark" bold>
            Lets Go
          </Text>
          <Icon.ArrowRight color="$text-on-dark" />
        </Button>
      </Layout>
      <Layout.SafeBottom />
    </Layout>
  )
}
