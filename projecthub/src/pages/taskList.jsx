import React, { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>Status: {task.status}</p>
            <Link to={`/tasks/${task.id}`} className="btn btn-primary">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
