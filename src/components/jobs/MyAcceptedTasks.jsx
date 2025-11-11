import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/jobs?acceptedByEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p>Loading your accepted tasks...</p>;
  if (!tasks.length) return <p>You have not accepted any tasks yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Accepted Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">
              Category: {task.category || "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAcceptedTasks;
