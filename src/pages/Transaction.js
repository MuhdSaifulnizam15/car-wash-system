import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "redux/store";

import BarChart from "components/BarChart";
import DoughnutChart from "components/DoughnutChart";
import Footer from "../components/Footer";
import Navbar from "components/Navbar";
import Header from "components/Header";

import { classNames } from "utils/helper";

import {
  getTotalSalesChart,
  getTotalSalesByServiceChart,
} from "redux/slices/transaction";

const options = [
  {
    id: "1",
    name: "daily",
  },
  {
    id: "2",
    name: "week",
  },
  {
    id: "3",
    name: "month",
  },
  {
    id: "4",
    name: "annual",
  },
];

const Transaction = () => {
  const [selectedType, setSelectedType] = useState(options[0]);
  const [startDate, setStartDate] = useState([
    dayjs().subtract(1, "day").toDate(),
    dayjs().toDate(),
  ]);
  const [showModal, setShowModal] = useState(false);

  const { transaction, services, isLoading } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getTotalSalesChart(selectedType.name));
    await dispatch(
      getTotalSalesByServiceChart({
        startDate: startDate.length > 0 ? startDate[0] : startDate,
        endDate: startDate.length > 0 ? startDate[1] : startDate,
      })
    );
  }, []);

  useEffect(async () => {
    if (selectedType?.name)
      await dispatch(getTotalSalesChart(selectedType.name));
  }, [selectedType]);

  useEffect(async () => {
    if (startDate.length > 0) {
      await dispatch(
        getTotalSalesByServiceChart({
          startDate: startDate.length > 0 ? startDate[0] : startDate,
          endDate: startDate.length > 0 ? startDate[1] : startDate,
        })
      );
    }
  }, [startDate]);

  return (
    <div>
      <main>
        <Navbar current="Transactions" />
        <Header title="Transaction" />

        <div className="mx-auto max-w-7xl overflow-auto py-6 sm:px-6 lg:px-8">
          {showModal ? (
            <>
              <div className="flex justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-fit mx-6 md:mx-0 md:w-4/5 lg:w-3/5 my-6 mx-auto">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Select Date</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-center p-2">
                      <Calendar
                        onChange={setStartDate}
                        value={startDate}
                        maxDate={new Date()}
                        selectRange
                      />
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          <div className="px-4 sm:px-0 overflow-auto">
            <div className="sm:mt-0 overflow-auto ">
              <div className="lg:block md:max-w-3/6 md:items-center md:justify-center">
                <div className="max-w-4xl mb-10 border border-slate-50 p-1">
                  <div className="flex flex-row items-center col-span-6 sm:col-span-3 mb-3">
                    <Listbox value={selectedType} onChange={setSelectedType}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="text-sm font-medium text-gray-700 mr-2">
                            Sort By
                          </Listbox.Label>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-1/6 min-w-fit cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                              <span className="flex items-center">
                                <span
                                  className="ml-3 capitalize block truncate text-gray-700"
                                  style={
                                    !selectedType?.name
                                      ? { color: "red" }
                                      : { color: "black" }
                                  }
                                >
                                  {selectedType?.name
                                    ? selectedType.name
                                    : "Select One"}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-1/6 min-w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options &&
                                  options.map((item) => (
                                    <Listbox.Option
                                      key={item.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "text-white bg-indigo-600"
                                            : "text-gray-900",
                                          "capitalize relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={item}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "capitalize ml-3 block truncate"
                                              )}
                                            >
                                              {item.name}
                                            </span>
                                          </div>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-white"
                                                  : "text-indigo-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
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

                  <BarChart
                    labels={transaction?.label}
                    dataList={transaction?.data}
                  />
                </div>

                <div className="max-w-4xl border border-slate-50 py-2 px-2">
                  <div className="flex row-flex items-center mb-2">
                    <p className="font-medium text-base text-slate-200">
                      Start Date:
                      <span className="font-light text-sm">
                        {" " +
                          dayjs(
                            startDate.length > 0 ? startDate[0] : startDate
                          ).format("DD MMM YYYY")}
                      </span>
                    </p>
                    <button
                      className="ml-3 bg-blue-500 px-2 py-1 rounded-md text-xs text-white"
                      onClick={() => setShowModal(true)}
                    >
                      Select Date
                    </button>
                  </div>

                  <div className="flex row-flex items-center mb-2">
                    <p className="font-medium text-base text-slate-200">
                      End Date:
                      <span className="font-light text-sm">
                        {" " +
                          dayjs(
                            startDate.length > 0 ? startDate[1] : startDate
                          ).format("DD MMM YYYY")}
                      </span>
                    </p>
                    <button
                      className="ml-3 bg-blue-500 px-2 py-1 rounded-md text-xs text-white"
                      onClick={() => setShowModal(true)}
                    >
                      Select Date
                    </button>
                  </div>
                  {/* <p className="text-center mt-3">{"No sales recorded on " + dayjs(startDate).format('DD MMM YYYY')} </p> */}
                  <DoughnutChart
                    labels={services?.label}
                    dataList={services?.data}
                  />
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

export default Transaction;
