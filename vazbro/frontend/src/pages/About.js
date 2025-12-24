import React from "react";
import "../components/Home.css";

const About = () => {
  return (
    <div className="home-page">
      {/* Герой-секция */}
      <section className="main-section">
        <div className="main-content">
          <h1 className="main-title">
            О <span className="brand-highlight">VAZBRO</span>
          </h1>
          <p className="main-subtitle">
            Более 3 лет обеспечиваем владельцев ВАЗ качественными запчастями
          </p>
        </div>
        
        <div className="main-image">
          <div className="car-icon">🏢</div>
        </div>
      </section>

      {/* Наша история */}
      <section className="about-story">
        <div className="story-content">
          <h2>Наша история</h2>
          <p>
            VAZBRO был основан в 2021 году группой энтузиастов, уставших от сложностей 
            с поиском качественных запчастей для своих автомобилей ВАЗ. Начиная как 
            небольшой магазин в Ульяновске, сегодня мы стали одним из лидеров по продаже 
            автозапчастей для ВАЗ в России.
          </p>
          <p>
            За 4 года работы мы отправили более 50,000 заказов в 150+ городов России 
            и получили более 10,000 положительных отзывов от довольных клиентов.
          </p>
        </div>
        
        <div className="story-stats">
          <div className="stat-card">
            <div className="stat-number">3+</div>
            <div className="stat-text">года на рынке</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-text">выполненных заказов</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">150+</div>
            <div className="stat-text">городов доставки</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-text">довольных клиентов</div>
          </div>
        </div>
      </section>

      {/* Наша миссия */}
      <section className="mission-section">
        <h2>Наша миссия и ценности</h2>
        <div className="mission-content">
          <div className="mission-card">
            <div className="mission-icon">🎯</div>
            <h3>Миссия</h3>
            <p>
              Сделать обслуживание автомобилей ВАЗ доступным, надежным и простым 
              для каждого владельца. Мы стремимся быть партнером, которому можно 
              доверять в вопросах автозапчастей.
            </p>
          </div>
          
          <div className="values-list">
            <h3>Наши ценности</h3>
            <div className="value-item">
              <div className="value-icon">✅</div>
              <div>
                <h4>Качество</h4>
                <p>Только оригинальные и сертифицированные запчасти</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <div>
                <h4>Надежность</h4>
                <p>Гарантия на все товары и честные условия возврата</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <div>
                <h4>Скорость</h4>
                <p>Отправка в день заказа и быстрая доставка</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">💬</div>
              <div>
                <h4>Поддержка</h4>
                <p>Профессиональные консультации и помощь в подборе</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="team-section">
        <h2>Наша команда</h2>
        <p className="team-description">
          За VAZBRO стоит команда профессионалов, которые сами являются 
          владельцами автомобилей ВАЗ и понимают ваши потребности
        </p>
        
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">ГБ</div>
            <h3>Глеб Бородулин</h3>
            <p className="member-role">Основатель, технический директор</p>
            <p className="member-bio">
              более 5 лет опыта в автосервисе. Знает о ВАЗ все
            </p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">МЗ</div>
            <h3>Мария Зайчикова</h3>
            <p className="member-role">Директор по продажам</p>
            <p className="member-bio">
              Помогла более 5000 клиентам подобрать запчасти
            </p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">МЖ</div>
            <h3>Максим Журавлёв</h3>
            <p className="member-role">Специалист по логистике</p>
            <p className="member-bio">
              Организует быструю доставку в любой регион
            </p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">АЗ</div>
            <h3>Анастасия Зайчикова</h3>
            <p className="member-role">Менеджер по работе с клиентами</p>
            <p className="member-bio">
              Всегда на связи, чтобы помочь с любым вопросом
            </p>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="contacts-section">
        <div className="contacts-content">
          <h2>Контакты</h2>
          
          <div className="contacts-grid">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Адрес</h3>
              <p>г. Ульяновск, ул. Автозапчастей, 123</p>
              <p className="contact-note">Самовывоз: Пн-Пт 9:00-20:00</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Телефоны</h3>
              <p>+7 (999) 123-45-67</p>
              <p>+7 (800) 123-35-35</p>
              <p className="contact-note">Бесплатный по России</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Электронная почта</h3>
              <p>info@vazbro.ru</p>
              <p>support@vazbro.ru</p>
              <p className="contact-note">Ответ в течение 2 часов</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">🕒</div>
              <h3>Время работы</h3>
              <p>Пн-Пт: 9:00-20:00</p>
              <p>Сб-Вс: 10:00-18:00</p>
              <p className="contact-note">Доставка работает ежедневно</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;