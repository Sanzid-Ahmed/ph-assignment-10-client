import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateJob = () => {
  const BASE_URL = "https://freemarket-nine.vercel.app";
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [job, setJob] = useState({
    title: "",
    postedBy: "",
    category: "",
    summary: "",
    coverImage: "",
    salary: "",
    userEmail: "",
  });

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/allJobs/${id}`);
        if (response.data) {
          setJob(response.data);
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        toast.error("❌ Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("❌ You must be logged in to update a job.");
      return;
    }

    const jobData = {
      ...job,
      postedBy: job.postedBy || user.displayName || "Anonymous",
      userEmail: job.userEmail || user.email,
    };

    try {
      const response = await axios.put(`${BASE_URL}/updateJob/${id}`, jobData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("✅ Job updated successfully!");
        navigate(`/allJobs/${id}`);
      } else {
        toast.error("❌ Failed to update job");
      }
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10">
        L<span className="loading loading-spinner loading-xl"></span>ading job
        data...
      </p>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <ToastContainer position="top-right" />
      <h2 className="text-2xl font-bold mb-4 text-center">Update Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={job.title || ""}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={job.category || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Web Development">Web Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Graphics Designing">Graphics Designing</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="summary"
          value={job.summary || ""}
          onChange={handleChange}
          placeholder="Short Summary"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="coverImage"
          value={job.coverImage || ""}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="salary"
          value={job.salary || ""}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#006666] text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
