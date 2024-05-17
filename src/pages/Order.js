/* eslint-disable no-use-before-define */
import { useState } from 'react';

import Footer from 'components/Footer';
import Header from 'components/Header';

import useAuth from 'hooks/useAuth';

import { useDispatch, useSelector } from 'redux/store';

import { addSales } from 'redux/slices/sales';

const Order = () => {
  const [selectedService, setSelectedService] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedFreebie, setSelectedFreebie] = useState({});

  const [total, setTotal] = useState(0);
  // const [subTotal, setSubTotal] = useState(0);
  const [rewardedPoint, setRewardedPoint] = useState(0);
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNum] = useState();
  const [customerCarPlateNumber, setCustomerCarPlateNumber] = useState();

  const { customer } = useSelector((state) => state.customer);

  const dispatch = useDispatch();

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
      customer_name: customerName,
      customer_phone_no: customerPhoneNumber,
      customer_plate_no: customerCarPlateNumber
    };

    console.log('data', data);
    await dispatch(addSales(data));
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
                            value={customerPhoneNumber}
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
                        Save
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
