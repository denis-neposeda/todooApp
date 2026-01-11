import TodoItem from "../TodoItem/TodoItem";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/redux";
import { selectFilteredTodos } from "../../store/selectors/selectorFilteredTodos";

const Wrapper = styled.div`
  margin-top: 16px;
`;

const EmptyMessage = styled(Typography)`
  padding-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const TodoList: React.FC = () => {
  const todos = useAppSelector(selectFilteredTodos);

  if (todos.length === 0) {
    return <EmptyMessage>Нет задач</EmptyMessage>;
  }

  return (
    <Wrapper>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Wrapper>
  );
};

export default TodoList;
