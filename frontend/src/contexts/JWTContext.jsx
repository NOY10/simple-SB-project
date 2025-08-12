import React, { createContext, useEffect, useReducer } from 'react';
// third-party
import { Chance } from 'chance';

import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project imports
import Loader from 'components/Loader';
import axiosService from 'utils/axios';
import { setAuthStore } from './auth-reducer/store';

// auth service imports
import { login as authLogin, logout as authLogout, refreshToken as authRefreshToken } from 'api/auth';
import { getFromStorage, removeFromStorage } from '../utils/secureLocalStorage';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  token: null,
  user: null,
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    setAuthStore(state, dispatch);
  }, [state]);

   useEffect(() => {
    // On init: read token and user info from storage
    const token = getFromStorage('token');
    const user = getFromStorage('user'); // { username, userId }

    if (token && user) {
      dispatch({
        type: LOGIN,
        payload: { isLoggedIn: true, token, user }
      });
    } else {
      dispatch({ type: LOGOUT });
      removeFromStorage('token');
      removeFromStorage('user');
    }
  }, []);

  // // Update storage whenever token or user changes
  // useEffect(() => {
  //   if (state.token && state.user) {
  //     setToStorage('token', state.token);
  //     setToStorage('user', state.user);
  //   } else {
  //     removeFromStorage('token');
  //     removeFromStorage('user');
  //   }
  // }, [state.token, state.user]);


  const login = async (email, password) => authLogin(email, password);

  const refreshToken = async (refreshToken) => authRefreshToken(refreshToken);

  const logout = () => authLogout();

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axiosService.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('token') !== undefined && window.localStorage.getItem('token') !== null) {
      const localUsers = window.localStorage.getItem('token');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('token', JSON.stringify(token));
  };

  const resetPassword = async (email) => {
    console.log('email - ', email);
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext value={{ ...state, login, refreshToken, logout, register, resetPassword, updateProfile }}>{children}</JWTContext>;
};

export default JWTContext;
