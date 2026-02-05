import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  addNewTodoApi,
  editingTodoApi,
  fetchTodosRequest,
  removeTodoApi,
  type TodosResponse,
  toggleTodoApi,
} from "@/api";
import type { ITodo } from "@/types";

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest";
type StatusType = "idle" | "loading" | "success" | "failed";

interface ITodoListState {
  todos: ITodo[];
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  filter: FilterType;
  sort: SortType;
  editingId: number | null;
  status: StatusType;
  error: string | null;
  total: number;
}

export const fetchTodos = createAsyncThunk<
  TodosResponse,
  { page: number; limit: number; filter: FilterType }
>("todoList/fetchTodos", async ({ page, limit, filter }) => {
  return await fetchTodosRequest(page, limit, filter);
});

export const addNewTodo = createAsyncThunk<ITodo, string>(
  "todoList/addNewTodo",
  async (text) => {
    return await addNewTodoApi(text);
  },
);

export const removeTodo = createAsyncThunk<number, number>(
  "todoList/removeTodo",
  async (id) => {
    return await removeTodoApi(id);
  },
);

export const toggleTodo = createAsyncThunk<ITodo, number>(
  "todoList/toggleTodo",
  async (id) => {
    return await toggleTodoApi(id);
  },
);

export const editingTodo = createAsyncThunk<
  ITodo,
  { id: number; text: string }
>("todoList/editingTodo", async ({ id, text }) => {
  return await editingTodoApi(id, text);
});

const initialState: ITodoListState = {
  todos: [],
  filter: "all",
  sort: "newest",
  editingId: null,
  status: "idle",
  error: null,
  isLoading: false,
  limit: 10,
  page: 1,
  totalPages: 1,
  total: 0,
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setEdit: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.title;
      }
      state.editingId = null;
    },
    startEditing: (state, action: PayloadAction<number>) => {
      state.editingId = action.payload;
    },
    cancelEditing: (state) => {
      state.editingId = null;
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
      state.page = 1;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.todos = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error";
        state.todos = [];
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.todos.unshift(action.payload);
        state.total += 1;
        state.totalPages = Math.ceil(state.total / state.limit);
        if (state.todos.length > state.limit) {
          state.todos.pop();
        }
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.error = action.payload
          ? String(action.payload)
          : "Не удалось добавить задачу";
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        );
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(editingTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        );
        state.editingId = null;
      });
  },
});

export const {
  setEdit,
  setFilter,
  setSort,
  startEditing,
  cancelEditing,
  setPage,
  setLimit,
} = todoListSlice.actions;
export const todoListReducer = todoListSlice.reducer;
