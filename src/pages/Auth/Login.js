import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useAuth from 'hooks/useAuth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, resetField } = useForm();
  const { login } = useAuth();

  useEffect(() => {
    const type = searchParams.get('type');
    const message = searchParams.get('message');

    if (type === 'accVerified') {
      toast.success(`Account verified. Please try to login using this email.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (type === 'accVerificationFailed') {
      toast.error(`${message}`, {
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

    searchParams.delete('message');
    searchParams.delete('type');
    setSearchParams(searchParams);
  }, [searchParams]);

  const submitForm = async (data) => {
    try {
      setLoading(true);
      console.log('data', data);
      await login(data);
    } catch (err) {
      console.log('err', err);
      toast.error(`Login Failed. ${err.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      resetField('password');
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <div className='flex-shrink-0'>
            <img
              className='mx-auto h-12 w-auto'
              src='/images/logoipsum.svg'
              alt='Rolex Barbershop Logo'
            />
          </div>
          <h2 className='my-6 text-center text-3xl font-bold tracking-tight'>
            Sign in to your account
          </h2>
        </div>
        <form
          className='mt-8 space-y-6'
          action='#'
          method='POST'
          onSubmit={handleSubmit(submitForm)}
        >
          <input type='hidden' name='remember' value='true' />
          <div>
            <div className='my-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <p className='mb-2 sm:text-sm'>Email address</p>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                {...register('email')}
                required
                disabled={loading}
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <p className='my-2 sm:text-sm'>Password</p>
              <input
                id='password'
                name='password'
                type='password'
                {...register('password')}
                autoComplete='current-password'
                required
                disabled={loading}
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500'
                placeholder='Password'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a
                href='/auth/forgot-password'
                className='font-medium text-teal-600 hover:text-teal-500'
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
            >
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                  className='h-5 w-5 text-teal-500 group-hover:text-teal-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              {!loading ? (
                'Sign In'
              ) : (
                <div
                  className='w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-teal-500 border-t-transparent'
                ></div>
              )}
            </button>
          </div>
        </form>

        <div className='flex justify-center container mx-auto mt-6 text-sm'>
          <div className='flex '>
            Don't have an account?
            <a
              href='/auth/register'
              className='font-medium text-teal-600 hover:text-teal-500 pl-1'
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
