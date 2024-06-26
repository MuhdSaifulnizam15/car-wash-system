import { Suspense, lazy } from 'react';
import {
  Navigate,
  useRoutes,
  // useLocation
} from 'react-router-dom';

import GuestGuard from 'guards/GuestGuard';
import AuthGuard from 'guards/AuthGuard';
import RoleBasedGuard from 'guards/RoleBasedGuard';

import { PATH_PAGE } from 'router/routes';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { pathname } = useLocation();
  // const isDashboard = pathname.includes('/admin');

  return (
    <Suspense
      fallback={
        <div className='h-screen flex items-center justify-center'>
          <div className='w-20 h-20 rounded-full animate-spin border-6 border-solid border-teal-500 border-t-transparent' />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: 'reset-password',
          element: (
            <GuestGuard>
              <ResetPassword />{' '}
            </GuestGuard>
          ),
        },
        {
          path: 'forgot-password',
          element: (
            <GuestGuard>
              <ForgotPassword />
            </GuestGuard>
          ),
        },
        {
          path: 'change-password',
          element: (
            <AuthGuard>
              <ChangePassword />
            </AuthGuard>
          ),
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'admin',
      // element: <RoleBasedGuard />,
      children: [
        { element: <Navigate to={PATH_PAGE.sales} replace /> },
        // { path: "dashboard", element: <Dashboard /> },
        // {
        //   path: 'user',
        //   element: (
        //     <AuthGuard>
        //       <Users />
        //     </AuthGuard>
        //   ),
        // },
        {
          path: 'category',
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'manager']}>
              <Categories />
            </RoleBasedGuard>
          ),
        },
        {
          path: 'services',
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'manager']}>
              <Services />
            </RoleBasedGuard>
          ),
        },
        {
          path: 'branch',
          element: (
            <RoleBasedGuard accessibleRoles={['admin']}>
              <Branch />
            </RoleBasedGuard>
          ),
        },
        {
          path: 'staff',
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'manager']}>
              <Staff />
            </RoleBasedGuard>
          ),
        },
        {
          path: 'customer',
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'manager']}>
              <Customer />
            </RoleBasedGuard>
          ),
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      // element: <LogoOnlyLayout />,
      children: [
        // { path: 'coming-soon', element: <ComingSoon /> },
        // { path: 'maintenance', element: <Maintenance /> },
        // { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '403', element: <Forbidden /> },
        {
          path: 'registration',
          element: (
            <Order />
          ),
        },
        { path: '*', element: <Navigate to='/404' replace /> },
      ],
    },
    {
      path: '/',
      // element: <AuthGuard />,
      children: [
        // { element: <Navigate to={PATH_PAGE.sales} replace /> },
        {
          path: 'history',
          element: (
            <AuthGuard>
              <History />
            </AuthGuard>
          ),
        },
        {
          path: 'profile',
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          ),
        },
        {
          path: 'sales',
          element: (
            <AuthGuard>
              <Sales />
            </AuthGuard>
          ),
        },
        {
          path: 'transactions',
          element: (
            <RoleBasedGuard accessibleRoles={['admin', 'manager']}>
              <Transaction />
            </RoleBasedGuard>
          ),
        },
        { path: '/', element: <Navigate to='/sales' replace /> },
      ],
    },
    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}

// IMPORT PAGES

// Authentication
const Login = Loadable(lazy(() => import('pages/Auth/Login')));
const Register = Loadable(lazy(() => import('pages/Auth/Register')));
const ResetPassword = Loadable(lazy(() => import('pages/Auth/ResetPassword')));
const ForgotPassword = Loadable(
  lazy(() => import('pages/Auth/ForgotPassword'))
);
const ChangePassword = Loadable(
  lazy(() => import('pages/Auth/ChangePassword'))
);

// Main
const History = Loadable(lazy(() => import('pages/History')));
const Profile = Loadable(lazy(() => import('pages/Profile')));
const Sales = Loadable(lazy(() => import('pages/Sales')));
const Transaction = Loadable(lazy(() => import('pages/Transaction')));
const Order = Loadable(lazy(() => import('pages/Order')));

// Admin
// const Dashboard = Loadable(lazy(() => import('pages/Admin/Dashboard')));
// const Users = Loadable(lazy(() => import('pages/Admin/User')));
const Categories = Loadable(lazy(() => import('pages/Admin/Category')));
const Services = Loadable(lazy(() => import('pages/Admin/Service')));
const Branch = Loadable(lazy(() => import('pages/Admin/Branch')));
const Staff = Loadable(lazy(() => import('pages/Admin/Staff')));
const Customer = Loadable(lazy(() => import('pages/Admin/Customer')));

// Main
// const ComingSoon = Loadable(lazy(() => import('pages/ComingSoon')));
const NotFound = Loadable(lazy(() => import('pages/404')));
const Forbidden = Loadable(lazy(() => import('pages/403')));
// const Maintenance = Loadable(lazy(() => import('pages/Maintenance')));
// const Page500 = Loadable(lazy(() => import('pages/Page500')));
