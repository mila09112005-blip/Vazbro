import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import "./Header.css"; // Импортируем стили Header

const Header = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("access");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Логотип и бренд */}
        <div className="header-brand">
          <div className="logo">
            <span className="logo-icon">🚗</span>
            <div className="logo-text">
              <h1 className="logo-title">VAZ<span className="logo-highlight">BRO</span></h1>
              <p className="logo-subtitle">Оригинальные запчасти для ВАЗ</p>
            </div>
          </div>
        </div>

        {/* Навигация */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/products" className="nav-link">Товары</Link>
          <Link to="/about" className="nav-link">О нас</Link>
          
          {!isAuth ? (
            <>
              <Link to="/login" className="nav-link">Вход</Link>
              <Link to="/register" className="nav-link register-button">
                Регистрация
              </Link>
            </>
          ) : (
            <>
              <Link to="/admin" className="nav-link">Админка</Link>
              <button onClick={handleLogout} className="logout-button">
                Выход
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;