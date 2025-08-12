// AuthStore.js
let authState = null;
let authDispatch = null;

export const setAuthStore = (state, dispatch) => {
  authState = state;
  authDispatch = dispatch;
};

export const getAuthState = () => authState;
export const getAuthDispatch = () => authDispatch;
