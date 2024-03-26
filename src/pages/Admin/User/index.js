import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "redux/store";

import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Header from "components/Header";

import { getUserList } from "redux/slices/user";

const Users = () => {
  const { userList } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getUserList());
  }, [dispatch]);

  return (
    <div>
      <div className="min-h-full">
        <Navbar current="Users" />

        <Header title="Users" />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => console.log('add user')}
                className="justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Add User
              </button>
            </div>
            <div className="px-4 py-6 sm:px-0">
              <div className="flex flex-col">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Full name
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Email
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Status
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Role
                          </th>
                          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {userList.length > 0 ? (
                          userList.map((item) => (
                            <tr>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-10 h-10">
                                    {item?.imageUrl ? (
                                      <img
                                        className="w-10 h-10 rounded-full"
                                        src={item.imageUrl}
                                        alt="user avatar"
                                      />
                                    ) : (
                                      <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <span className="font-medium text-gray-600 dark:text-gray-300">
                                          {(
                                            item?.first_name +
                                            " " +
                                            item?.last_name
                                          )
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="ml-4">
                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                      {item.first_name + " " + item.last_name}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="text-sm leading-5 text-gray-500">
                                  {item.email}
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                  {item.active ? "Verified" : "Not Verified"}
                                </span>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                  {item.role}
                                </span>
                              </td>

                              <td className="flex flex-row justify-center items-center px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap">
                                <button
                                  type="button"
                                  className="w-7 h-7 hover:text-yellow-300 mx-2"
                                  onClick={() => console.log("view user")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  className="w-7 h-7 hover:text-teal-300 mx-2"
                                  onClick={() => console.log("edit users")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  className="w-7 h-7 hover:text-red-300 mx-2"
                                  onClick={() => console.log("delete users")}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td>No users found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Users;
