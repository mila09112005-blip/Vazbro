import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const data = await login(username, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setMessage("Вход выполнен успешно!");
      
      // Редирект через 1.5 секунды
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error) {
      setMessage(error.response?.data?.detail || "Ошибка входа. Проверьте данные.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header-section">
            <div className="icon-circle">
              <span className="icon">🔑</span>
            </div>
            <h2>Вход в личный кабинет</h2>
            <p className="login-subtitle">Войдите для доступа к заказам и персональным скидкам</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label>
                <span className="input-icon">👤</span>
                Имя пользователя
              </label>
              <input
                type="text"
                placeholder="Введите ваш логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="login-input"
              />
            </div>

            <div className="input-group">
              <label>
                <span className="input-icon">🔒</span>
                Пароль
              </label>
              <input
                type="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="login-input"
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Запомнить меня</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Забыли пароль?
              </Link>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Вход...
                </>
              ) : "Войти"}
            </button>

            {message && (
              <div className={`message ${message.includes("успешно") ? "success" : "error"}`}>
                {message}
              </div>
            )}
          </form>

          <div className="login-footer">
            <p>
              Ещё нет аккаунта?{" "}
              <Link to="/register" className="register-link">
                Зарегистрироваться
              </Link>
            </p>
            <div className="login-benefits">
              <span>✓ Персональные скидки</span>
              <span>✓ История заказов</span>
              <span>✓ Быстрое оформление</span>
            </div>
          </div>
        </div>

        <div className="login-sidebar">
          <div className="sidebar-promo">
            <h3>Почему выбирают нас?</h3>
            <ul className="benefits-list">
              <li> Оригинальные запчасти ВАЗ</li>
              <li> Гарантия качества 1 год</li>
              <li> Доставка по всей России</li>
              <li> Скидка 10% новым клиентам</li>
              <li> Техническая поддержка 24/7</li>
            </ul>
          </div>
          
          <div className="sidebar-cars">
            <h4>Запчасти для моделей:</h4>
            <div className="car-models">
              <span className="car-model">LADA Granta</span>
              <span className="car-model">LADA Vesta</span>
              <span className="car-model">LADA Niva</span>
              <span className="car-model">ВАЗ-2110</span>
              <span className="car-model">ВАЗ-2109</span>
              <span className="car-model">ВАЗ-2107</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;