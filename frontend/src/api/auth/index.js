import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

import { LOGIN, LOGOUT } from '../../contexts/auth-reducer/actions';
import { getAuthDispatch } from '../../contexts/auth-reducer/store';
import { axiosService } from '../../utils/axios';
import { getFromStorage, removeFromStorage, saveToStorage } from '../../utils/secureLocalStorage';

import { decodeToken } from 'utils/jwt';

// const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
// const serviceBaseUrl = `${baseUrl}/${import.meta.env.VITE_API_USER_URL}` ?? '';
// const servicePrefix = `${serviceBaseUrl}/auth`;


const baseUrl = import.meta.env.VITE_API_USER_BASE_URL || '';
const servicePrefix = `${baseUrl}/auth`;


const config = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

export const login = async (username, password) => {
  const dispatch = getAuthDispatch();
  try {
    const { data } = await axios.post(`${servicePrefix}/login`, { username, password }, config);

    if (data?.statusCode === 200 && data?.data?.accessToken) {
      const token = { tokenDto: data.data };

      // Decode the token using your decodeToken function
      const decoded = decodeToken(data.data.accessToken);

      // Extract user info from decoded token payload
      const user = {
        username: decoded?.username || decoded?.sub, // fallback to sub if username missing
        userId: decoded?.userId || decoded?.id || null
      };

      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          token,
          user
        }
      });

      saveToStorage('token', token);
      saveToStorage('user', user);
      return token;
    }

    throw new Error(data?.message || 'Login failed. Something went wrong.');
  } catch (error) {
    const message = error?.response?.data?.message || 'Login failed. Something went wrong.';
    enqueueSnackbar(message, { variant: 'error' });
    throw new Error(message);
  }
};

export const refreshToken = async (refreshTokenValue) => {
  const dispatch = getAuthDispatch();
  const response = await axios.post(`${servicePrefix}/refresh-token`, { token: refreshTokenValue }, config);

  if (response?.status === 200) {
    const token = getFromStorage('token');
    token.tokenDto = response.data;

    // Decode the refreshed access token
    const decoded = decodeToken(response.data.accessToken);

    const user = {
      username: decoded?.username || decoded?.sub,
      userId: decoded?.userId || decoded?.id || null
    };

    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        token,
        user
      }
    });

    saveToStorage('token', token);
    saveToStorage('user', user);
  }

  return response;
};

export const logout = async (reason) => {
  const dispatch = getAuthDispatch();
  if (reason !== 'forced') {
    try {
      const { data } = await axiosService.post(`${servicePrefix}/logout`, {}, config);
      if (data?.statusCode === 200) {
        enqueueSnackbar('Logged out successfully.', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  dispatch({ type: LOGOUT });
  removeFromStorage('token');
  removeFromStorage('user');
};

export const register = async (email, password, firstName, lastName, username) => {
  try {
    const response = await axios.post(`${servicePrefix}/register`, {
      email,
      password,
      firstName,
      lastName,
      username,
      roles:["USER", "ADMIN"]
    }, config);

    if (response?.status === 201) {
      return response.data;
    }

    throw new Error(response?.data?.message || 'Registration failed. Something went wrong.');
  } catch (error) {
    const message = error?.response?.data?.message || 'Registration failed. Something went wrong.';
    throw new Error(message);
  }
}
