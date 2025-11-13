import React from "react";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <div>
        <h1 className='text-center text-9xl'>Error404</h1>
      <div className="flex items-center justify-center h-[100vh]">
        <Link className="btn bg-[#006666] text-white font-bold rounded-[25px]" to="/">
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default Error404;
