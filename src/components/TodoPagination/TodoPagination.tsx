import Pagination from "@mui/material/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setPage } from "../../store/reducers/todoListSlice";

export const TodoPagination = () => {
  const dispatch = useAppDispatch();
  const { page, totalPages } = useAppSelector((state) => state.todoList);

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => dispatch(setPage(value))}
      color="primary"
    />
  );
};
