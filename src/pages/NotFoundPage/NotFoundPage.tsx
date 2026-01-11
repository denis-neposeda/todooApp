import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>404</h1>
      <h2>Страница не найдена</h2>

      <p>Такой страницы не существует или у вас нет к ней доступа.</p>

      <Link to="/">
        <button>На главную</button>
      </Link>
    </div>
  );
}
