import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { PATH_AUTH } from 'router/routes';

import { forgotPassword } from 'redux/slices/user';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, resetField } = useForm();

  const submitForm = async (data) => {
    console.log('submitForm', data);
    setIsLoading(true);
    try {
      if (data?.email_address) {
        const formattedData = {
          email: data?.email_address,
        };

        const res = await dispatch(forgotPassword(formattedData));
        setIsLoading(false);
        console.log('res', res);
        if (res?.status) navigate(PATH_AUTH.login);
      }
    } catch (err) {
      console.log('err', err);
      toast.error(`Reset password failed. ${err.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      resetField('email_address');
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='/images/logoipsum.svg'
            alt='Your Company'
          />
          <h2 className='my-6 text-center text-3xl font-bold tracking-tight'>
            Forgot Password?
          </h2>

          <div className='flex justify-center container mx-auto mt-6 text-sm'>
            <div className='flex '>
              Remember your password?
              <a
                href='/auth/login'
                className='font-medium text-teal-600 hover:text-teal-500 pl-1'
              >
                Login Here
              </a>
            </div>
          </div>
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
                id='email_address'
                name='email_address'
                type='email'
                {...register('email_address')}
                autoComplete='email'
                required
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500'
                placeholder='Email address'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
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

              {!isLoading ? (
                'Reset Password'
              ) : (
                <div
                  className='w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-teal-500 border-t-transparent'
                ></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
