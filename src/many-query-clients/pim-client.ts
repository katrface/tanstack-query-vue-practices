import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/vue-query'
import { createSharedComposable } from '@vueuse/core';

// при необходимости можем использовать createGlobalState
export const usePimQueryClient = createSharedComposable(() => {
  const pimQueryClient = new QueryClient();

  return pimQueryClient
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePimQuery: typeof useQuery = (options: any) => {
  const pimQueryClient = usePimQueryClient();

  // принудительно указываем клиента
  return useQuery(options, pimQueryClient)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePimInfiniteQuery: typeof useInfiniteQuery = (options: any) => {
  const pimQueryClient = usePimQueryClient();

  // принудительно указываем клиента
  return useInfiniteQuery(options, pimQueryClient)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePimMutation: typeof useMutation = (options: any) => {
  const pimQueryClient = usePimQueryClient();

  // принудительно указываем клиента
  return useMutation(options, pimQueryClient)
}
