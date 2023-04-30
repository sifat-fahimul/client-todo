import React from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <div className="">
      <div className="fixed top-0 left-0 text-center w-full header bg-primary py-4 text-white font-bold text-lg shadow-lg">
        Simple Todo Application
        <div className="absolute top-4 right-5 ">
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span className="text-hide"> Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
