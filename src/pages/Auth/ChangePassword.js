import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'redux/store';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Header from 'components/Header';

import useAuth from 'hooks/useAuth';

import { changePassword } from 'redux/slices/user';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { user } = useAuth();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);

  const handleEventChange = (event) => {
    switch (event.target.name) {
      case 'old_password':
        setOldPassword(event.target.value);
        break;

      case 'new_password':
        setNewPassword(event.target.value);
        break;

      case 'confirm_password':
        setConfirmPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
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
      } else if (oldPassword === confirmPassword) {
        // check for same old and new password
        toast.error(`New password and old new password cannot be the same`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        let passValid = true;
        // check for password requirement
        switch (true) {
          case !/\d/.test(newPassword) &&
            !/[a-zA-Z]/.test(newPassword) &&
            !/[*@!#%&()^~{}]+/.test(newPassword):
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

          case /\d/.test(newPassword) &&
            !/[a-zA-Z]/.test(newPassword) &&
            !/[*@!#%&()^~{}]+/.test(newPassword):
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

          case !/\d/.test(newPassword) &&
            /[a-zA-Z]/.test(newPassword) &&
            !/[*@!#%&()^~{}]+/.test(newPassword):
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

          case !/\d/.test(newPassword) &&
            !/[a-zA-Z]/.test(newPassword) &&
            /[*@!#%&()^~{}]+/.test(newPassword):
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

          case /\d/.test(newPassword) &&
            /[a-zA-Z]/.test(newPassword) &&
            !/[*@!#%&()^~{}]+/.test(newPassword):
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

          case !/\d/.test(newPassword) &&
            /[a-zA-Z]/.test(newPassword) &&
            /[*@!#%&()^~{}]+/.test(newPassword):
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

          case /\d/.test(newPassword) &&
            !/[a-zA-Z]/.test(newPassword) &&
            /[*@!#%&()^~{}]+/.test(newPassword):
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

          default:
            break;
        }

        // call api if password valid
        if (passValid) {
          const data = {
            userId: user?.id,
            oldPassword,
            newPassword,
          };
          await dispatch(changePassword(data));
        }
      }
    }
  };

  return (
    <div>
      <main>
        <Navbar current='Change Password' />
        <Header title='Change Password' />
        <div className='mx-auto max-w-7xl overflow-auto py-2 my-2 sm:px-6 lg:px-8'>
          <div className='px-4 py-2 my-2 sm:px-0 overflow-auto'>
            <div className='mt-0 overflow-auto'>
              <div className='mx-auto max-w-lg overflow-auto sm:px-6 lg:px-8 bg-white'>
                <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
                  <div className='relative px-6 py-2'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Old Password
                    </label>
                    <input
                      type={isOldPasswordVisible ? 'text' : 'password'}
                      name='old_password'
                      id='old_password'
                      className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm text-gray-700'
                      placeholder='Enter new password'
                      onChange={(e) => handleEventChange(e)}
                      value={oldPassword}
                    />
                    <button
                      className='absolute bottom-5 right-9'
                      onClick={() => {
                        setIsOldPasswordVisible((prevState) => !prevState);
                      }}
                    >
                      {isOldPasswordVisible ? (
                        <EyeSlashIcon className='h-5 w-5' color='gray' />
                      ) : (
                        <EyeIcon className='h-5 w-5' color='gray' />
                      )}
                    </button>
                  </div>

                  <div className='relative px-6 py-2 flex-auto'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      New Password
                    </label>
                    <input
                      type={isNewPasswordVisible ? 'text' : 'password'}
                      name='new_password'
                      id='new_password'
                      className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm text-gray-700'
                      placeholder='Enter new password'
                      onChange={(e) => handleEventChange(e)}
                      value={newPassword}
                    />
                    <button
                      className='absolute bottom-5 right-9'
                      onClick={() => {
                        setIsNewPasswordVisible((prevState) => !prevState);
                      }}
                    >
                      {isNewPasswordVisible ? (
                        <EyeSlashIcon className='h-5 w-5' color='gray' />
                      ) : (
                        <EyeIcon className='h-5 w-5' color='gray' />
                      )}
                    </button>
                  </div>

                  <div className='relative px-6 py-2'>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Confirm Password
                    </label>
                    <input
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      name='confirm_password'
                      id='confirm_password'
                      className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm text-gray-700'
                      placeholder='Enter confirm password'
                      onChange={(e) => handleEventChange(e)}
                      value={confirmPassword}
                    />
                    <button
                      className='absolute bottom-5 right-9'
                      onClick={() => {
                        setIsConfirmPasswordVisible((prevState) => !prevState);
                      }}
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeSlashIcon className='h-5 w-5' color='gray' />
                      ) : (
                        <EyeIcon className='h-5 w-5' color='gray' />
                      )}
                    </button>
                  </div>

                  <div className='text-right mx-6 my-4'>
                    <button
                      type='button'
                      onClick={submitForm}
                      className='justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-xs font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                    >
                      {!isLoading ? (
                        'Submit'
                      ) : (
                        <div className='w-5 h-5 rounded-full animate-spin border-2 border-solid border-teal-500 border-t-transparent' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default ChangePassword;
