import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from the route parameter
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch single job details from backend
    fetch(`http://localhost:3000/allJobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center mt-10 text-red-500">Job not found!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-3 text-gray-800">{job.title}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Category:</span> {job.category}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Salary:</span> {job.salary}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Deadline:</span> {job.deadline}
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        <span className="font-semibold">Description:</span> {job.description}
      </p>

      <div className="flex justify-between">
        <Link
          to={`/updateJob/${job._id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit Job
        </Link>

        <Link
          to="/allJobs"
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Back to All Jobs
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;
