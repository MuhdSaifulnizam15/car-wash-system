import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import useAuth from 'hooks/useAuth';

import { classNames } from 'utils/helper';
import { PATH_PAGE, PATH_ADMIN, PATH_AUTH } from 'router/routes';

const userNavigation = [
  { name: 'Your Profile', href: PATH_PAGE.profile },
  { name: 'Change Password', href: PATH_AUTH.changePassword },
  // { name: "Settings", href: "/settings" },
];

const navigation = [
  { name: 'Sales', href: '/sales', current: true, isAdmin: false, isManager: false, },
  {
    name: 'Transactions',
    href: PATH_PAGE.transaction,
    current: false,
    isAdmin: true,
    isManager: true,
  },
  // { name: "History", href: "/history", current: false, isAdmin: false },
  // {
  //   name: "Dashboard",
  //   href: "/admin/dashboard",
  //   current: false,
  //   isAdmin: true,
  // },
  // {
  //   name: "Users",
  //   href: PATH_ADMIN.user?.root,
  //   current: false,
  //   isAdmin: true,
  // },
  {
    name: 'Branch',
    href: PATH_ADMIN.branch.root,
    current: false,
    isAdmin: true,
    isManager: false,
  },
  {
    name: 'Categories',
    href: PATH_ADMIN.category.root,
    current: false,
    isAdmin: true,
    isManager: true,
  },
  {
    name: 'Services',
    href: PATH_ADMIN.service.root,
    current: false,
    isAdmin: true,
    isManager: true,
  },
  {
    name: 'Staff',
    href: PATH_ADMIN.staff.root,
    current: false,
    isAdmin: true,
    isManager: true,
  },
  {
    name: 'Customer',
    href: PATH_ADMIN.customer.root,
    current: false,
    isAdmin: true,
    isManager: true,
  },
];

const Navbar = ({ current = 'Sales' }) => {
  const { logout, user } = useAuth();

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8'
                    src='/images/logoipsum.svg'
                    alt='Rolex Barbershop Logo'
                  />
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {navigation.map((item) =>
                      item.isAdmin ? (
                        (user?.role == 'admin' || (item?.isManager && user?.role == 'manager')) && (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.name === current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium disabled'
                            )}
                            aria-current={
                              item.name === current ? 'page' : undefined
                            }
                            onClick={(e) => {
                              if (item.name === current) e.preventDefault();
                            }}
                          >
                            {item.name}
                          </a>
                        )
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.name === current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={
                            item.name === current ? 'page' : undefined
                          }
                          onClick={(e) => {
                            if (item.name === current) e.preventDefault();
                          }}
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>Open user menu</span>
                        {user?.imageUrl ? (
                          <img
                            className='h-8 w-8 rounded-full'
                            src={user?.imageUrl}
                            alt=''
                          />
                        ) : (
                          <div className='relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                            <span className='font-medium text-gray-600 dark:text-gray-300'>
                              {(user?.first_name + ' ' + user?.last_name)
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .substring(0, 2)}
                            </span>
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item key={'logout'}>
                          {({ active }) => (
                            <button
                              onClick={() => logout()}
                              type='button'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full px-4 py-2 text-sm text-gray-700 text-left'
                              )}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
              {navigation.map((item) =>
                item.isAdmin ? (
                  (user?.role == 'admin' || (item?.isManager && user?.role == 'manager')) && (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.name === current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.name === current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  )
                ) : (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.name === current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.name === current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                )
              )}
            </div>
            <div className='border-t border-gray-700 pt-4 pb-3'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  {user?.imageUrl ? (
                    <img
                      className='h-10 w-10 rounded-full'
                      src={user?.imageUrl}
                      alt=''
                    />
                  ) : (
                    <div className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                      <span className='font-medium text-gray-600 dark:text-gray-300'>
                        {(user?.first_name + ' ' + user?.last_name)
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium leading-none text-white'>
                    {user?.first_name + ' ' + user?.last_name}
                  </div>
                  <div className='text-sm font-medium leading-none text-gray-400'>
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className='mt-3 space-y-1 px-2'>
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <button
                  onClick={() => logout()}
                  type='button'
                  className='block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                >
                  Sign Out
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
