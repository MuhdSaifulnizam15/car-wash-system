import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PATH_PAGE, PATH_AUTH } from "router/routes";

const Header = ({ title = "Dashboard", showHistoryBtn = false, showChangePasswordBtn = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        {showHistoryBtn ? (
          <div className="mr-2">
            <button
              type="button"
              onClick={() => navigate(PATH_PAGE.history)}
              className="justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-xs font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              History
            </button>
          </div>
        ) : null}
        {showChangePasswordBtn ? (
          <div className="mr-2">
            <button
              type="button"
              onClick={() => navigate(PATH_AUTH.changePassword)}
              className="justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-xs font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
