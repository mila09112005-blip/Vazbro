import { useEffect, useState } from "react";
import { getUsers, getAllProducts } from "../api/admin";
import { isAdmin } from "../utils/auth";

const Admin = () => {
  // Хуки объявляем всегда в начале
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isAdmin()) {          // можно проверку оставить тут
      getUsers().then(setUsers);
      getAllProducts().then(setProducts);
    }
  }, []);

  // Проверка роли делается здесь, в JSX
  if (!isAdmin()) {
    return <h2>Доступ запрещён</h2>;
  }

  return (
    <div>
      <h1>Админ-панель</h1>

      <h2>Статистика</h2>
      <p>Всего пользователей: {users.length}</p>
      <p>Всего товаров: {products.length}</p>

      <h2>Пользователи</h2>
      {users.map((user) => (
        <div key={user.id}>{user.username} — {user.role}</div>
      ))}

      <h2>Товары</h2>
      {products.map((product) => (
        <div key={product.id}>{product.title} — {product.price}</div>
      ))}
    </div>
  );
};

export default Admin;