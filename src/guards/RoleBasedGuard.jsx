import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node,
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const { user, isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
    console.log('isInitialized', isInitialized);
  }, [isAuthenticated, isInitialized]);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    if (!isInitialized) {
      return (
        <div className='h-screen flex items-center justify-center'>
          <div className='w-20 h-20 rounded-full animate-spin border-6 border-solid border-teal-500 border-t-transparent' />
        </div>
      );
    }
    return <Navigate to={'/auth/login'} replace />;
  }

  if (user && !accessibleRoles.includes(user?.role)) {
    // if (!accessibleRoles.includes(currentRole)) {
    return <Navigate to={'/403'} replace />;
  }

  return <>{children}</>;
}
