import { useCallback, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import Layout from '@/components/Layout/Layout'
import { ModalScreen, useModalRef } from '@/components/ModalScreen/ModalScreen'
import { RoundedPressable } from '@/components/RoundedPressable/RoundedPressable'
import Text from '@/components/Text/Text'
import TextInput from '@/components/TextInput/TextInput'
import { Toolbar } from '@/components/Toolbar/Toolbar'
import { useNewHomeMutation } from '@/src/graphql/generated/documents'
import { GeneralError } from '@/src/utils/errors/general-error'
import { useUuid } from '@/src/utils/uuid'

const schema = z.object({
  id: z.string(),
  name: z.string('required').nonempty('required'),
})

export default function NewHome() {
  const router = useRouter()
  const modal = useModalRef()

  const [execute, { loading }] = useNewHomeMutation({
    onCompleted(result) {
      if (result.newHome.__typename !== 'Home') {
        return new GeneralError(result.newHome).snackbar().handle()
      }

      router.back()
    },
    onError(err) {
      return new GeneralError(err).snackbar().handle()
    },
  })

  const id = useUuid()
  const resolver = useMemo(() => zodResolver(schema), [])
  const form = useForm({ defaultValues: { id }, resolver })
  const onCreate = useCallback(
    (values: z.infer<typeof schema>) => {
      execute({ variables: values })
    },
    [execute]
  )

  return (
    <ModalScreen ref={modal}>
      <Toolbar grow>
        <Text variant="h3" mr="auto">
          New Home
        </Text>
        <RoundedPressable onPress={modal.current?.close}>
          <Icon.X />
        </RoundedPressable>
      </Toolbar>

      <FormProvider {...form}>
        <Layout gap={24} py={24} gutter>
          <TextInput.Field
            name="name"
            label="name"
            returnKeyType="done"
            onSubmitEditing={form.handleSubmit(onCreate)}
          />
          <Button onPress={form.handleSubmit(onCreate)} loading={loading}>
            <Text color="$text-on-dark" bold>
              Create
            </Text>
          </Button>
        </Layout>
      </FormProvider>
    </ModalScreen>
  )
}
