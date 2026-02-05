import { type FC, type FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { type AppDispatch, fetchUserProfile, loginUser } from "@/store";
import { isApiError } from "@/types";

export const LoginForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchUserProfile());
      navigate("/");
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(err.message || err.error || "Ошибка входа");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Вход</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Войти</button>

      <p>
        Нет аккаунта? <Link to="/register">Регистрация</Link>
      </p>
    </form>
  );
};
