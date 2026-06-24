import { useToast } from '@nuxt/ui/composables'
import { toValueOnError, toValueOnSuccess } from './shared.ts'
import type { MaybeGetterOnError, MaybeGetterOnSuccess } from './shared.ts'
import type { ToastProps } from '@nuxt/ui'

export type ToastMeta<TData, TError, TVariables> = {
  successToast?: MaybeGetterOnSuccess<ToastProps, TData, TVariables>
  errorToast?: MaybeGetterOnError<ToastProps, TError, TVariables>
}

export type WeekToastMeta = {
  successToast?: MaybeGetterOnSuccess<ToastProps>
  errorToast?: MaybeGetterOnError<ToastProps>
}

type OnSuccessToastParam = {
  meta: WeekToastMeta | undefined
  data: unknown
  variables: unknown
}

type OnErrorToastParam = {
  meta: WeekToastMeta | undefined
  error: unknown
  variables: unknown
}

export const useToastByMeta = () => {
  const toast = useToast()

  const onSuccessToast = ({ meta, data, variables }: OnSuccessToastParam) => {
    const successToast = meta?.successToast

    if (!successToast) {
      return
    }

    toast.add({
      color: 'success',
      ...toValueOnSuccess(successToast, data, variables),
    })
  }

  const onErrorToast = ({ meta, error, variables }: OnErrorToastParam) => {
    const errorToast = meta?.errorToast

    if (!errorToast) {
      return
    }

    toast.add({
      color: 'error',
      ...toValueOnError(errorToast, error, variables),
    })
  }

  return {
    onSuccessToast,
    onErrorToast,
  }
}
