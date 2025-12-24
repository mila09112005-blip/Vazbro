import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Очищаем ошибку для этого поля
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    } else if (formData.username.length < 3) {
      newErrors.username = "Минимум 3 символа";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    
    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Минимум 6 символов";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      await register(formData.username, formData.email, formData.password);
      
      setMessage("Регистрация успешна! Вы будете перенаправлены на страницу входа...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      const errorData = error.response?.data;
      
      if (errorData) {
        // Обработка ошибок от Django
        if (errorData.username) {
          setErrors({ ...errors, username: Array.isArray(errorData.username) ? errorData.username[0] : errorData.username });
        }
        if (errorData.email) {
          setErrors({ ...errors, email: Array.isArray(errorData.email) ? errorData.email[0] : errorData.email });
        }
        if (errorData.password) {
          setErrors({ ...errors, password: Array.isArray(errorData.password) ? errorData.password[0] : errorData.password });
        }
        if (errorData.non_field_errors) {
          setMessage(Array.isArray(errorData.non_field_errors) ? errorData.non_field_errors[0] : errorData.non_field_errors);
        } else {
          setMessage("Ошибка регистрации. Попробуйте позже.");
        }
      } else {
        setMessage("Ошибка сервера. Попробуйте позже.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header-section">
            <div className="icon-circle">
              <span className="icon">📝</span>
            </div>
            <h2>Создание аккаунта</h2>
            <p className="register-subtitle">Зарегистрируйтесь для доступа ко всем возможностям</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="username">
                <span className="input-icon">👤</span>
                Имя пользователя *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Придумайте логин"
                value={formData.username}
                onChange={handleChange}
                className={`login-input ${errors.username ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email">
                <span className="input-icon">✉️</span>
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.ru"
                value={formData.email}
                onChange={handleChange}
                className={`login-input ${errors.email ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <span className="input-icon">🔒</span>
                Пароль *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Минимум 6 символов"
                value={formData.password}
                onChange={handleChange}
                className={`login-input ${errors.password ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">
                <span className="input-icon">✓</span>
                Подтверждение пароля *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`login-input ${errors.confirmPassword ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-terms">
              <label className="remember-me">
                <input type="checkbox" required />
                <span>
                  Я соглашаюсь с <Link to="/terms" className="forgot-password">условиями использования</Link> и <Link to="/privacy" className="forgot-password">политикой конфиденциальности</Link>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Регистрация...
                </>
              ) : "Зарегистрироваться"}
            </button>

            {message && (
              <div className={`message ${message.includes("успешна") ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </form>

          <div className="login-footer">
            <p>
              Уже есть аккаунт?{" "}
              <Link to="/login" className="register-link">
                Войти
              </Link>
            </p>
          </div>
        </div>

        <div className="login-sidebar">
          <div className="sidebar-promo">
            <h3>Преимущества регистрации</h3>
            <ul className="benefits-list">
              <li> Персональная скидка 10% на первый заказ</li>
              <li> История всех ваших покупок</li>
              <li> Быстрое оформление заказов в 1 клик</li>
              <li> Отслеживание статуса доставки</li>
              <li> Доступ к закрытым акциям и распродажам</li>
              <li> Бонусная программа накопительных скидок</li>
              <li> Сохранение нескольких адресов доставки</li>
              <li> Уведомления о поступлении товаров</li>
            </ul>
          </div>
          
          <div className="sidebar-cars">
            <h4>Нужна помощь?</h4>
            <div className="help-contacts">
              <p>📞 +7 (999) 123-45-67</p>
              <p>✉️ support@vazbro.ru</p>
              <p>🕒 Ежедневно с 9:00 до 21:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;