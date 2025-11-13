import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://freemarket-lovat.vercel.app";

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/latestjobs`);
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching latest jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJobs();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-10 text-xl font-semibold text-gray-600 dark:text-gray-300">
        L<span className="loading loading-spinner loading-sm"></span>ading latest jobs...
      </div>
    );
  }

  return (
    <section className="py-12 bg-base-200 dark:bg-base-300 mt-10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-base-content dark:text-base-100 mb-8">
          Latest Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No jobs available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-base-100 dark:bg-base-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                {job.coverImage && (
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="text-xl font-semibold text-base-content dark:text-base-100 mb-2">
                  {job.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  {job.category || "General"}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {job.summary || "No summary provided."}
                </p>

                <Link
                  to={`/alljobs/${job._id}`}
                  className="btn bg-primary hover:bg-primary-focus text-white font-bold px-6 py-2 rounded-full transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
