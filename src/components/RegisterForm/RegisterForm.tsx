import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, fetchUserProfile } from "../../store/reducers/authSlice";
import type { AppDispatch } from "../../store/store";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
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
          age: age === "" ? undefined : age,
        })
      ).unwrap();

      await dispatch(fetchUserProfile());
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Ошибка регистрации");
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
}
