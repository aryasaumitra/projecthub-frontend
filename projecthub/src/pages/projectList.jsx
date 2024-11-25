import React, { useEffect, useState } from "react";
import { getProjects } from "../services/api";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Projects</h1>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item">
            <h5>{project.name}</h5>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
