/* eslint-disable no-use-before-define */
import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';

import Footer from 'components/Footer';
import Header from 'components/Header';

import { useDispatch } from 'redux/store';

import { classNames } from 'utils/helper';

import { getAllBranch } from 'redux/slices/branch';
import { addBooking } from 'redux/slices/booking';

const Order = () => {
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNum] = useState();
  const [customerCarPlateNumber, setCustomerCarPlateNumber] = useState();
  const [selectedBranch, setSelectedBranch] = useState();

  const { branch } = useSelector((state) => state.branch);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(getAllBranch({ limit: 50 }));
    }
    fetchData();
  }, [dispatch]);

  const handleEventChange = (event) => {
    switch (event.target.name) {
      case 'customer_phone_no':
        const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
        if (validated) setCustomerPhoneNum(event.target.value);
        break;

      case 'customer_name':
        setCustomerName(event.target.value);
        break;

      case 'customer_plate_number':
        setCustomerCarPlateNumber(event.target.value);
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    // console.log('resetForm');
    setCustomerName('');
    setCustomerPhoneNum('');
    setCustomerCarPlateNumber('');
  };

  const submitForm = async (event) => {
    event.preventDefault();

    let data = {
      name: customerName,
      phone_no: customerPhoneNumber,
      car_plate: customerCarPlateNumber,
      branch_id: selectedBranch.id,
    };

    console.log('data', data);
    await dispatch(addBooking(data));
    resetForm();
  };

  return (
    <div>
      <main>
        <Header title='Register Car' />
        <div className='mx-auto max-w-7xl overflow-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0 overflow-auto'>
            <div className='mt-2 sm:mt-0 overflow-auto'>
              <div className='md:grid md:gap-6'>
                <form action='#' method='POST' onSubmit={submitForm}>
                  <div className='overflow-hidden shadow sm:rounded-md'>
                    <div className='bg-white px-4 py-1 sm:p-6'>
                      <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-3'>
                          <Listbox
                            value={selectedBranch}
                            onChange={setSelectedBranch}
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Label className='block text-sm font-medium text-gray-700'>
                                  Branch
                                </Listbox.Label>
                                <div className='relative mt-1'>
                                  <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'>
                                    <span className='flex items-center'>
                                      <span
                                        className='ml-3 block truncate text-gray-700'
                                        style={
                                          selectedBranch?.name
                                            ? { color: 'black' }
                                            : { color: 'red' }
                                        }
                                      >
                                        {selectedBranch?.name
                                          ? selectedBranch?.name
                                          : 'Select Branch'}
                                      </span>
                                    </span>
                                    <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                                      <ChevronUpDownIcon
                                        className='h-5 w-5 text-gray-400'
                                        aria-hidden='true'
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave='transition ease-in duration-100'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                  >
                                    <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                      {branch.docs &&
                                        branch.docs.map((item) => (
                                          <Listbox.Option
                                            key={item.id}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? 'text-white bg-blue-600'
                                                  : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                              )
                                            }
                                            value={item}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className='flex items-center'>
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? 'font-semibold'
                                                        : 'font-normal',
                                                      'ml-3 block truncate'
                                                    )}
                                                  >
                                                    {item.name}
                                                  </span>
                                                </div>

                                                {selected ? (
                                                  <span
                                                    className={classNames(
                                                      active
                                                        ? 'text-white'
                                                        : 'text-blue-600',
                                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                  >
                                                    <CheckIcon
                                                      className='h-5 w-5'
                                                      aria-hidden='true'
                                                    />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        </div>

                        <div className='col-span-6 sm:col-span-4'>
                          <label
                            htmlFor='price'
                            className='block text-sm font-medium text-gray-700 mb-2'
                          >
                            Customer Name
                          </label>
                          <input
                            type='text'
                            name='customer_name'
                            id='customer_name'
                            className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-gray-700'
                            placeholder='Enter Customer Name'
                            onChange={handleEventChange}
                            value={customerName}
                          />
                        </div>

                        <div className='col-span-6 sm:col-span-4'>
                          <label
                            htmlFor='price'
                            className='block text-sm font-medium text-gray-700 mb-2'
                          >
                            Customer Phone Number
                          </label>
                          <input
                            type='text'
                            name='customer_phone_no'
                            id='customer_phone_no'
                            className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-gray-700'
                            placeholder='Enter Customer Phone Number'
                            onChange={handleEventChange}
                            value={customerPhoneNumber}
                          />
                        </div>

                        <div className='col-span-6 sm:col-span-4'>
                          <label
                            htmlFor='price'
                            className='block text-sm font-medium text-gray-700 mb-2'
                          >
                            Customer Car Plate Number
                          </label>
                          <input
                            type='text'
                            name='customer_plate_number'
                            id='customer_plate_number'
                            className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-gray-700'
                            placeholder='Enter Customer Plate Number'
                            onChange={handleEventChange}
                            value={customerCarPlateNumber}
                          />
                        </div>

                      </div>
                    </div>
                    <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                      <button
                        type='button'
                        onClick={() => resetForm()}
                        className='justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 mx-6 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
                      >
                        Reset
                      </button>
                      <button
                        type='submit'
                        className='justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Order;
