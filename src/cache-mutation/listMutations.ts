import type { InfiniteData } from '@tanstack/vue-query'

type TList<TItem> = { list: TItem[] }

export const listFilter = <
  TItem,
  TStructure extends TList<TItem>,
  TData extends TStructure | InfiniteData<TStructure>,
>(
  oldData: TData | undefined,
  predicate: (item: TItem) => boolean,
): TData | undefined => {
  if (!oldData) return undefined

  if ('pages' in oldData) {
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        list: page.list.filter(predicate),
      })),
    } as TData
  }

  if ('list' in oldData) {
    return {
      ...oldData,
      list: (oldData as TStructure).list.filter(predicate),
    } as TData
  }

  return oldData
}

export const listMap = <
  TItem,
  TStructure extends TList<TItem>,
  TData extends TStructure | InfiniteData<TStructure>,
>(
  oldData: TData | undefined,
  callbackFn: (item: TItem) => TItem,
): TData | undefined => {
  if (!oldData) return undefined

  if ('pages' in oldData) {
    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        list: page.list.map(callbackFn),
      })),
    } as TData
  }

  if ('list' in oldData) {
    return {
      ...oldData,
      list: (oldData as TStructure).list.map(callbackFn),
    } as TData
  }

  return oldData
}
