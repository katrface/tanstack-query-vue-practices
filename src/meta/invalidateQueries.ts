import type { InvalidateQueryFilters, QueryClient } from '@tanstack/vue-query'

import { type MaybeGetterOnSuccess, toValueOnSuccess } from './shared'

// TODO подумать над исключением пересечений queryKey в invalidates и awaitInvalidates
export type InvalidateMeta<
  TData,
  TVariables,
  TInvalidates extends InvalidateQueryFilters[] = InvalidateQueryFilters[],
  TAwaitInvalidates extends InvalidateQueryFilters[] = InvalidateQueryFilters[],
> = {
  invalidates?: MaybeGetterOnSuccess<TInvalidates, TData, TVariables>
  awaitInvalidates?: MaybeGetterOnSuccess<TAwaitInvalidates, TData, TVariables>
}

type WeekInvalidatesMeta = {
  invalidates?: MaybeGetterOnSuccess<InvalidateQueryFilters[]>
  awaitInvalidates?: never
}

type WeekAwaitInvalidatesMeta = {
  invalidates?: never
  awaitInvalidates?: MaybeGetterOnSuccess<InvalidateQueryFilters[]>
}

export type WeekInvalidateMeta = WeekInvalidatesMeta | WeekAwaitInvalidatesMeta

type OnSuccessInvalidateParam = {
  queryClient: QueryClient
  meta: WeekInvalidateMeta | undefined
  data: unknown
  variables: unknown
}

export const useInvalidateQueriesByMeta = () => {
  const invalidateQueries = async ({
    queryClient,
    meta,
    data,
    variables,
  }: OnSuccessInvalidateParam) => {
    if (!meta) {
      return
    }

    if (meta.invalidates) {
      const invalidates = toValueOnSuccess(meta.invalidates, data, variables)

      invalidates.forEach((invalidateFilter) => {
        queryClient.invalidateQueries(invalidateFilter)
      })
    }

    if (meta.awaitInvalidates) {
      const awaitInvalidates = toValueOnSuccess(meta.awaitInvalidates, data, variables)

      await Promise.all(
        awaitInvalidates.map((invalidateFilter) => queryClient.invalidateQueries(invalidateFilter)),
      )
    }
  }

  return { invalidateQueries }
}
