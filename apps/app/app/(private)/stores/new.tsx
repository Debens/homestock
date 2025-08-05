import { useCallback, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/Button/Button'
import { useCurrentHome } from '@/components/HomeProvider/HomeProvider'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import { ModalScreen, useModalRef } from '@/components/ModalScreen/ModalScreen'
import { RoundedPressable } from '@/components/RoundedPressable/RoundedPressable'
import Text from '@/components/Text/Text'
import TextInput from '@/components/TextInput/TextInput'
import { Toolbar } from '@/components/Toolbar/Toolbar'
import { useNewStoreMutation } from '@/src/graphql/generated/documents'
import { GeneralError } from '@/src/utils/errors/general-error'
import { useUuid } from '@/src/utils/uuid'

const schema = z.object({
  home: z.string(),
  id: z.string(),
  name: z.string('required').nonempty('required'),
})

export default function NewStore() {
  const router = useRouter()
  const modal = useModalRef()

  const [home] = useCurrentHome()
  const [execute, { loading }] = useNewStoreMutation({
    onCompleted(result) {
      if (result.newStore.__typename !== 'Store') {
        return new GeneralError(result.newStore).snackbar().handle()
      }

      router.back()
    },
    onError(err) {
      return new GeneralError(err).snackbar().handle()
    },
  })

  const id = useUuid()
  const resolver = useMemo(() => zodResolver(schema), [])
  const form = useForm({ defaultValues: { home: home?.id, id }, resolver })
  const onCreate = useCallback(
    (values: z.infer<typeof schema>) => {
      execute({ variables: values })
    },
    [execute]
  )

  return (
    <ModalScreen ref={modal}>
      <Toolbar grow>
        <Layout row items="end" gap={8} mr="auto">
          <Text variant="h3">Create Store</Text>
        </Layout>

        <RoundedPressable onPress={modal.current?.close}>
          <Icon.X />
        </RoundedPressable>
      </Toolbar>

      <Layout gap={24} py={24} gutter>
        <FormProvider {...form}>
          <Layout gap={12}>
            <TextInput label="home" value={home?.name} disabled />
            <TextInput.Field
              name="name"
              label="name"
              returnKeyType="done"
              onSubmitEditing={form.handleSubmit(onCreate)}
            />
          </Layout>
          <Button onPress={form.handleSubmit(onCreate)} loading={loading}>
            <Text color="$text-on-dark" bold>
              Create
            </Text>
          </Button>
        </FormProvider>
      </Layout>
    </ModalScreen>
  )
}
