import { createAppSelector } from "@/hooks";
import type { RootState } from "@/store";

const selectTodoList = (state: RootState) => state.todoList.todos;

const selectSort = (state: RootState) => state.todoList.sort;

export const selectSortTodos = createAppSelector(
  [selectTodoList, selectSort],
  (todos, sort) => {
    const result = [...todos];

    result.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sort === "newest" ? bTime - aTime : aTime - bTime;
    });
    return result;
  },
);
