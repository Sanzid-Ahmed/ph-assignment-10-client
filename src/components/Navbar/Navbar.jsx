import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out successfully!"))
      .catch((err) => toast.error("Logout failed: " + err.message));
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allJobs">All Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/addJob">Add a Job</NavLink>
      </li>
      <li>
        <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
      </li>
      <li>
        <NavLink to="/my-added-tasks">My Added Tasks</NavLink>
      </li>
    </>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar bg-[#006666] shadow-lg relative">
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
            className="menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow bg-[#006666] text-white font-bold absolute z-[2000]"
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
        <ul className="menu menu-horizontal px-1 text-white font-bold">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3 relative">
        {user && (
          <div ref={dropdownRef} className="relative">
            <div
              className="relative w-10 h-10 mr-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-visible cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
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

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-52 bg-white text-black rounded shadow-lg z-50">
                <li className="px-4 py-2 border-b text-center font-bold bg-[#317575] text-white">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link
                    to="/my-accepted-tasks"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Accepted Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-added-tasks"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Added Jobs
                  </Link>
                </li>
                <li className="flex items-center justify-center px-4 py-2 border-t">
                  <label className="toggle text-base-content">
                    <input
                      type="checkbox"
                      className="theme-controller"
                      checked={theme === "dark"}
                      onChange={(e) => handleTheme(e.target.checked)}
                    />

                    <svg
                      aria-label="sun"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                      </g>
                    </svg>

                    <svg
                      aria-label="moon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      </g>
                    </svg>
                  </label>
                </li>
              </ul>
            )}
          </div>
        )}

        {user ? (
          <button
            onClick={handleLogOut}
            className="btn border-0 rounded-3xl font-bold"
          >
            LogOut
          </button>
        ) : (
          <Link to="/login" className="btn border-0 rounded-3xl font-bold">
            Login
          </Link>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Navbar;
