import React, { useState } from "react";

const AddJob = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/add-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    if (response.ok) {
      alert("✅ Job added successfully!");
      setJob({ title: "", company: "", description: "", salary: "" });
    } else {
      alert("❌ Failed to add job");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">Add New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company Name"
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
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
