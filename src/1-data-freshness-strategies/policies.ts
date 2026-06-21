import { keepPreviousData } from '@tanstack/vue-query';

export const queryPolicies = {
  dynamic: {
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: false,
    placeholderData: keepPreviousData,
  },
  reference: {
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  },
  analytics: {
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  },
} as const;

export type QueryPolicyName = keyof typeof queryPolicies;
