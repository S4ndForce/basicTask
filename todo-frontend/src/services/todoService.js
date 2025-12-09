// controls axios features

import axios from "axios";

const API_URL = "http://localhost:8081/api/todos";

export const fetchTodos = (filters) => {
  const params = new URLSearchParams();
  if(filters.search) params.append("search", filters.search);
  if(filters.priority) params.append("priority", filters.priority);
  if(filters.category) params.append("category", filters.category);

  params.append("sortBy", filters.sortBy || "createdAt");
  params.append("direction", filters.direction || "asc");
  params.append("page", filters.page ?? 0);
  params.append("size", filters.size ?? 10);

  return axios.get(`${API_URL}?${params.toString()}`);
};

export const addTodo = (todo) => {
  return axios.post(API_URL, todo);
};

export const updateTodo = (id, changes) => {
  return axios.patch(`${API_URL}/${id}`, changes);
};

export const toggleTodo = (id, todo) => {
  return axios.put(`${API_URL}/${id}`, todo);
};

export const deleteTodo = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const deleteCompleted = async (todos) => {
  const completed = todos.filter((t) => t.completed);
  for (const todo of completed) {
    await deleteTodo(todo.id);
  }
};
