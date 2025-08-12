// action - state management
import { REGISTER, LOGIN, LOGOUT } from './actions';

// initial state
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  token: null,
  user: null
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user,token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
        token
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
        token: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
