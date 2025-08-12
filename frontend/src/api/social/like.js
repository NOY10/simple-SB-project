import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { axiosService, fetcher } from '../../utils/axios';

const API_BASE = `${import.meta.env.VITE_API_SOCIAL_BASE_URL}/likes`;

const endpoints = {
  like: `${API_BASE}`,
  unlike: (postId) => `${API_BASE}/${postId}`,
  list: `${import.meta.env.VITE_API_SOCIAL_BASE_URL}/posts` // ✅ add list endpoint
};

// LIKE Post
export async function likePost(postId) {
  try {
    const payload = { postId }; // ✅ send as body
    const { data } = await axiosService.post(endpoints.like, payload);
    await mutate(endpoints.list); // refresh posts list
    return { success: true, data: data?.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to like post.'
    };
  }
}


export async function unlikePost(postId) {
  try {
    const { data } = await axiosService.delete(endpoints.unlike(postId));
    await mutate(endpoints.list);
    return { success: true, data: data?.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to unlike post.'
    };
  }
}
