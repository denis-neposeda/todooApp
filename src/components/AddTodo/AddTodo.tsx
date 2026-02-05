import { type FC, type FormEvent, useState } from "react";

import { Button, TextField } from "@mui/material";

import { Form } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addNewTodo } from "@/store";

export const AddTodo: FC = () => {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Название задачи не может быть пустым");
      return;
    }
    dispatch(addNewTodo(trimmed));
    setTitle("");
    setError("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Новая задача"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите название задачи"
        error={error.length > 0}
        helperText={error}
      />
      <Button type="submit" variant="contained">
        Добавить
      </Button>
    </Form>
  );
};
