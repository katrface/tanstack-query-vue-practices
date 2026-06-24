import { QueryClient, type QueryKey } from '@tanstack/vue-query'
import { applyQueryPolicy } from './applyPolicy'
import { pimBaseQueryKeys, productQueryKeys } from '@/0-key-factory/products.key'
import type { QueryPolicyName } from './policies'

const pimQueryClient = new QueryClient()

applyQueryPolicy(
  pimQueryClient,
  new Map<QueryKey, QueryPolicyName>([
    [pimBaseQueryKeys, 'dynamic'],
    [productQueryKeys.allDetails(), 'reference'],
  ]),
)
