import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");

  const BASE_URL = "https://freemarket-pq7ahgzxz-sanzid-ahmeds-projects.vercel.app";
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/allJobs`);
        setJobs(response.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        toast.error("❌ Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`${BASE_URL}/deletejob/${id}`);
      toast.success("✅ Job deleted successfully!");
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Delete job error:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">L<span className="loading loading-spinner loading-xl"></span>ading jobs...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Jobs ({jobs.length})</h2>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-3 py-1 bg-[#006666] font-bold text-white"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedJobs.map((job) => (
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
              <p className="text-gray-500 mb-2">
                {job.summary && job.summary.length > 80
                  ? job.summary.substring(0, 80) + "..."
                  : job.summary}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                Posted:{" "}
                {job.createdAt
                  ? new Date(job.createdAt).toLocaleString()
                  : "Unknown"}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <Link
                  to={`/allJobs/${job._id}`}
                  className="bg-[#006666] text-white px-3 py-1 rounded hover:bg-blue-700 transition"
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
