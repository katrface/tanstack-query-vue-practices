<script setup lang="ts">
import { mutationOptions, queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import { archiveProductOptions, productDetailsOptions } from './products.options'
import { VProductDetailsPayload } from '@/0-key-factory/products.validators'

const props = defineProps<{
  shopId?: number
  productId?: string
}>()

const productDetailsQuery = useQuery(
  productDetailsOptions(() => ({
    shopId: props.shopId,
    internalId: props.productId,
  })),
)

const someProductPropertyQuery = useQuery(
  queryOptions({
    ...productDetailsOptions(() => ({
      shopId: props.shopId,
      internalId: props.productId,
    })),
    select: ({ description }) => description,
  }),
)

const { mutate } = useMutation(archiveProductOptions())

const archiveProduct = () => {
  const payload = VProductDetailsPayload.assert({
    shopId: props.shopId,
    internalId: props.productId,
  })

  mutate(payload)
}

useMutation(
  mutationOptions({
    ...archiveProductOptions(),
    onSuccess() {
      //some code
    },
  }),
)
</script>

<template>
  <div>
    <pre>
      {{ productDetailsQuery.data }}
    </pre>
    <pre>
      {{ someProductPropertyQuery.data }}
    </pre>
    <button @click="archiveProduct">Archive</button>
  </div>
</template>
