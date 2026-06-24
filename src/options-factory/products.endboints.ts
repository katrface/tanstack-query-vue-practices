import type { TProductDetailsPayload } from '@/key-factory/products.validators'

export const fetchProductDetails = async (payload: TProductDetailsPayload) => {
  console.log(payload)
  return Promise.resolve({
    internalId: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
    shopId: 42,
    externalId: 'prod_987654',
    title: 'Wireless Noise-Canceling Headphones',
    shortDescription: 'Premium over-ear headphones with active noise cancellation.',
    description:
      'Experience high-quality sound with up to 30 hours of battery life, touch controls, and seamless voice assistant integration.',
  })
}

export const fetchArchiveProduct = async (payload: TProductDetailsPayload) => {
  console.log(payload)
  return Promise.resolve()
}
