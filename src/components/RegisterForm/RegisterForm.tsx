import { type FC, type FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { type AppDispatch, fetchUserProfile, registerUser } from "@/store";
import { isApiError } from "@/types";

export const RegisterForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [error, setError] = useState("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || password.length < 6) {
      setError("Некорректные данные");
      return;
    }

    try {
      await dispatch(
        registerUser({
          email,
          password,
        }),
      ).unwrap();

      await dispatch(fetchUserProfile()).unwrap();
      navigate("/");
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(err.message || err.error || "Ошибка регистрации");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Регистрация</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Пароль (мин. 6 символов)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="number"
        placeholder="Возраст"
        value={age}
        onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
      />

      <button type="submit">Зарегистрироваться</button>

      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
};
