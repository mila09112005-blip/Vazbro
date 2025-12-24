import React from "react";
import { Link } from "react-router-dom";
import "../components/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Главная секция */}
      <section className="main-section">
        <div className="main-content">
          <h1 className="main-title">
            VAZ<span className="brand-highlight">BRO</span>
          </h1>
          <p className="main-subtitle">
            Запчасти для автомобилей ВАЗ с доставкой по России
          </p>
          
          <div className="main-buttons">
            <Link to="/products" className="main-btn">
              Смотреть каталог
            </Link>
            <Link to="/register" className="main-btn outline">
              Зарегистрироваться
            </Link>
          </div>
        </div>
        
        <div className="main-image">
          <div className="car-icon">🚗</div>
        </div>
      </section>

      {/* Три главных преимущества */}
      <section className="features-section">
        <div className="feature">
          <div className="feature-icon">✅</div>
          <h3>Оригинальные запчасти</h3>
          <p>Только сертифицированные детали от производителей</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Быстрая доставка</h3>
          <p>Отправка в день заказа. Доставка по всей России</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">💰</div>
          <h3>Лучшая цена</h3>
          <p>Цены ниже рыночных. Гарантия возврата средств</p>
        </div>
      </section>

      {/* Кнопка каталога */}
      <section className="catalog-section">
        <h2>Найдите нужную запчасть</h2>
        <Link to="/products" className="catalog-btn">
          Перейти в каталог →
        </Link>
      </section>

      {/* Секция с отзывами */}
      <section className="reviews-section">
        <h2 className="reviews-title">Что говорят наши клиенты</h2>
        
        <div className="reviews-container">
          <div className="review-card">
            <div className="review-text">
              "Заказывала тормозные колодки на Гранту. Пришли за 3 дня, оригинал. 
              Машина теперь тормозит как новая, очень довольна!"
            </div>
            <div className="review-author">
              <div className="author-avatar">ЮЗ</div>
              <div className="author-info">
                <h4>Юлия Зайчикова</h4>
                <p>LADA Granta</p>
              </div>
            </div>
          </div>
          
          <div className="review-card">
            <div className="review-text">
              "Пользуюсь VAZBRO полгода для своего СТО. Всегда в наличии нужные 
              детали, цены честные. Рекомендую всем!"
            </div>
            <div className="review-author">
              <div className="author-avatar">ЯБ</div>
              <div className="author-info">
                <h4>Ярослав Бородулин</h4>
                <p>Владелец СТО</p>
              </div>
            </div>
          </div>
          
          <div className="review-card">
            <div className="review-text">
              "Заказывал генератор на Весту. Цена в 1.5 раза ниже чем в магазинах 
              города. Доставили быстро, работает отлично!"
            </div>
            <div className="review-author">
              <div className="author-avatar">МС</div>
              <div className="author-info">
                <h4>Максим Солдатов</h4>
                <p>LADA Vesta</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;