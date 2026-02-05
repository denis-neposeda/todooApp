import { type FC, type KeyboardEvent, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextField } from "@mui/material";

import { EditWrapper } from "@/components";
import { useAppDispatch } from "@/hooks";
import { cancelEditing, editingTodo } from "@/store";

interface IEditTodoProps {
  todo: {
    id: number;
    text: string;
  };
}

export const EditTodo: FC<IEditTodoProps> = ({ todo }) => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        error={error.length > 0}
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
