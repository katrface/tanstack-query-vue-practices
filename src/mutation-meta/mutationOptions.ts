import type { DefaultError, UseMutationOptions } from '@tanstack/vue-query'
import type { UnwrapRef } from 'vue'

import type { MutationMeta } from './types'

type UnwrapMaybeGetter<T> = T extends () => infer U ? U : T

type CustomMutationOptions<TData, TError, TVariables, TOnMutateResult> = Omit<
  UnwrapRef<UnwrapMaybeGetter<UseMutationOptions<TData, TError, TVariables, TOnMutateResult>>>,
  'meta'
> & {
  meta?: MutationMeta<TData, TError, TVariables>
}

export const mutationOptions = <TData, TError extends DefaultError, TVariables, TOnMutateResult>(
  options: CustomMutationOptions<TData, TError, TVariables, TOnMutateResult>,
) => options as UseMutationOptions<TData, TError, TVariables, TOnMutateResult>
