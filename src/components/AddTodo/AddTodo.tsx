import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import { addNewTodo } from "../../store/reducers/todoListSlice";
import { useAppDispatch } from "../../hooks/redux";

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const AddTodo: React.FC = () => {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
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
        error={!!error}
        helperText={error}
      />
      <Button type="submit" variant="contained">
        Добавить
      </Button>
    </Form>
  );
};

export default AddTodo;
