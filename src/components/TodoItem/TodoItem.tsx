import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import EditTodo from "../EditTodo/EditTodo";
import type { ITodo } from "../../models/ITodo";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  removeTodo,
  startEditing,
  toggleTodo,
} from "../../store/reducers/todoListSlice";

interface ITodoItemProps {
  todo: ITodo;
}

const TodoCard = styled(Card)`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding: 8px;
`;

const StyledCardContent = styled(CardContent)`
  flex: 1;
  padding: 0;
`;

const Title = styled(Typography)<{ $completed?: boolean }>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  color: ${({ theme, $completed }) =>
    $completed ? theme.palette.text.secondary : theme.palette.text.primary};
`;

const Actions = styled.div`
  display: flex;
  gap: 4px;
`;

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

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(
    (state) => state.todoList.editingId === todo.id
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

export default TodoItem;
