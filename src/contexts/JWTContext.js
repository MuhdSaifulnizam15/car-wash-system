import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  staff: null,
  token: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, staff } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      staff,
    };
  },
  LOGIN: (state, action) => {
    const { user, staff } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      staff,
    };
  },
  REFRESH: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    staff: null,
  }),
  REGISTER: (state, action) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      staff: null,
    };
  },
  FORGOT_PASSWORD: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user: null,
      staff: null,
    };
  },
  RESET_PASSWORD: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user: null,
      staff: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
  registerUser: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const refreshToken = window.localStorage.getItem('refreshToken');
        console.log('accessToken', accessToken, refreshToken);
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/auth/profile');
          console.log('getUserProfile response:', response);
          const { user, staff } = response.data;

          setTimeout(
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user,
                staff,
              },
            }),
            3000
          );
        } else if (refreshToken && isValidToken(refreshToken)) {
          // check if refreshToken exists, call refreshToken api
          const response = await axios.post('/auth/refresh-tokens', {
            refreshToken,
          });
          console.log('response refreshToken:', response);

          setSession(response.data);

          const userProfileResponse = await axios.get('/auth/profile');
          console.log('response getuserProfile:', userProfileResponse);

          const { user, staff } = userProfileResponse.data;

          await dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              staff,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
              staff: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            staff: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async ({ email, password }) => {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });
    console.log('response login:', response);

    const { tokens, user, staff } = response.data;

    setSession(tokens);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        staff,
      },
    });

    if (tokens && user) {
      toast.success('Login Success', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const refresh = async (refreshToken) => {
    const response = await axios.post('/auth/refresh-tokens', {
      refreshToken,
    });
    console.log('response refreshToken:', response);

    const userProfileResponse = await axios.get('/auth/profile');
    console.log('response getuserProfile:', userProfileResponse);

    const { user } = userProfileResponse;

    setSession(response);
    dispatch({
      type: 'REFRESH',
      payload: {
        user,
      },
    });
  };

  const registerUser = async ({ email, password, first_name, last_name }) => {
    const response = await axios.post('/auth/register', {
      email,
      password,
      first_name,
      last_name,
    });
    console.log('res registerUser', response.data);

    dispatch({
      type: 'REGISTER',
    });

    return response.data;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });

    toast.success('Logout Success', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const resetPassword = async (email) => {
    console.log('reset Password', email);
    dispatch({ type: 'RESET_PASSWORD' });
  };

  const forgotPassword = async (email) => {
    console.log('forgot Password', email);
    dispatch({ type: 'FORGOT_PASSWORD' });
  };

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        registerUser,
        resetPassword,
        forgotPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
