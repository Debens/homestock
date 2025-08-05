import { useCallback, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/Button/Button'
import DatePicker from '@/components/DatePicker/DatePicker'
import { useCurrentHome } from '@/components/HomeProvider/HomeProvider'
import Layout from '@/components/Layout/Layout'
import Loader from '@/components/Loader/Loader'
import { OnBack } from '@/components/OnBack/OnBack'
import { Tag } from '@/components/Tag/Tag'
import TagSelect from '@/components/TagSelect/TagSelect'
import Text from '@/components/Text/Text'
import TextInput from '@/components/TextInput/TextInput'
import { Toolbar } from '@/components/Toolbar/Toolbar'
import { useNewStockMutation, useStoresQuery } from '@/src/graphql/generated/documents'
import { GeneralError } from '@/src/utils/errors/general-error'
import { useUuid } from '@/src/utils/uuid'

const schema = z.object({
  expiry: z.string(),
  home: z.string(),
  id: z.string(),
  name: z.string('required').nonempty('required'),
  quantity: z.string().transform((val) => Number(val)),
  store: z.string(),
})

export default function NewStock() {
  const router = useRouter()

  const [home] = useCurrentHome()
  const { data, loading: bootstrapping, error } = useStoresQuery({ skip: !home?.id, variables: { home: home?.id } })

  const [execute, { loading: committing }] = useNewStockMutation({
    onCompleted(result) {
      if (result.newStockByNameOnly.__typename !== 'Stock') {
        return new GeneralError(result.newStockByNameOnly).snackbar().handle()
      }

      router.back()
    },
    onError(err) {
      return new GeneralError(err).snackbar().handle()
    },
  })

  const loading = bootstrapping || committing

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
    <Layout bg="$background" grow>
      <Layout.SafeTop />
      <Layout.Scroll>
        <Toolbar>
          <OnBack />
        </Toolbar>

        <Layout gutter mb={24}>
          <Text variant="h1" fontFamily="$display">
            Add Stock
          </Text>
        </Layout>
        <FormProvider {...form}>
          <Layout grow gutter gap={32}>
            <Layout grow gap={24}>
              <TextInput.Field name="name" label="name" autoFocus />
              <TextInput.Field
                name="quantity"
                label="quantity"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={form.handleSubmit(onCreate)}
                defaultValue="1"
              />
              <TextInput label="home" value={home?.name} disabled />
              <Layout gap={8}>
                <Text variant="h3">Expires</Text>
                <DatePicker.Field name="expiry" />
              </Layout>
              <Layout gap={8}>
                <Text variant="h3">Store</Text>

                <Loader data={data?.viewer.homes.byId} guard={(d) => d.__typename === 'Home'}>
                  {({ data: home }) => (
                    <Loader data={home.stores} guard={(d) => d.__typename === 'Stores'}>
                      {({ data: stores }) => (
                        <TagSelect.Field
                          name="store"
                          data={stores.edges}
                          toKey={(edge) => edge.node.id}
                          render={({ data }) => data.node.name}>
                          <Tag icon="Plus" outlined onPress={() => router.navigate('/stores/new')}>
                            Store
                          </Tag>
                        </TagSelect.Field>
                      )}
                    </Loader>
                  )}
                </Loader>
              </Layout>
            </Layout>
            <Button onPress={form.handleSubmit(onCreate)} loading={loading}>
              <Text color="$text-on-dark" bold>
                Create
              </Text>
            </Button>
          </Layout>
        </FormProvider>
        <Layout.SafeBottom mt="32" />
      </Layout.Scroll>
    </Layout>
  )
}
