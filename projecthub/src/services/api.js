import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Update with your backend URL

// User Registration
export const registerUser = async (username, password, isStaff = false) => {
    console.log(username)
    const response = await axios.post(`${API_BASE_URL}/register/`, {
      "username":username,
      "password":password,
      is_staff: isStaff,
    });
    console.log(response.data)
    return response.data;
};
  
  // User Login
export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/token/`, {
      username,
      password,
    });
    return response.data;
};
  
  // Set Axios Authorization Header
export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
};

// Fetch all projects
export const getProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects/`);
  console.log(response.data)
  return response.data;
};

// Fetch all tasks
export const getTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks/`);
  return response.data;
};

// Fetch a single task by ID
export const getTaskById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${id}/`);
  return response.data;
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  const response = await axios.patch(`${API_BASE_URL}/tasks/${id}/`, {
    status,
  });
  return response.data;
};

//Create a project
export const createProject = (projectData) =>
    api.post("/projects/", projectData);

//Update a Project
export const updateProject = (id, projectData) =>
    api.put(`/projects/${id}/`, projectData);

//
export const deleteProject = (id) => api.delete(`/projects/${id}/`);
  
export const createTask = (taskData) => api.post("/tasks/", taskData);
  
export const updateTask = (id, taskData) => api.put(`/tasks/${id}/`, taskData);
  
export const deleteTask = (id) => api.delete(`/tasks/${id}/`);