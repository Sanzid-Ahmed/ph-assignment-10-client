import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddJob = () => {
  const BASE_URL = "https://freemarket-lovat.vercel.app";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  const [job, setJob] = useState({
    title: "",
    postedBy: "",
    category: "",
    summary: "",
    description: "",
    coverImage: "",
    salary: "",
    userEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast("❌ You must be logged in to add a job.");
      return;
    }

    const jobData = {
      ...job,
      postedBy: user.displayName || "Anonymous",
      userEmail: user.email,
    };

    try {
      const response = await axios.post(`${BASE_URL}/addJob`, jobData);

      if (response.status === 201) {
        toast.success("✅ Job added successfully!");
        setJob({
          title: "",
          postedBy: "",
          category: "",
          summary: "",
          description: "",
          coverImage: "",
          salary: "",
          userEmail: "",
        });
      } else {
        toast.error("❌ Failed to add job");
      }
    } catch (err) {
      console.error("Add job error:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  if (!user)
    return (
      <p>
        L<span className="loading loading-spinner loading-xl"></span>ading user
        info...
      </p>
    );

  return (
    <div className="max-w-lg mx-auto p-6 rounded-xl shadow-md mt-10">
      
      <h2 className="text-2xl font-bold mb-5 text-center text-base-content dark:text-base-100">
        Add New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={job.category}
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
          name="summary"
          value={job.summary}
          onChange={handleChange}
          placeholder="Short Summary"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="coverImage"
          value={job.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#006666] text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
