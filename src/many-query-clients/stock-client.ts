import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/vue-query'

export const useStockQueryClient = () => {
  const stockQueryClient = new QueryClient();

  return stockQueryClient
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStockQuery: typeof useQuery = (options: any) => {
  const stockQueryClient = useStockQueryClient();

  return useQuery(options, stockQueryClient)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStockInfiniteQuery: typeof useInfiniteQuery = (options: any) => {
  const stockQueryClient = useStockQueryClient();

  return useInfiniteQuery(options, stockQueryClient)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStockMutation: typeof useMutation = (options: any) => {
  const stockQueryClient = useStockQueryClient();

  return useMutation(options, stockQueryClient)
}
