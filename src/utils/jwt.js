import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
import { toast } from 'react-toastify';

//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const verifyResetToken = (token) => {
  if (!token) return false;

  const tokenStatus = isValidToken(token);
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  // console.log('tokenStatus', tokenStatus);
  // console.log('decoded', decoded?.type);

  if (tokenStatus && decoded?.type === 'resetPassword') {
    // token valid and type resetPassword
    return true;
  } else {
    switch (true) {
      case decoded?.type !== 'resetPassword':
        toast.error(`Invalid reset password token`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;

      case decoded?.exp < currentTime:
        toast.error(`Reset password token expired. Please request again.`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;
    }
    return false;
  }
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  console.log('timeLeft', timeLeft);
  expiredTimer = window.setTimeout(() => {
    console.log('expired');
    // You can do what ever you want here, like show a notification
  }, timeLeft);
};

const setSession = (tokens) => {
  if (tokens) {
    if (tokens.access) {
      localStorage.setItem('accessToken', tokens.access.token);
      localStorage.setItem('refreshToken', tokens.refresh.token);
      axios.defaults.headers.common.Authorization = `Bearer ${tokens.access.token}`;

      // This function below will handle when token is expired
      const { exp } = jwtDecode(tokens.access.token);
      handleTokenExpired(exp);
    } else {
      localStorage.setItem('accessToken', tokens);
      axios.defaults.headers.common.Authorization = `Bearer ${tokens}`;

      // This function below will handle when token is expired
      const { exp } = jwtDecode(tokens);
      handleTokenExpired(exp);
    }
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, verifyResetToken, setSession, verify, sign };
