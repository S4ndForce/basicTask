// controls axios features

import axios from "axios";

const API_URL = "http://localhost:8081/api";

// Fetch todos with filters, sorting, and pagination and project id

export const fetchTodos = (filters, selectedProjectId) => {
  const baseUrl = selectedProjectId
    ? `/projects/${selectedProjectId}/todos`
    : `/todos`
  const params = new URLSearchParams();
  if(filters.search) params.append("search", filters.search);
  if(filters.priority) params.append("priority", filters.priority);
  if(filters.category) params.append("category", filters.category);

  params.append("sortBy", filters.sortBy || "createdAt");
  params.append("direction", filters.direction || "asc");
  params.append("page", filters.page ?? 0);
  params.append("size", filters.size ?? 10);

  return axios.get(`${API_URL}${baseUrl}?${params.toString()}`);
};

export const fetchStats = (selectedProjectId) => {
  const baseUrl = selectedProjectId
    ? `/projects/${selectedProjectId}/stats`
    : `/todos/stats`;

  return axios.get(`${API_URL}${baseUrl}`);
};


export const addTodo = (todo, selectedProjectId) => {
  const baseUrl = selectedProjectId
  ? `/projects/${selectedProjectId}/todos`
    : `/todos`;
  return axios.post(`${API_URL}${baseUrl}`, todo);
};

export const updateTodo = (id, changes) => {
  return axios.patch(`${API_URL}/todos/${id}`, changes);
};

export const toggleTodo = (id, todo) => {
  return axios.put(`${API_URL}/todos/${id}`, todo);
};

export const deleteTodo = (id) => {
  return axios.delete(`${API_URL}/todos/${id}`);
};

export const deleteProject = (id) => {
  console.log("DELETE PROJECT CALLED WITH ID:", id);
  return axios.delete(`${API_URL}/projects/${id}`);
};

export const deleteCompleted = async (todos) => {
  const completed = todos.filter((t) => t.completed);
  for (const todo of completed) { //front end  decides what is completed, this just deletes by id
    await deleteTodo(todo.id);
  }
};

export const fetchProjects = () => {
  return axios.get(`${API_URL}/projects`);
};

export const createProject = (project) => {
  return axios.post(`${API_URL}/projects`, project);
};

