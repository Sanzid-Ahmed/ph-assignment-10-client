import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider"; // if you have context
import { Link } from "react-router-dom";

const MyAddedJobs = () => {
  const { user } = useContext(AuthContext); // assuming user contains email or id
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="text-center text-xl py-10 font-semibold">Loading...</div>
    );
  }

  return (
    <div className="w-10/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Added Jobs ({jobs.length})
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t added any jobs yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="border rounded-lg p-5 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-700 mb-2">Category: {job.category}</p>
              <p className="text-gray-600 mb-3">{job.description.slice(0, 100)}...</p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/updateJob/${job._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </Link>
                <Link
                  to={`/allJobs/${job._id}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedJobs;
