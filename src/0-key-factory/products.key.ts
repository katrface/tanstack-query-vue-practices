import { toValue, type MaybeRefOrGetter } from "vue";
import type { TProductDetailsPayload, TProductListPayload } from "./products.validators";

// где-нибудь в shared
const pimBaseQueryKeys = 'pim';

export type ProductListPayload = MaybeRefOrGetter<Partial<TProductListPayload>>

export type ProductDetailsPayload = MaybeRefOrGetter<Partial<TProductDetailsPayload>>

// для центролизованного управления ключами
export const productQueryKeys = {
  // общие и утилитные ключи
  all: () => [...pimBaseQueryKeys, 'products'] as const,
  allLists: () => [...productQueryKeys.all(), 'list'] as const,
  allDetails: () => [...productQueryKeys.all(), 'details'] as const,

  // ключи конкретных запросов
  productList: (payload: ProductListPayload) =>
    [...productQueryKeys.allLists(), toValue(payload).shopId, payload] as const,
  productDetails: (payload: ProductDetailsPayload) =>
    [...productQueryKeys.allDetails(), toValue(payload).shopId, payload] as const,
}
