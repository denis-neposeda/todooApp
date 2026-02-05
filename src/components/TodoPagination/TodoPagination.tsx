import type { FC } from "react";

import Pagination from "@mui/material/Pagination";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setPage } from "@/store";

export const TodoPagination: FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.todoList.page);
  const totalPages = useAppSelector((state) => state.todoList.totalPages);

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => dispatch(setPage(value))}
      color="primary"
    />
  );
};
