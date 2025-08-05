import { useRouter } from 'expo-router'

import { Button } from '@/components/Button/Button'
import Layout from '@/components/Layout/Layout'
import { ModalScreen } from '@/components/ModalScreen/ModalScreen'
import Text from '@/components/Text/Text'
import TextInput from '@/components/TextInput/TextInput'
import { useLogin } from '@/src/authentication/AuthProvider'

export default function Login() {
  const router = useRouter()

  const [onLogin, { loading }] = useLogin({
    onCompleted() {
      router.replace('/(private)/(tabs)/_index')
    },
  })

  return (
    <ModalScreen>
      <Layout gap={24} py={24} gutter>
        <TextInput label="email" />
        <TextInput label="password" />
        <Button onPress={onLogin} loading={loading}>
          <Text color="$text-on-dark" bold>
            Login
          </Text>
        </Button>
      </Layout>
    </ModalScreen>
  )
}
