import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { axiosService, fetcher } from '../../utils/axios';

const API_BASE = `${import.meta.env.VITE_API_SOCIAL_BASE_URL}/comments`;

const endpoints = {
  list: `${API_BASE}/posts`,
  create: `${API_BASE}`,
  update: (id) => `${API_BASE}/${id}`,
  delete: (id) => `${API_BASE}/${id}`
};

export async function createComment(payload) {
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


