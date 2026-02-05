import type { FC } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, IconButton, Typography } from "@mui/material";

import {
  Actions,
  EditTodo,
  StyledCardContent,
  Title,
  TodoCard,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { removeTodo, startEditing, toggleTodo } from "@/store";
import type { ITodo } from "@/types";

interface ITodoItemProps {
  todo: ITodo;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(
    (state) => state.todoList.editingId === todo.id,
  );

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };

  const handleStartEdit = () => {
    dispatch(startEditing(todo.id));
  };

  return (
    <TodoCard>
      <Checkbox checked={todo.completed} onChange={handleToggle} />
      <StyledCardContent>
        {isEditing ? (
          <EditTodo todo={todo} />
        ) : (
          <>
            <Title $completed={todo.completed}>{todo.text}</Title>
            <Typography variant="caption" color="text.secondary">
              Создано: {formatDate(todo.createdAt)}
            </Typography>
          </>
        )}
      </StyledCardContent>

      <Actions>
        {!isEditing && (
          <IconButton
            onClick={handleStartEdit}
            color="primary"
            size="small"
            aria-label="редактировать"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton
          onClick={handleRemove}
          color="error"
          size="small"
          aria-label="удалить"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Actions>
    </TodoCard>
  );
};
