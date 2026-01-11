import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/redux";
import { cancelEditing, editingTodo } from "../../store/reducers/todoListSlice";

interface IEditTodoProps {
  todo: {
    id: number;
    text: string;
  };
}

const EditWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const EditTodo: React.FC<IEditTodoProps> = ({ todo }) => {
  const [title, setTitle] = useState(todo.text);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Название задачи не может быть пустым");
      return;
    }
    dispatch(editingTodo({ id: todo.id, text: trimmed }));
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <EditWrapper>
      <TextField
        fullWidth
        size="small"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
        autoFocus
      />
      <IconButton
        onClick={handleSave}
        color="primary"
        size="small"
        aria-label="сохранить"
      >
        <CheckIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={handleCancel}
        color="secondary"
        size="small"
        aria-label="отменить"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </EditWrapper>
  );
};

export default EditTodo;
