import { type } from 'arktype'

export const VProduct = type({
  internalId: 'string.uuid',
  shopId: 'number',
  externalId: 'string',
  title: 'string',
  shortDescription: 'string',
  description: 'string',
})

export const VProductDetailsPayload = type({
  shopId: VProduct.get('shopId'),
  internalId: VProduct.get('internalId')
})

export type TProduct = typeof VProduct.infer
export type TProductDetailsPayload = typeof VProductDetailsPayload.infer

export const VProductListPayload = type({
  shopId: VProduct.get('shopId'),
  'searchString?': 'string',
  limit: 'number',
  offset: 'number',
  sortBy: 'string',
  order: 'string'
})

export type TProductListPayload = typeof VProductListPayload.infer
