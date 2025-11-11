import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer } from "react-toastify"; // make sure you installed react-toastify

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // get user and logOut from context
  const [isHovered, setIsHovered] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(err => console.log(err));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">All jobs</NavLink>
      </li>
      <li>
        <NavLink to="/addJob">Add a job</NavLink>
      </li>
      <li>
        <NavLink to="/my-accepted-tasks">My accepted tasks</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#006666] rounded-[8px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-[#006666] text-white font-bold"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="text-xl text-white font-bold m-3">
          <span className="text-4xl text-black">F</span>ree
          <span className="text-black">M</span>arket
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white font-bold">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div
            className="relative w-10 h-10 mr-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-visible cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={user?.photoURL || ""}
              alt="User"
              className="object-cover w-full h-full rounded-full"
            />
            {isHovered && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg z-20">
                {user.displayName || "User"}
              </div>
            )}
          </div>
        ) : null}

        {user ? (
          <button
            onClick={handleLogOut}
            className="btn border-0 bg-gradient-to-r from-[#f0913f] to-pink-300 rounded-3xl"
          >
            LogOut
          </button>
        ) : (
          <Link
            to="/login"
            className="btn border-0 bg-gradient-to-r from-[#f0913f] to-pink-300 rounded-3xl"
          >
            Login
          </Link>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Navbar;
