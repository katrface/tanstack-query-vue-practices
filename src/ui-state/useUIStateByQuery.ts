import { computed, type ComputedRef, type Ref } from 'vue'

import { useQueryOnline } from './useQueryOnline.ts'

type QueryReturn = {
  status: Ref<'pending' | 'error' | 'success'>
  fetchStatus: Ref<'idle' | 'fetching' | 'paused'>
  isError: Ref<boolean>
  data: Ref<unknown> | ComputedRef<unknown>
  isPlaceholderData: Ref<boolean>
  isFetchingNextPage?: Ref<boolean>
} & Record<string, unknown>

export const useUiStateByQuery = (queryReturn: QueryReturn) => {
  const { isOnline } = useQueryOnline()

  const isBlocked = computed(
    () => queryReturn.status.value === 'pending' && queryReturn.fetchStatus.value === 'idle',
  )

  const isSkeleton = computed(
    () => queryReturn.status.value === 'pending' && queryReturn.fetchStatus.value === 'fetching',
  )

  const isLoadMoreSpinner = computed(() => {
    const isFetchingNextPage = queryReturn.isFetchingNextPage

    return isFetchingNextPage?.value
  })

  const isSpinner = computed(
    () => !isLoadMoreSpinner.value && queryReturn.fetchStatus.value === 'fetching',
  )

  const isRefreshing = computed(
    () => queryReturn.status.value === 'success' && queryReturn.fetchStatus.value === 'fetching',
  )

  const isPaused = computed(() => queryReturn.fetchStatus.value === 'paused')

  const isErrorWithoutData = computed(
    () =>
      queryReturn.isError.value && (!queryReturn.data.value || queryReturn.isPlaceholderData.value),
  )

  const isErrorState = computed(() => queryReturn.isError.value)

  return {
    isBlocked,
    isSkeleton,
    isSpinner,
    isLoadMoreSpinner,
    isRefreshing,
    isPaused,
    isOnline,
    isErrorWithoutData,
    isError: isErrorState,
  }
}
