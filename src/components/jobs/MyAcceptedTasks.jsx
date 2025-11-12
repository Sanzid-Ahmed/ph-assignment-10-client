import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const MyAcceptedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const currentUserEmail = currentUser?.email;

  
  useEffect(() => {
    if (!currentUserEmail) return;

    fetch(`http://localhost:3000/my-accepted-tasks/${currentUserEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load accepted tasks:", err);
        setLoading(false);
      });
  }, [currentUserEmail]);

 
  const handleRemove = async (id, action) => {
    const confirmDelete = window.confirm(`Are you sure you want to ${action} this job?`);
    if (!confirmDelete) return;

    
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

    try {
      const response = await fetch(`http://localhost:3000/deleteJob/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("❌ Failed to remove from database!");
      } else {
        alert(`✅ Job ${action === "cancel" ? "cancelled" : "completed"} successfully!`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Something went wrong!");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading your accepted jobs...</p>;

  if (!tasks.length)
    return <p className="text-center text-gray-500 mt-10">You haven’t accepted any jobs yet.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        My Accepted Tasks
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-50 border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
          >
            {task.coverImage && (
              <img
                src={task.coverImage}
                alt={task.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Category:</span> {task.category}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Salary:</span> {task.salary || "Negotiable"}
              </p>
              <p className="text-gray-600 mb-3">
                <span className="font-medium">Posted By:</span> {task.postedBy}
              </p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {task.summary || task.description}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleRemove(task._id, "done")}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm"
                >
                  ✅ Done
                </button>
                <button
                  onClick={() => handleRemove(task._id, "cancel")}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
