import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById, updateTaskStatus } from "../services/api";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      const data = await getTaskById(id);
      setTask(data);
    }
    fetchTask();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    const updatedTask = await updateTaskStatus(id, newStatus);
    setTask(updatedTask);
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <button
        className="btn btn-success"
        onClick={() => handleStatusUpdate("Completed")}
      >
        Mark as Completed
      </button>
    </div>
  );
};

export default TaskDetails;
