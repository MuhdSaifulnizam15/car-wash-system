import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// hooks
import useAuth from 'hooks/useAuth';
// pages
import Login from 'pages/Auth/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
    console.log('isInitialized', isInitialized)
  }, [isAuthenticated, isInitialized]);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    if (!isInitialized) {
      return (
        <div className='h-screen flex items-center justify-center'>
          <div className='w-20 h-20 rounded-full animate-spin border-6 border-solid border-blue-500 border-t-transparent' />
        </div>
      );
    }
    return <Navigate to={'/auth/login'} replace />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
