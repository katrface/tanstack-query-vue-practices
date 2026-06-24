import { MutationCache, QueryClient } from '@tanstack/vue-query'

import { useInvalidateQueriesByMeta } from './invalidateQueries'
import { useToastByMeta } from './toast'

export const createQueryClient = () => {
  const { onSuccessToast, onErrorToast } = useToastByMeta()
  const { invalidateQueries } = useInvalidateQueriesByMeta()

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: async (data, variables, _onMutateResult, mutation) => {
        onSuccessToast({
          meta: mutation.meta,
          data,
          variables,
        })

        await invalidateQueries({
          queryClient,
          meta: mutation.meta,
          data,
          variables,
        })
      },
      onError: (error, variables, _onMutateResult, mutation) => {
        onErrorToast({
          meta: mutation.meta,
          error,
          variables,
        })
      },
    }),
  })

  return queryClient
}
