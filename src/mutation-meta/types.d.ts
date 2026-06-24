import '@tanstack/vue-query'

import type { InvalidateMeta, WeekInvalidateMeta } from './invalidateQueries'
import type { ToastMeta, WeekToastMeta } from './plugins/toast'

export type MutationMeta<TData, TError, TVariables> = ToastMeta<TData, TError, TVariables> &
  InvalidateMeta<TData, TVariables>

export type WeekMutationMeta = WeekToastMeta & WeekInvalidateMeta

declare module '@tanstack/vue-query' {
  interface Register {
    mutationMeta: WeekMutationMeta
  }
}
