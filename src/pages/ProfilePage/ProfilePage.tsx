import { type FC, type FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  type AppDispatch,
  changePassword,
  fetchUserProfile,
  logoutUser,
  type RootState,
} from "@/store";

export const ProfilePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Новый пароль должен быть минимум 6 символов");
      return;
    }

    if (newPassword !== confirm) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      await dispatch(changePassword({ oldPassword, newPassword })).unwrap();

      setSuccess("Пароль успешно изменён");
      setOldPassword("");
      setNewPassword("");
      setConfirm("");
    } catch {
      setError("Ошибка смены пароля");
    }
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Профиль</h2>

      <p>Email: {user.email}</p>
      <p>Возраст: {user.age ?? "не указан"}</p>
      <p>Дата регистрации: {new Date(user.createdAt).toLocaleDateString()}</p>

      <hr />

      <form onSubmit={submitHandler}>
        <h3>Смена пароля</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input
          type="password"
          placeholder="Старый пароль"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button type="submit" disabled={status === "loading"}>
          Обновить пароль
        </button>

        <button onClick={logoutHandler}>Выйти из аккаунта</button>
      </form>
    </div>
  );
};
