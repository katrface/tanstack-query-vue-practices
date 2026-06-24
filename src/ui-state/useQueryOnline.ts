import { onlineManager } from '@tanstack/query-core'
import { onUnmounted, readonly, ref } from 'vue'

export const useQueryOnline = () => {
  const isOnline = ref(true)

  const unsubscribe = onlineManager.subscribe((onlineState) => {
    isOnline.value = onlineState
  })

  onUnmounted(() => unsubscribe())

  return {
    isOnline: readonly(isOnline),
  }
}
