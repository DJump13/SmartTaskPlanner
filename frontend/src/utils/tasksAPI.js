import API from "./axios";

export const fetchTasks = () => API.get("/tasks").then((res) => res.data);

export const createTask = (taskData) =>
  API.post("/tasks", taskData).then((res) => res.data);

export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);

export const editTask = (taskId, updatedFields) =>
  API.put(`/tasks/${taskId}`, updatedFields).then((res) => res.data);
