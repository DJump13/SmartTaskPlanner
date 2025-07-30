import API from "./axios";

export const fetchTasks = () => API.get("/tasks").then((res) => res.data);

export const createTask = (taskData) =>
  API.post("/tasks", taskData).then((res) => res.data);
