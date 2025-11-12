import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch("http://localhost:3000/allJobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to fetch jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://localhost:3000/deleteJob/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("✅ Job deleted successfully!");
        setJobs(jobs.filter((job) => job._id !== id));
      } else {
        toast.error("❌ Failed to delete job");
      }
    } catch (err) {
      console.error("Delete job error:", err);
      toast.err("❌ Something went wrong!");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading jobs...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">All Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded p-4 flex flex-col justify-between shadow hover:shadow-lg transition"
            >
              {job.coverImage && (
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-600">
                <strong>Category:</strong> {job.category || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Posted By:</strong> {job.postedBy || "N/A"}
              </p>
              <p className="text-gray-500 mb-3">
                {job.summary && job.summary.length > 80
                  ? job.summary.substring(0, 80) + "..."
                  : job.summary}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <Link
                  to={`/allJobs/${job._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
