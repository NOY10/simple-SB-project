import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

import { logout, refreshToken } from '../api/auth';
import { getFromStorage } from './secureLocalStorage';

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const token = getFromStorage(`token`);

    if (!token?.tokenDto?.accessToken) {
      window.location.href = '/login';
      return Promise.reject(new Error('No access token — redirecting to login.'));
    }

    // eslint-disable-next-line no-undef
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    config.headers.Authorization = `Bearer ${token.tokenDto.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = getFromStorage(`token`);

    if (error?.response?.status === 401) {
      window.alert('You have been automatically logged out for security reasons. Please login again!');
      logout('forced');
    }

    if (error?.response?.status === 422) {
      try {
        const response = await refreshToken(token?.tokenDto?.refreshToken);
        if (response?.status === 200) window.location.reload();
      } catch (err) {
        if (err.response.status === 404 || err.response.status === 401) {
          window.alert('Your session has expired!');
          logout('forced');
        }
      }
    }
    return Promise.reject(error || 'Wrong Services');
  }
);

export default axiosServices;

const fetcher = async (url, config = {}) => {
  const res = await axiosServices.get(url, config);
  return res.data;
};

const fetcherPost = async (url, payload = {}, config = {}) => {
  const res = await axiosServices.post(url, payload, config);
  return res.data;
};

export { axiosServices as axiosService, fetcher, fetcherPost };
