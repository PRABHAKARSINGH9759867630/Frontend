/**
 * Custom hooks for fetching Strapi CMS data
 * Uses React Query for caching and state management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { strapiApi, StrapiResponse, StrapiEntity } from '@/lib/strapi';

// Query keys for React Query
export const strapiKeys = {
  all: ['strapi'] as const,
  collection: (collection: string) => [...strapiKeys.all, 'collection', collection] as const,
  item: (collection: string, id: string | number) => [...strapiKeys.collection(collection), id] as const,
};

// Hook to fetch a collection
export const useStrapiCollection = <T = StrapiEntity>(
  collectionName: string,
  params: {
    populate?: string;
    sort?: string;
    filters?: Record<string, any>;
    pagination?: {
      page?: number;
      pageSize?: number;
    };
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: [...strapiKeys.collection(collectionName), params],
    queryFn: () => strapiApi.getCollection<T>(collectionName, params),
    enabled: params.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook to fetch a single item by ID
export const useStrapiItem = <T = StrapiEntity>(
  collectionName: string,
  id: string | number | null,
  params: {
    populate?: string;
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: strapiKeys.item(collectionName, id || ''),
    queryFn: () => strapiApi.getById<T>(collectionName, id!),
    enabled: params.enabled !== false && id !== null,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

// Hook to create a new item
export const useCreateStrapiItem = <T = StrapiEntity>(collectionName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, any>) => strapiApi.create<T>(collectionName, data),
    onSuccess: () => {
      // Invalidate and refetch collection data
      queryClient.invalidateQueries({
        queryKey: strapiKeys.collection(collectionName),
      });
    },
  });
};

// Hook to update an item
export const useUpdateStrapiItem = <T = StrapiEntity>(collectionName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Record<string, any> }) =>
      strapiApi.update<T>(collectionName, id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific item and collection data
      queryClient.invalidateQueries({
        queryKey: strapiKeys.item(collectionName, variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: strapiKeys.collection(collectionName),
      });
    },
  });
};

// Hook to delete an item
export const useDeleteStrapiItem = <T = StrapiEntity>(collectionName: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => strapiApi.delete<T>(collectionName, id),
    onSuccess: () => {
      // Invalidate collection data
      queryClient.invalidateQueries({
        queryKey: strapiKeys.collection(collectionName),
      });
    },
  });
};

// Hook for paginated collections
export const useStrapiPaginatedCollection = <T = StrapiEntity>(
  collectionName: string,
  page: number = 1,
  pageSize: number = 10,
  params: {
    populate?: string;
    sort?: string;
    filters?: Record<string, any>;
    enabled?: boolean;
  } = {}
) => {
  return useStrapiCollection<T>(collectionName, {
    ...params,
    pagination: { page, pageSize },
  });
};

// Hook for featured/special collections (e.g., homepage content)
export const useStrapiFeatured = <T = StrapiEntity>(
  collectionName: string,
  featuredField: string = 'featured',
  params: {
    populate?: string;
    sort?: string;
    enabled?: boolean;
  } = {}
) => {
  return useStrapiCollection<T>(collectionName, {
    ...params,
    filters: { [featuredField]: true },
    pagination: { pageSize: 6 }, // Limit to 6 featured items
  });
};
