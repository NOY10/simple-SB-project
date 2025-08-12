import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { axiosService, fetcher } from '../../utils/axios';

const API_BASE = `${import.meta.env.VITE_API_USER_URL}/users`;

const endpoints = {
  list: `${API_BASE}`,
  // To Do - change endpoint to user
  create: `${import.meta.env.VITE_API_USER_URL}/auth/register`,
  update: (id) => `${API_BASE}/${id}/user`,
  delete: (id) => `${API_BASE}/${id}`
};

// GET Users List
export function useGetUsers() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      // To Do - send data directly instead of nesting
      users: data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// CREATE User
export async function createUser(payload) {
  try {
    const { data } = await axiosService.post(endpoints.create, payload);
    await mutate(endpoints.list); // refresh list
    return { success: true, message: data?.message || 'Created successfully!', data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create.'
    };
  }
}

// UPDATE User
export async function updateUser(id, payload) {
  try {
    const { data } = await axiosService.put(endpoints.update(id), payload);
    await mutate(endpoints.list); // refresh list
    return { success: true, message: data?.message || 'Updated successfully!' };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update.'
    };
  }
}

// DELETE User
export async function deleteUser(id) {
  try {
    const { data } = await axiosService.delete(endpoints.delete(id));
    await mutate(endpoints.list); // refresh list
    return { success: true, message: data?.message || 'Deleted successfully!' };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete.'
    };
  }
}
