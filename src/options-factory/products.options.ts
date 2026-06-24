import { productQueryKeys } from '@/key-factory/products.key'
import type { ProductDetailsPayload } from '@/key-factory/products.key'
import { mutationOptions, queryOptions } from '@tanstack/vue-query'
import { fetchArchiveProduct, fetchProductDetails } from './products.endboints'
import { VProductDetailsPayload } from '@/key-factory/products.validators'
import { toValue } from 'vue'

export const productDetailsOptions = (payload: ProductDetailsPayload) =>
  queryOptions({
    queryKey: productQueryKeys.productDetails(payload),
    queryFn: async () => {
      const validatedPayload = VProductDetailsPayload.assert(toValue(payload))
      return fetchProductDetails(validatedPayload)
    },
    // игнорируется в prefetchQuery
    enabled: () => VProductDetailsPayload.allows(toValue(payload)),
  })

export const archiveProductOptions = () =>
  mutationOptions({
    mutationFn: fetchArchiveProduct,
    onSuccess() {
      // some code
    },
    onError() {
      // some code
    },
  })
