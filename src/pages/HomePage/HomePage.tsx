import { type FC, useEffect } from "react";
import { Link } from "react-router-dom";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import {
  ControlsWrapper,
  FilterGroup,
  StyledFormControl,
  WrapperHomePage,
} from "./HomePage.styled";

import { AddTodo, TodoList, TodoPagination } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchTodos, setFilter, setLimit, setSort } from "@/store";

export interface IAppProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const HomePage: FC<IAppProps> = ({ toggleTheme, isDark }: IAppProps) => {
  const dispatch = useAppDispatch();
  const { page, limit, filter, error, status, sort } = useAppSelector(
    (state) => state.todoList,
  );

  useEffect(() => {
    dispatch(fetchTodos({ page, limit, filter }));
  }, [dispatch, page, limit, filter]);

  return (
    <WrapperHomePage maxWidth="sm">
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
    </WrapperHomePage>
  );
};
