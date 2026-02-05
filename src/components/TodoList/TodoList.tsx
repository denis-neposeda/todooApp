import type { FC } from "react";

import { EmptyMessage, TodoItem, WrapperTodoList } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectSortTodos } from "@/store";

export const TodoList: FC = () => {
  const todos = useAppSelector(selectSortTodos);

  if (todos.length === 0) {
    return <EmptyMessage>Нет задач</EmptyMessage>;
  }

  return (
    <WrapperTodoList>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </WrapperTodoList>
  );
};
