import PropTypes from 'prop-types';
// hooks
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const { user } = useAuth();

    if (user && !accessibleRoles.includes(user.role)) {
    // if (!accessibleRoles.includes(currentRole)) {
        return (
        <div>
            <h1>Permission Denied</h1>
            <h2 severity="error">
            You do not have permission to access this page
            </h2>
        </div>
        );
    }

    return <>{children}</>;
}
