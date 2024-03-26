/* eslint-disable no-use-before-define */
import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Header from 'components/Header';

import freebieData from 'data/freebies';

import { classNames } from 'utils/helper';

import useAuth from 'hooks/useAuth';

import { useDispatch, useSelector } from 'redux/store';

import { getAllBranch } from 'redux/slices/branch';
import { getAllStaff } from 'redux/slices/staff';
import { getAllServices } from 'redux/slices/services';
import { getCustomerByPhoneNo } from 'redux/slices/customer';
import { addSales } from 'redux/slices/sales';

const Sales = () => {
  const [selectedService, setSelectedService] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedFreebie, setSelectedFreebie] = useState({});
  const [isSelectedBranchDisabled, setIsSelectedBranchDisabled] =
    useState(false);
  const [isSelectedStaffDisabled, setIsSelectedStaffDisabled] = useState(true);

  const [total, setTotal] = useState(0);
  // const [subTotal, setSubTotal] = useState(0);
  const [rewardedPoint, setRewardedPoint] = useState(0);
  const [redeemedPoint, setRedeemedPoint] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  // const [discount, setDiscount] = useState(0);
  const [showRedeemPointField, setShowRedeemPointField] = useState(false);
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNum] = useState();

  const { branch } = useSelector((state) => state.branch);
  const { staff } = useSelector((state) => state.staff);
  const { services } = useSelector((state) => state.services);
  const { customer } = useSelector((state) => state.customer);

  const dispatch = useDispatch();

  const { user, staff: staff_info } = useAuth();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    console.log('user', user);
    if (user && user?.role !== 'admin') {
      // disabled branch selection (allow only on the respective branch)
      // setIsSelectedBranchDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      dispatch(
        getAllStaff({ 
          limit: 50, 
          // branch: staff_info?.branch_id?.id 
        })
      );
      // ...
    }
    
    if (staff_info) {
      if (user?.role === 'staff') setSelectedStaff(staff_info);
      setSelectedBranch(staff_info?.branch_id);
    }
    fetchData();
  }, [dispatch, staff_info, user?.role]);

  useEffect(async () => {
    // if (
    //   selectedBranch &&
    //   selectedBranch.hasOwnProperty('name') &&
    //   user?.role !== 'staff'
    // ) {
      setIsSelectedStaffDisabled(false);
      setSelectedStaff({});
      await dispatch(getAllStaff({ 
        limit: 50, 
        // branch: selectedBranch?.id 
      }));
    // } else {
    //   setIsSelectedStaffDisabled(true);
    // }
  }, [selectedBranch]);

  useEffect(() => {
    // const newTotal = selectedService
    //   .reduce((a, v) => (a = a + v.price * (v.quantity || 1)), 0)
    //   .toFixed(2);
    // setTotal(newTotal);
    // const afterDiscount = newTotal - discount;
    // setSubTotal(afterDiscount);
    // setRewardedPoint(Math.ceil(afterDiscount));

    const total = selectedService
      .reduce((a, v) => (a = a + v.price * (v.quantity || 1)), 0)
      .toFixed(2);
    setTotal(total);
    setRewardedPoint(Math.ceil(total));
  }, [selectedService]);

  useEffect(() => {
    if (totalPoints > 0) {
      setShowRedeemPointField(true);
    } else {
      setShowRedeemPointField(false);
      setRedeemedPoint(0);
    }
  }, [totalPoints]);

  useEffect(() => {
    if (
      customerPhoneNumber &&
      customerPhoneNumber.length > 9 &&
      customerPhoneNumber.length < 12
    ) {
      checkForTotalPoints();
    } else {
      setTotalPoints(0);
      setCustomerName('');
      setSelectedFreebie({});
    }
  }, [customerPhoneNumber]);

  useEffect(() => {
    async function fetchData() {
      dispatch(getAllBranch({ limit: 50 }));
      dispatch(getAllServices({ limit: 50 }));
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // console.log('customer', customer);
    if (customer) {
      setTotalPoints(customer?.total_membership_point);
      setCustomerName(customer?.name);
      setSelectedCustomer(customer);
    } else {
      setTotalPoints(0);
      setCustomerName('');
      setSelectedCustomer({});
      setSelectedFreebie({});
    }
  }, [customer]);

  // useEffect(() => {
  //   setDiscount(redeemedPoint / 10);
  //   const newSubTotal = total - redeemedPoint / 10;
  //   setSubTotal(newSubTotal);
  //   setRewardedPoint(newSubTotal);
  // }, [redeemedPoint]);

  const incrementQuantity = (service, index) => {
    console.log(
      'service',
      index,
      selectedService,
      (selectedService[index]?.quantity || 1) + 1,
      service
    );
    updateServiceList(index, (selectedService[index]?.quantity || 1) + 1);
  };

  const decrementQuantity = (service, index) => {
    console.log('service', index, selectedService[index]?.quantity > 1);
    if (selectedService[index]?.quantity > 1)
      updateServiceList(
        index,
        (selectedService[index]?.quantity || 1) - 1 || 0
      );
  };

  const updateServiceList = (index, val) => {
    const newServices = selectedService.map((serv, itemVal) => {
      if (itemVal === index) {
        return { ...serv, quantity: val };
      } else {
        return serv;
      }
    });
    console.log('newSer', newServices);
    setSelectedService(newServices);
  };

  const removeServiceFromList = (index) => {
    // selectedService.splice(index, 1)
    // console.log("newSer", selectedService);
    setSelectedService(
      selectedService.filter((item, itemVal) => itemVal !== index)
    );
  };

  const removeFreebies = () => {
    setSelectedFreebie({});
  };

  const checkForTotalPoints = () => {
    dispatch(getCustomerByPhoneNo(customerPhoneNumber));
  };

  const handleEventChange = (event) => {
    switch (event.target.name) {
      case 'customer_phone_no':
        const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
        if (validated) setCustomerPhoneNum(event.target.value);
        break;

      case 'customer_name':
        setCustomerName(event.target.value);
        break;

      case 'redeem_point':
        setRedeemedPoint(event.target.value);
        break;

      default:
        break;
    }
    // setEmail(event.target.value)
  };

  const resetForm = () => {
    console.log('resetForm');
    setTotal(0);
    setSelectedService([]);
    if (user?.role !== 'staff') setSelectedStaff({});
    setCustomerName('');
    setCustomerPhoneNum('');
    setSelectedFreebie({});
    setSelectedCustomer({});
    if (user?.role === 'admin') {
      setIsSelectedStaffDisabled(true);
      setSelectedBranch({});
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let _redeemedPoint = selectedFreebie ? selectedFreebie?.point : 0;

    let data;
    if (customer) {
      data = {
        branch_id: selectedBranch.id,
        barber_id: selectedStaff.id,
        customer_id: selectedCustomer.id,
        order: selectedService.map((serv) => ({
          service: serv.id,
          quantity: serv.quantity,
        })),
        total: total,
        total_redeemed_point: _redeemedPoint,
        total_rewarded_point: rewardedPoint,
        freebie: selectedFreebie?.name
          ? [
              {
                name: selectedFreebie?.name,
                quantity: selectedFreebie?.quantity,
                point: selectedFreebie?.point,
              },
            ]
          : [],
      };
    } else {
      data = {
        branch_id: selectedBranch.id,
        barber_id: selectedStaff.id,
        order: selectedService.map((serv) => ({
          service: serv.id,
          quantity: serv.quantity,
        })),
        total: total,
        total_redeemed_point: _redeemedPoint,
        total_rewarded_point: rewardedPoint,
        customer_name: customerName,
        customer_phone_no: customerPhoneNumber,
      };
    }

    console.log('data', data);
    await dispatch(addSales(data));
    resetForm();
  };

  return (
    <div>
      <main>
        <Navbar />
        <Header title='Sales' showHistoryBtn />
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
                            disabled={isSelectedBranchDisabled}
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
                                            : isSelectedBranchDisabled
                                            ? { color: 'black' }
                                            : { color: 'red' }
                                        }
                                      >
                                        {selectedBranch?.name
                                          ? selectedBranch?.name
                                          : isSelectedBranchDisabled
                                          ? selectedBranch?.name || 'Staff Name'
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

                        <div className='col-span-6 sm:col-span-3'>
                          <Listbox
                            value={selectedStaff}
                            onChange={setSelectedStaff}
                            disabled={isSelectedStaffDisabled}
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Label className='block text-sm font-medium text-gray-700'>
                                  Staff
                                </Listbox.Label>
                                <div className='relative mt-1'>
                                  <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'>
                                    <span className='flex items-center'>
                                      {selectedStaff?.avatar ? (
                                        <img
                                          src={selectedStaff.avatar}
                                          alt=''
                                          className='h-6 w-6 flex-shrink-0 rounded-full'
                                        />
                                      ) : null}
                                      <span
                                        className='ml-3 block truncate text-gray-700'
                                        style={
                                          selectedStaff?.full_name
                                            ? { color: 'black' }
                                            : isSelectedStaffDisabled
                                            ? user?.role === 'staff'
                                              ? { color: 'black' }
                                              : { color: 'red' }
                                            : { color: 'red' }
                                        }
                                      >
                                        {selectedStaff?.full_name
                                          ? selectedStaff?.full_name
                                          : isSelectedStaffDisabled
                                          ? user?.role === 'staff'
                                            ? selectedStaff?.full_name ||
                                              'Staff Name'
                                            : 'Select Staff'
                                          : 'Select Staff'}
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
                                      {staff.docs &&
                                        staff.docs.map((person) => (
                                          <Listbox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? 'text-white bg-blue-600'
                                                  : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                              )
                                            }
                                            value={person}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className='flex items-center'>
                                                  {/* <img
                                                    src={person.avatar}
                                                    alt=""
                                                    className="h-6 w-6 flex-shrink-0 rounded-full"
                                                  /> */}
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? 'font-semibold'
                                                        : 'font-normal',
                                                      'ml-3 block truncate'
                                                    )}
                                                  >
                                                    {person.full_name}
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
                          <Listbox
                            value={selectedService}
                            onChange={setSelectedService}
                            multiple
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Label className='block text-sm font-medium text-gray-700'>
                                  Services
                                </Listbox.Label>
                                <div className='relative mt-1'>
                                  <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'>
                                    <span className='flex items-center'>
                                      <span className='block truncate text-gray-700'>
                                        Select Services
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
                                      {services.docs &&
                                        services.docs.map((service) => (
                                          <Listbox.Option
                                            key={service.id}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? 'text-white bg-blue-600'
                                                  : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                              )
                                            }
                                            value={service}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className='flex items-center'>
                                                  <span
                                                    className={classNames(
                                                      selected ||
                                                        selectedService.some(
                                                          (item) =>
                                                            item.name ===
                                                            service.name
                                                        )
                                                        ? 'font-semibold'
                                                        : 'font-normal',
                                                      'ml-3 block truncate'
                                                    )}
                                                  >
                                                    {service.name}
                                                  </span>
                                                </div>

                                                {selected ||
                                                selectedService.some(
                                                  (item) =>
                                                    item.name === service.name
                                                ) ? (
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
                          <label className='block mt-3 text-gray-700 text-right text-sm'>
                            {'Total Points Collected: ' + totalPoints}
                          </label>
                        </div>

                        {showRedeemPointField && (
                          <div className='col-span-6 sm:col-span-4'>
                            <Listbox
                              value={selectedFreebie}
                              onChange={setSelectedFreebie}
                            >
                              {({ open }) => (
                                <>
                                  <Listbox.Label className='block text-sm font-medium text-gray-700'>
                                    Redeem Service
                                  </Listbox.Label>
                                  <div className='relative mt-1'>
                                    <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'>
                                      <span className='flex items-center'>
                                        <span
                                          className='ml-3 block truncate text-gray-700'
                                          style={
                                            !selectedFreebie?.name
                                              ? { color: 'red' }
                                              : { color: 'black' }
                                          }
                                        >
                                          {selectedFreebie?.name
                                            ? selectedFreebie.quantity +
                                              ' x ' +
                                              selectedFreebie.name
                                            : 'Select Services to Redeem'}
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
                                        {freebieData &&
                                          freebieData.map((freebie) => (
                                            <Listbox.Option
                                              key={freebie.id}
                                              className={({ active }) =>
                                                classNames(
                                                  active
                                                    ? 'text-white bg-blue-600'
                                                    : 'text-gray-900',
                                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                              }
                                              value={freebie}
                                              disabled={
                                                freebie.point > totalPoints
                                              }
                                            >
                                              {({ selected, active }) => (
                                                <>
                                                  <div
                                                    className={classNames(
                                                      freebie.point >
                                                        totalPoints
                                                        ? 'line-through'
                                                        : '',
                                                      'flex items-center justify-between'
                                                    )}
                                                  >
                                                    <span
                                                      className={classNames(
                                                        selected
                                                          ? 'font-semibold'
                                                          : 'font-light',
                                                        'ml-3 block truncate'
                                                      )}
                                                    >
                                                      {freebie.name}
                                                    </span>
                                                    <span
                                                      className={classNames(
                                                        selected
                                                          ? 'font-semibold'
                                                          : 'font-light',
                                                        'ml-3 block truncate'
                                                      )}
                                                    >
                                                      {freebie.point + ' pts '}
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
                                  <div className='relative mt-1'>
                                    <p className='text-xs italic font-light text-gray-500'>
                                      Can only redeem one service per order
                                    </p>
                                  </div>
                                </>
                              )}
                            </Listbox>
                          </div>
                        )}

                        <div className='col-span-6'>
                          <label
                            htmlFor='price'
                            className='block text-sm font-medium text-gray-700 mb-2'
                          >
                            List of Services
                          </label>

                          <div className='flex flex-col'>
                            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                              <div className='py-4 inline-block min-w-full sm:px-6 lg:px-8'>
                                <div className='overflow-hidden'>
                                  <table className='min-w-full text-center'>
                                    <thead className='border-b bg-gray-50'>
                                      <tr>
                                        <th
                                          scope='col'
                                          className='text-sm font-medium text-gray-900 px-2 py-4'
                                        >
                                          Service
                                        </th>
                                        <th
                                          scope='col'
                                          className='text-sm font-medium text-gray-900 px-2 py-4'
                                        >
                                          Quantity
                                        </th>
                                        <th
                                          scope='col'
                                          className='text-sm font-medium text-gray-900 px-2 py-4'
                                        >
                                          Price
                                        </th>
                                        <th
                                          scope='col'
                                          className='text-sm font-medium text-gray-900 px-2 py-4'
                                        >
                                          Action
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedService.map((service, index) => (
                                        <tr className='bg-white border-b'>
                                          <td className='text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap'>
                                            {service.name}
                                          </td>
                                          <td className='text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap'>
                                            <div className='flex flex-row h-10 min-w-100 w-max-150 rounded-lg relative bg-transparent mt-1 text-center px-2'>
                                              <button
                                                type='button'
                                                onClick={() =>
                                                  decrementQuantity(
                                                    service,
                                                    index
                                                  )
                                                }
                                                className=' bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none'
                                              >
                                                <span className='m-auto text-2xl font-thin'>
                                                  −
                                                </span>
                                              </button>
                                              <input
                                                className='outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none'
                                                value={service?.quantity || 1}
                                                disabled
                                              />
                                              <button
                                                type='button'
                                                onClick={() =>
                                                  incrementQuantity(
                                                    service,
                                                    index
                                                  )
                                                }
                                                className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer'
                                              >
                                                <span className='m-auto text-2xl font-thin'>
                                                  +
                                                </span>
                                              </button>
                                            </div>
                                          </td>
                                          <td className='text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap'>
                                            {'RM ' +
                                              (
                                                service.price *
                                                (service?.quantity || 1)
                                              ).toFixed(2)}
                                          </td>
                                          <td className='text-sm text-gray-900 font-light p-2 whitespace-nowrap'>
                                            <button
                                              type='button'
                                              className='justify-center rounded-md border border-transparent px-2 py-1 bg-red-600 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                                              onClick={() =>
                                                removeServiceFromList(index)
                                              }
                                            >
                                              X
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                      {selectedFreebie &&
                                        Object.keys(selectedFreebie).length >
                                          0 && (
                                          <tr className='bg-white border-b'>
                                            <td className='text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap'>
                                              {selectedFreebie.name}
                                            </td>
                                            <td className='text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap'>
                                              {selectedFreebie.quantity}
                                            </td>
                                            <td className='text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap'>
                                              {'- ' +
                                                selectedFreebie.point +
                                                ' pts'}
                                            </td>
                                            <td className='text-sm text-gray-900 font-light p-2 whitespace-nowrap'>
                                              <button
                                                type='button'
                                                className='justify-center rounded-md border border-transparent px-2 py-1 bg-red-600 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                                                onClick={() => removeFreebies()}
                                              >
                                                X
                                              </button>
                                            </td>
                                          </tr>
                                        )}
                                      {total > 0 && (
                                        <>
                                          <tr className='bg-white border-b'>
                                            <td
                                              colSpan='2'
                                              className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center'
                                            >
                                              Sub-Total
                                            </td>
                                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                                              {'RM ' + total}
                                            </td>
                                          </tr>

                                          {/* {showRedeemPointField && (
                                            <tr className="bg-white border-b">
                                              <td
                                                colSpan="2"
                                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                                              >
                                                Discount
                                              </td>
                                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {"- RM " +
                                                  (discount
                                                    ? discount.toFixed(2)
                                                    : 0.0)}
                                              </td>
                                            </tr>
                                          )} */}

                                          {/* <tr className="bg-white border-b">
                                            <td
                                              colSpan="2"
                                              className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                                            >
                                              Grand-Total
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                              {"RM " + subTotal.toFixed(2)}
                                            </td>
                                          </tr> */}
                                        </>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default Sales;
