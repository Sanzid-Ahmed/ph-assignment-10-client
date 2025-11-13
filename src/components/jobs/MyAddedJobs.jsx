import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MyAddedJobs = () => {
  const BASE_URL = "http://localhost:3000";

  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/my-added-jobs/${user.email}`
        );
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        toast.error("❌ Failed to load your jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    setJobs(jobs.filter((job) => job._id !== id));

    try {
      const response = await axios.delete(`${BASE_URL}/deletejob/${id}`);
      if (response.status === 200) {
        toast.success("✅ Job deleted successfully!");
      } else {
        toast.error("❌ Failed to delete job");
      }
    } catch (err) {
      console.error("Delete job error:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        L<span className="loading loading-spinner loading-xl"></span>ading your
        added jobs...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      
      <h2 className="text-2xl font-bold text-center mb-6">
        My Added Jobs ({jobs.length})
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any jobs yet.
        </p>
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
                  to={`/updateJob/${job._id}`}
                  className="bg-[#006666] text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
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

export default MyAddedJobs;
