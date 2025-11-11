import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateJob = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    category: "",
    salary: "",
    deadline: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch job data to edit
  useEffect(() => {
    fetch(`http://localhost:3000/allJobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/updateJob/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("✅ Job updated successfully!");
        navigate(`/allJobs/${id}`);
      })
      .catch((err) => {
        console.error("Error updating job:", err);
      });
  };

  if (loading) return <p className="text-center mt-10">Loading job data...</p>;

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
