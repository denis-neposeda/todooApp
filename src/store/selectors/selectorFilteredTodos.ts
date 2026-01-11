import { type RootState } from "../store";
import { createAppSelector } from "../../hooks/redux";

const selectTodoList = (state: RootState) => state.todoList.todos;

const selectSort = (state: RootState) => state.todoList.sort;

export const selectFilteredTodos = createAppSelector(
  [selectTodoList, selectSort],
  (todos, sort) => {
    let result = [...todos];

    result.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sort === "newest" ? bTime - aTime : aTime - bTime;
    });
    return result;
  }
);
