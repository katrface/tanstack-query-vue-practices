# Несколько `queryClient` (например в микрофронтах)

- [Пример кода](./pim-client.ts)
- [На главную](../../README.md)

---

Для каждого composable tanstack query создаем обертку с принудительным указанием клиента.

> С текущей реализацией тип будет обманывать, так как второго параметра (клиента) не существует. TODO попробовать исправить это.

```ts
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
```

---

- [Пример кода](./pim-client.ts)
- [На главную](../../README.md)
