import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'redux/store';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Header from 'components/Header';
import Pagination from 'components/Pagination';

import { classNames } from 'utils/helper';

import {
  getAllServices,
  addService,
  deleteService,
  updateService,
} from 'redux/slices/services';
import { getAllCategories } from 'redux/slices/category';

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    services,
    isLoading,
    pagingCounter,
    currPage,
    totalDocs,
    totalPages,
    limit,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = useSelector((state) => state.services);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAllCategories({ limit: 50 }));
  }, []);

  useEffect(async () => {
    await dispatch(
      getAllServices({
        page: currentPage,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      // hide modal
      setShowModal(false);
      setShowDeleteModal(false);
      resetForm();
    }
  }, [isLoading]);

  useEffect(async () => {
    console.log('currentPage', currentPage);
    await dispatch(
      getAllServices({
        page: currentPage,
      })
    );
  }, [currentPage]);

  const handleEventChange = (event) => {
    console.log('event', event.target.name);
    switch (event.target.name) {
      case 'service_name':
        setName(event.target.value);
        break;

      case 'service_price':
        const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
        if (validated) {
          setPrice(event.target.value);
        }
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    console.log('resetForm');
    setName();
    setPrice();
    setViewMode(false);
    setSelectedItem();
    setSelectedCategory();
    setShowModal(false);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (name && price && selectedCategory) {
      const data = {
        name,
        price,
        category_id: selectedCategory?.id,
      };

      console.log('data', data);
      if (selectedItem) await dispatch(updateService(selectedItem?.id, data));
      else await dispatch(addService(data));
      await dispatch(
        getAllServices({
          page: currentPage,
        })
      );
    }
  };

  const submitServiceDeletion = async (id) => {
    console.log(id);
    await dispatch(deleteService(id));
    await dispatch(
      getAllServices({
        page: currentPage,
      })
    );
    setShowDeleteModal(false);
    setSelectedItem();
  };

  return (
    <div>
      <div className='min-h-full'>
        <Navbar current='Services' />

        <Header title='Services' />
        <main>
          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
            <div className='flex justify-end mr-2'>
              <button
                type='button'
                onClick={() => setShowModal(true)}
                className='justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Add Service
              </button>
            </div>

            {showModal ? (
              <>
                <div className='flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                  <div className='relative w-full mx-6 md:mx-0 md:w-4/5 lg:w-3/5 my-6 mx-auto max-w-6xl'>
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                      <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                        <h3 className='text-3xl font-semibold'>
                          {viewMode
                            ? 'Service Detail'
                            : selectedItem
                            ? 'Edit Service'
                            : 'Add Service'}
                        </h3>
                        <button
                          className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                          onClick={() => setShowModal(false)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>
                      </div>

                      <div className='relative p-6 flex-auto'>
                        <label
                          htmlFor='price'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Service Name
                        </label>
                        <input
                          type='text'
                          name='service_name'
                          id='service_name'
                          disabled={viewMode}
                          className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-700'
                          placeholder='Enter Service Name'
                          onChange={handleEventChange}
                          value={name}
                        />
                      </div>

                      <div className='relative px-6 pb-6 flex-auto'>
                        <label
                          htmlFor='price'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Service Price
                        </label>
                        <input
                          type='number'
                          name='service_price'
                          id='service_price'
                          disabled={viewMode}
                          className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-gray-700'
                          placeholder='Enter Service Price'
                          onChange={handleEventChange}
                          value={price}
                        />
                      </div>

                      <div className='relative px-6 pb-10 flex-auto'>
                        <Listbox
                          value={selectedCategory}
                          disabled={viewMode}
                          onChange={setSelectedCategory}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className='block text-sm font-medium text-gray-700'>
                                Category
                              </Listbox.Label>
                              <div className='relative mt-1'>
                                <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                                  <span className='flex items-center'>
                                    <span
                                      className='ml-3 block truncate text-gray-700'
                                      style={
                                        !selectedCategory?.name
                                          ? { color: 'red' }
                                          : { color: 'black' }
                                      }
                                    >
                                      {selectedCategory?.name
                                        ? selectedCategory.name
                                        : 'Select Category'}
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
                                    {categories.docs &&
                                      categories.docs.map((item) => (
                                        <Listbox.Option
                                          key={item.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? 'text-white bg-indigo-600'
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
                                                      : 'text-indigo-600',
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

                      <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                        <button
                          className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => resetForm()}
                        >
                          Close
                        </button>
                        {!viewMode ? (
                          <button
                            className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            type='button'
                            onClick={submitForm}
                          >
                            {!isLoading ? (
                              selectedItem ? (
                                'Update'
                              ) : (
                                'Create'
                              )
                            ) : (
                              <div className='w-5 h-5 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent' />
                            )}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
              </>
            ) : null}

            {showDeleteModal ? (
              <>
                <div className='fixed inset-0 z-10 overflow-y-auto'>
                  <div
                    className='fixed inset-0 w-full h-full bg-black opacity-40'
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedItem();
                    }}
                  ></div>
                  <div className='flex items-center min-h-screen px-4 py-8'>
                    <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
                      <div className='mt-3 sm:flex'>
                        <div className='flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 text-red-600'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </div>
                        <div className='mt-2 text-center sm:ml-4 sm:text-left'>
                          <h4 className='text-lg font-medium text-gray-800'>
                            Delete service ?
                          </h4>
                          <p className='mt-2 text-[15px] leading-relaxed text-gray-500'>
                            Are you sure you want to delete this service?
                          </p>
                          <div className='items-center gap-2 mt-3 sm:flex'>
                            <button
                              className='w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2'
                              onClick={() =>
                                submitServiceDeletion(selectedItem?.id)
                              }
                            >
                              Delete
                            </button>
                            <button
                              className='w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2'
                              onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedItem();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div className='px-4 py-6 sm:px-0'>
              <div className='flex flex-col'>
                <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
                  <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
                    <table className='min-w-full'>
                      <thead>
                        <tr>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            Name
                          </th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {services.docs ? (
                          services.docs.map((item) => (
                            <tr key={item.id}>
                              <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                <div className='flex items-center'>
                                  <div className='text-sm font-medium leading-5 text-gray-900'>
                                    {item.name}
                                  </div>
                                </div>
                              </td>

                              <td className='flex flex-row justify-center items-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200'>
                                <button
                                  type='button'
                                  className='w-7 h-7 hover:text-yellow-300 mx-2'
                                  onClick={() => {
                                    setShowModal(true);
                                    setSelectedItem(item);
                                    console.log('item', item?.category_id);
                                    setSelectedCategory(item?.category_id);
                                    setViewMode(true);
                                    setPrice(item?.price);
                                    setName(item?.name);
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                                    />
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                    />
                                  </svg>
                                </button>

                                <button
                                  type='button'
                                  className='w-7 h-7 hover:text-blue-300 mx-2'
                                  onClick={() => {
                                    setShowModal(true);
                                    setSelectedItem(item);
                                    console.log('item', item?.category_id);
                                    setSelectedCategory(item?.category_id);
                                    setPrice(item?.price);
                                    setName(item?.name);
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                    />
                                  </svg>
                                </button>

                                <button
                                  type='button'
                                  className='w-7 h-7 hover:text-red-300 mx-2'
                                  onClick={() => {
                                    setShowDeleteModal(true);
                                    setSelectedItem(item);
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className='text-center py-2'>
                              No service found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <Pagination
                current={currPage}
                total={totalDocs}
                totalPage={totalPages}
                pagingCounter={pagingCounter}
                limit={limit}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPrevPage}
                prevPage={prevPage}
                nextPage={nextPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
