import { useEffect } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import styled from "styled-components";
import TodoList from "../../components/TodoList/TodoList";
import AddTodo from "../../components/AddTodo/AddTodo";
import {
  fetchTodos,
  setFilter,
  setSort,
  setLimit,
} from "../../store/reducers/todoListSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TodoPagination } from "../../components/TodoPagination/TodoPagination";
import { Link } from "react-router-dom";

const Wrapper = styled(Container)`
  margin-top: 32px;
`;

const ControlsWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
  flex: 1;
`;

export interface IAppProps {
  toggleTheme: () => void;
  isDark: boolean;
}

function HomePage({ toggleTheme, isDark }: IAppProps) {
  const dispatch = useAppDispatch();
  const { page, limit, filter, error, status, sort } = useAppSelector(
    (state) => state.todoList
  );

  useEffect(() => {
    dispatch(fetchTodos({ page, limit, filter }));
  }, [dispatch, page, limit, filter]);

  return (
    <Wrapper maxWidth="sm">
      <ControlsWrapper>
        <Typography variant="h4" component="h1">
          To-Do List
        </Typography>
        <Button component={Link} to="/profile" variant="outlined" size="small">
          Профиль
        </Button>

        <IconButton onClick={toggleTheme} color="inherit">
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </ControlsWrapper>

      <FilterGroup>
        <StyledFormControl size="small">
          <InputLabel>Фильтр</InputLabel>
          <Select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            label="Фильтр"
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="active">Активные</MenuItem>
            <MenuItem value="completed">Выполненные</MenuItem>
          </Select>
        </StyledFormControl>

        <StyledFormControl size="small">
          <InputLabel>Сортировка</InputLabel>
          <Select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            label="Сортировка"
          >
            <MenuItem value="newest">Новые сначала</MenuItem>
            <MenuItem value="oldest">Старые сначала</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledFormControl size="small">
          <InputLabel>Количество</InputLabel>
          <Select
            value={limit}
            onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
            label="На странице"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </StyledFormControl>
      </FilterGroup>

      <AddTodo />

      {status === "loading" && <p>Загрузка задач...</p>}
      {status === "failed" && <p>Ошибка загрузки: {error}</p>}
      {status === "success" && <TodoList />}
      <TodoPagination />
    </Wrapper>
  );
}

export default HomePage;
