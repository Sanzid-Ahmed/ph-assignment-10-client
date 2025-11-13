import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const currentUserEmail = currentUser?.email;

  useEffect(() => {
    fetch(`http://localhost:3000/alljobs/${id}`)
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

  const handleAccept = async () => {
    if (!currentUserEmail) {
      toast.error("❌ You must be logged in to accept this job.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/updatejob/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acceptedByEmail: currentUserEmail }),
      });

      if (response.ok) {
        toast.success("✅ Job accepted successfully!");
        navigate("/my-accepted-tasks");
      } else {
        toast.error("❌ Failed to accept job.");
      }
    } catch (err) {
      console.error("Accept job error:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading job details...</p>;
  if (!job)
    return <p className="text-center mt-10 text-red-500">Job not found!</p>;

  const isPoster = currentUserEmail === job.userEmail;
  const isAcceptedByCurrentUser = job.acceptedByEmail === currentUserEmail;
  const isAcceptedBySomeoneElse =
    job.acceptedByEmail && job.acceptedByEmail !== currentUserEmail;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8 space-y-4">
      {job.coverImage && (
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full h-64 object-cover rounded"
        />
      )}
      <h2 className="text-3xl font-bold">{job.title}</h2>
      
      <p><strong>Category:</strong> {job.category || "N/A"}</p>
      <p><strong>Posted By:</strong> {job.postedBy || "Anonymous"}</p>
      <p><strong>Poster Email:</strong> {job.userEmail || "N/A"}</p>
      <p><strong>Salary:</strong> {job.salary || "Negotiable"}</p>
      <p><strong>Posted At:</strong> {job.createdAt ? new Date(job.createdAt).toLocaleString() : "N/A"}</p>
      <p><strong>Accepted By:</strong> {job.acceptedByEmail || "Not accepted yet"}</p>
      
      <p className="leading-relaxed">
        <strong>Summary:</strong> {job.summary || "No summary"}
      </p>
      <p className="leading-relaxed">
        <strong>Description:</strong> {job.description || "No description"}
      </p>

      <div className="flex flex-wrap justify-between gap-3 mt-4">
        {isPoster ? (
          <Link
            to={`/updateJob/${job._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Update Job
          </Link>
        ) : isAcceptedByCurrentUser ? (
          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            ✅ Accepted
          </button>
        ) : isAcceptedBySomeoneElse ? (
          <button
            disabled
            className="bg-red-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            Already Taken
          </button>
        ) : (
          <button
            onClick={handleAccept}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Accept Job
          </button>
        )}

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
