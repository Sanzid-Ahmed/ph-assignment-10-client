import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateJob = () => {
  const BASE_URL = "https://freemarket-lovat.vercel.app";

  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    category: "",
    salary: "",
    deadline: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/allJobs/${id}`);
        setJob(response.data);
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

    try {
      const response = await axios.put(`${BASE_URL}/updateJob/${id}`, job);
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
      
      <h2 className="text-2xl font-bold mb-4 text-center">Update Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={job.title || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={job.category || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Salary</label>
          <input
            type="text"
            name="salary"
            value={job.salary || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={job.deadline || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={job.description || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded h-24"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
