import { api } from "./api";

import type { FilterType } from "@/store";
import type { ITodo } from "@/types";

export const API_URL = "http://localhost:3001";

export interface TodosResponse {
  data: ITodo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fetchTodosRequest = async (
  page: number,
  limit: number,
  filter: FilterType,
): Promise<TodosResponse> => {
  const response = await api.get(
    `${API_URL}/todos?page=${page}&limit=${limit}&filter=${filter}`,
  );
  return response.data;
};

export const addNewTodoApi = async (text: string): Promise<ITodo> => {
  const response = await api.post(`${API_URL}/todos`, { text });
  return response.data;
};

export const removeTodoApi = async (id: number) => {
  await api.delete(`${API_URL}/todos/${id}`);
  return id;
};

export const editingTodoApi = async (id: number, text: string) => {
  const response = await api.put(`${API_URL}/todos/${id}`, { text });
  return response.data;
};

export const toggleTodoApi = async (id: number) => {
  const response = await api.patch(`${API_URL}/todos/${id}/toggle`);
  return response.data;
};
