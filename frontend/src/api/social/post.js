import { useState, useMemo, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import { axiosService, fetcher } from '../../utils/axios';

const API_BASE = `${import.meta.env.VITE_API_SOCIAL_BASE_URL}/post`;

const endpoints = {
  list: `${API_BASE}/posts`,
  create: `${API_BASE}/create`,
  update: (id) => `${API_BASE}/${id}`,
  delete: (id) => `${API_BASE}/${id}`,
};

// Hook for paginated posts
export function usePosts(page = 0, size = 5) {
  const url = `${endpoints.list}?page=${page}&size=${size}`;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],         // Assuming response shape { success, data: [...] }
      total: data?.total || 0,         // If backend returns total count
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && (!data?.data || data.data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// CREATE POST
export async function createPost(payload) {
  try {
    const { data } = await axiosService.post(endpoints.create, payload);
    await mutate(`${endpoints.list}?page=0&size=5`); // refresh first page
    return { success: true, message: data?.message || 'Created successfully!', data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create.',
    };
  }
}
// Hook for paginated comments
export function useComments(postId, page = 0, size = 5) {
  // Use null as key to skip fetch when postId is falsy
  const url = postId
    ? `${API_BASE}/posts/${postId}/comments?page=${page}&size=${size}`
    : null;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Memoize to avoid unnecessary renders
  const memoizedValue = useMemo(
    () => ({
      comments: data?.data || [],
      total: data?.total || 0,
      loading: !!postId && isLoading,
      error,
      validating: isValidating,
      empty: !!postId && !isLoading && (!data?.data || data.data.length === 0),
    }),
    [data, error, isLoading, isValidating, postId]
  );

  return memoizedValue;
}
