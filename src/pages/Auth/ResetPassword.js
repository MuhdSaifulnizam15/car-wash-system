import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

import useAuth from 'hooks/useAuth';
import { PATH_AUTH } from 'router/routes';

import { resetPassword } from 'redux/slices/user';

import { verifyResetToken } from '../../utils/jwt';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, resetField } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(async () => {
    // check for valid reset tokens
    console.log('token', searchParams.get('token'));
    const validToken = await verifyResetToken(searchParams.get('token'));
    console.log('validToken', validToken);
    // if token invalid, redirect to login
    if (!validToken) navigate(PATH_AUTH.login);
  }, []);

  const submitForm = async (data) => {
    console.log('submitForm', data);
    try {
      if (data.new_password && data.confirm_password) {
        setIsLoading(true);

        // password rules verification
        if (data.new_password !== data.confirm_password) {
          toast.error(`New password and confirm new password mismatch`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          resetInputField();
        } else {
          let passValid = true;

          // check for password requirement
          switch (true) {
            case !/\d/.test(data.new_password) &&
              !/[a-zA-Z]/.test(data.new_password) &&
              !/[*@!#%&()^~{}]+/.test(data.new_password):
              toast.error(
                `New password must contain at least one letter, one special characters and one number`,
                {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                }
              );
              passValid = false;
              break;

            case /\d/.test(data.new_password) &&
              !/[a-zA-Z]/.test(data.new_password) &&
              !/[*@!#%&()^~{}]+/.test(data.new_password):
              toast.error(
                `Password must contain at least one letter and one special characters`,
                {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                }
              );
              passValid = false;
              break;

            case !/\d/.test(data.new_password) &&
              /[a-zA-Z]/.test(data.new_password) &&
              !/[*@!#%&()^~{}]+/.test(data.new_password):
              toast.error(
                `Password must contain at least one number and one special characters`,
                {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                }
              );
              passValid = false;
              break;

            case !/\d/.test(data.new_password) &&
              !/[a-zA-Z]/.test(data.new_password) &&
              /[*@!#%&()^~{}]+/.test(data.new_password):
              toast.error(
                `Password must contain at least one letter and one number`,
                {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                }
              );
              passValid = false;
              break;

            case /\d/.test(data.new_password) &&
              /[a-zA-Z]/.test(data.new_password) &&
              !/[*@!#%&()^~{}]+/.test(data.new_password):
              toast.error(
                `Password must contain at least one special characters`,
                {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                }
              );
              passValid = false;
              break;

            case !/\d/.test(data.new_password) &&
              /[a-zA-Z]/.test(data.new_password) &&
              /[*@!#%&()^~{}]+/.test(data.new_password):
              toast.error(`Password must contain at least one number`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
              passValid = false;
              break;

            case /\d/.test(data.new_password) &&
              !/[a-zA-Z]/.test(data.new_password) &&
              /[*@!#%&()^~{}]+/.test(data.new_password):
              toast.error(`Password must contain at least one letter`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
              passValid = false;
              break;
          }

          // call api if password valid
          if (passValid) {
            const formattedData = {
              token: searchParams.get('token'),
              password: data.confirm_password,
            };
            console.log('formattedData', formattedData);
            await dispatch(resetPassword(formattedData));
          } else resetInputField();
        }
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
      resetInputField();
    }
  };

  const resetInputField = () => {
    resetField('new_password');
    resetField('confirm_password');
    setIsLoading(false);
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
            Reset Password
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
            <div className='relative my-4'>
              <label htmlFor='new-password' className='sr-only'>
                New Password
              </label>
              <p className='mb-2 sm:text-sm'>New Password</p>
              <input
                id='new_password'
                name='new_password'
                type={isNewPasswordVisible ? 'text' : 'password'}
                {...register('new_password')}
                required
                className='relative block w-full appearance-none rounded-md border border-gray-300 pl-3 pr-8 py-2 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500'
                placeholder='New Password'
              />
              <button
                className='absolute bottom-2 right-2 z-10'
                type='button'
                onClick={() => {
                  setIsNewPasswordVisible((prevState) => !prevState);
                }}
              >
                {isNewPasswordVisible ? (
                  <EyeSlashIcon className='h-5 w-5' />
                ) : (
                  <EyeIcon className='h-5 w-5' />
                )}
              </button>
            </div>
            <div className='relative'>
              <label htmlFor='confirm_password' className='sr-only'>
                Confirm New Password
              </label>
              <p className='my-2 sm:text-sm'>Confirm New Password</p>
              <input
                id='confirm_password'
                name='confirm_password'
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                {...register('confirm_password')}
                required
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500'
                placeholder='Confirm New Password'
              />
              <button
                className='absolute bottom-2 right-2 z-10'
                type='button'
                onClick={() => {
                  setIsConfirmPasswordVisible((prevState) => !prevState);
                }}
              >
                {isConfirmPasswordVisible ? (
                  <EyeSlashIcon className='h-5 w-5' />
                ) : (
                  <EyeIcon className='h-5 w-5' />
                )}
              </button>
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
                'Submit'
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

export default ResetPassword;
