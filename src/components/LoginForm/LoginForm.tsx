import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchUserProfile, loginUser } from "../../store/reducers/authSlice";
import type { AppDispatch } from "../../store/store";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || password.length < 6) {
      setError("Введите корректные данные");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchUserProfile());
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Ошибка входа");
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
}
