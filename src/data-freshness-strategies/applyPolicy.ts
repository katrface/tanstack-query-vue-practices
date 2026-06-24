import type { QueryClient, QueryKey } from '@tanstack/vue-query';

import { queryPolicies } from './policies';
import type { QueryPolicyName } from './policies';

export const applyQueryPolicy = (
  queryClient: QueryClient,
  mapping: Map<QueryKey, QueryPolicyName>,
) => {
  mapping.forEach((policyName, key) => {
    if (!(policyName in queryPolicies)) {
      console.warn(
        `[applyQueryPolicy] Unknown policy "${policyName}" for key: ${JSON.stringify(
          key,
        )}`,
      );

      return;
    }

    const policy = queryPolicies[policyName];

    queryClient.setQueryDefaults(key, policy);
  });
};
