import React, { useEffect, useState } from "react";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  // 🟢 Fetch all jobs from backend
  useEffect(() => {
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  // 🟠 Delete job
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    const response = await fetch(`http://localhost:3000/delete-job/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("✅ Job deleted successfully!");
      setJobs(jobs.filter((job) => job._id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">All Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center">No jobs found.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.salary}</p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
