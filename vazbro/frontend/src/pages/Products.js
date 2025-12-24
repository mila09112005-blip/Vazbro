import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/products";
import "../components/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Состояния для поиска и фильтрации
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // Категории для быстрого фильтра
  const quickCategories = [
    { id: "all", name: "Все", icon: "🚗" },
    { id: "engine", name: "Двигатель", icon: "⚙️" },
    { id: "brakes", name: "Тормоза", icon: "🛑" },
    { id: "suspension", name: "Подвеска", icon: "🔄" },
    { id: "electrics", name: "Электрика", icon: "🔌" },
  ];

  // Загрузка товаров с API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        console.log("API Response:", data);
        
        let productsArray = [];
        
        // Обработка разных форматов ответа
        if (Array.isArray(data)) {
          productsArray = data;
        } else if (data && Array.isArray(data.results)) {
          productsArray = data.results;
        } else if (data && Array.isArray(data.data)) {
          productsArray = data.data;
        } else {
          throw new Error("Неверный формат данных от API");
        }
        
        setProducts(productsArray);
        setFilteredProducts(productsArray);
        
        // Определяем максимальную цену
        if (productsArray.length > 0) {
          const maxPrice = Math.max(...productsArray.map(p => getProductPrice(p) || 0));
          setPriceRange(prev => ({ 
            ...prev, 
            max: Math.max(prev.max, maxPrice) 
          }));
        }
      } catch (err) {
        setError("Ошибка загрузки товаров");
        console.error("Error loading products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Вспомогательные функции для работы с продуктами
  const getProductName = (product) => {
    return product.title || product.name || "Без названия";
  };

  const getProductPrice = (product) => {
    return product.price || product.price_value || 0;
  };

  const getProductImage = (product) => {
    return product.image || product.image_url || product.photo;
  };

  const getProductInStock = (product) => {
    if (product.in_stock !== undefined) return product.in_stock;
    if (product.stock !== undefined) return product.stock > 0;
    if (product.quantity !== undefined) return product.quantity > 0;
    return true;
  };

  const getProductCategory = (product) => {
    if (product.category) return product.category;
    if (product.category_name) return product.category_name;
    
    const title = (product.title || product.name || "").toLowerCase();
    if (title.includes("тормоз")) return "Тормоза";
    if (title.includes("амортизатор") || title.includes("подвеск")) return "Подвеска";
    if (title.includes("стартер") || title.includes("генератор") || title.includes("аккумулятор")) return "Электрика";
    return "Двигатель";
  };

  // Фильтрация и поиск товаров
  useEffect(() => {
    if (!products.length) return;

    let filtered = [...products];

    // Поиск по тексту
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => {
        const name = getProductName(product).toLowerCase();
        return name.includes(query);
      });
    }

    // Фильтр по категории
    if (selectedCategory !== "all") {
      const categoryMap = {
        engine: "Двигатель",
        brakes: "Тормоза",
        suspension: "Подвеска",
        electrics: "Электрика",
      };
      filtered = filtered.filter(product => 
        getProductCategory(product) === categoryMap[selectedCategory]
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(product => {
      const price = getProductPrice(product);
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Сортировка
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => getProductPrice(a) - getProductPrice(b));
        break;
      case "price-high":
        filtered.sort((a, b) => getProductPrice(b) - getProductPrice(a));
        break;
      case "name":
        filtered.sort((a, b) => getProductName(a).localeCompare(getProductName(b)));
        break;
      default:
        // По популярности (цене как индикатор)
        filtered.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  // Обработчики
  const handleAddToCart = (product) => {
    alert(`Товар "${getProductName(product)}" добавлен в корзину!`);
  };

  const handleQuickView = (product) => {
    alert(`Быстрый просмотр: ${getProductName(product)}`);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => getProductPrice(p)));
      setPriceRange({ min: 0, max: maxPrice });
    }
  };

  // Если загрузка
  if (isLoading) {
    return (
      <div className="products-page">
        <div className="products-minimal-header">
          <h1>Каталог запчастей</h1>
        </div>
        <div className="loading-minimal">
          <div className="loading-spinner"></div>
          <p>Загружаем каталог...</p>
        </div>
      </div>
    );
  }

  // Если ошибка
  if (error) {
    return (
      <div className="products-page">
        <div className="products-minimal-header">
          <h1>Каталог запчастей</h1>
        </div>
        <div className="error-minimal">
          <div className="error-icon">⚠️</div>
          <h3>{error}</h3>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  // Если нет товаров
  if (products.length === 0) {
    return (
      <div className="products-page">
        <div className="products-minimal-header">
          <h1>Каталог запчастей</h1>
        </div>
        <div className="empty-catalog">
          <div className="empty-icon">📦</div>
          <h3>Каталог пуст</h3>
          <p>Товары скоро появятся</p>
          <Link to="/" className="home-link">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Минималистичный хедер с поиском */}
      <div className="products-minimal-header">
        <div className="header-content">
          <h1>Каталог запчастей</h1>
          <p>Оригинальные детали для ВАЗ</p>
        </div>
        
        {/* Поиск */}
        <div className="minimal-search-container">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Поиск запчастей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="minimal-search-input"
            />
            <button className="search-clear" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          </div>
          <button className="filters-toggle" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Скрыть фильтры" : "Фильтры"}
          </button>
        </div>
      </div>

      {/* Быстрые категории */}
      <div className="quick-categories">
        {quickCategories.map((category) => (
          <button
            key={category.id}
            className={`quick-category-btn ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Основной контент */}
      <div className="products-minimal-container">
        {/* Фильтры (скрывающиеся) */}
        {showFilters && (
          <div className="minimal-filters">
            <div className="filter-section">
              <h4>Цена, ₽</h4>
              <div className="price-range-minimal">
                <div className="price-inputs-minimal">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ 
                      ...prev, 
                      min: Math.max(0, parseInt(e.target.value) || 0)
                    }))}
                    className="price-input-minimal"
                    placeholder="от"
                  />
                  <span className="price-separator">—</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ 
                      ...prev, 
                      max: Math.max(priceRange.min, parseInt(e.target.value) || 0)
                    }))}
                    className="price-input-minimal"
                    placeholder="до"
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4>Сортировка</h4>
              <select
                className="sort-select-minimal"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">По популярности</option>
                <option value="price-low">Сначала дешевые</option>
                <option value="price-high">Сначала дорогие</option>
                <option value="name">По названию</option>
              </select>
            </div>

            <button className="reset-filters-minimal" onClick={handleResetFilters}>
              Сбросить всё
            </button>
          </div>
        )}

        {/* Сетка товаров */}
        <div className="products-minimal-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const productName = getProductName(product);
              const productPrice = getProductPrice(product);
              const productImage = getProductImage(product);
              const inStock = getProductInStock(product);
              const category = getProductCategory(product);

              return (
                <div key={product.id} className="product-minimal-card">
                  {/* Изображение товара */}
                  <div className="product-image-minimal">
                    {productImage ? (
                      <img 
                        src={productImage} 
                        alt={productName}
                        className="product-real-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`product-image-fallback ${productImage ? 'hidden' : ''}`}>
                      <div className="fallback-icon">🚗</div>
                    </div>
                    
                    {/* Категория */}
                    <div className="product-category-badge">
                      {category}
                    </div>
                    
                    {/* Наличие */}
                    {!inStock && (
                      <div className="out-of-stock-badge">Нет в наличии</div>
                    )}
                  </div>

                  {/* Информация о товаре */}
                  <div className="product-info-minimal">
                    <h3 className="product-title-minimal">{productName}</h3>
                    
                    {/* Цена - крупно и заметно */}
                    <div className="product-price-minimal">
                      {productPrice ? (
                        <>
                          <span className="price-amount">
                            {productPrice.toLocaleString()} ₽
                          </span>
                        </>
                      ) : (
                        <span className="price-not-available">Цена по запросу</span>
                      )}
                    </div>

                    {/* Кнопки */}
                    <div className="product-actions-minimal">
                      <button
                        className="add-to-cart-minimal"
                        onClick={() => handleAddToCart(product)}
                        disabled={!inStock}
                      >
                        {inStock ? "В корзину" : "Нет в наличии"}
                      </button>
                      <button
                        className="quick-view-minimal"
                        onClick={() => handleQuickView(product)}
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-products-minimal">
              <div className="no-products-icon">🔍</div>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить запрос или фильтры</p>
              <button className="reset-search-btn" onClick={handleResetFilters}>
                Сбросить поиск
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Статистика */}
      <div className="products-stats">
        <div className="stat-item">
          <div className="stat-number">{products.length}</div>
          <div className="stat-label">Всего товаров</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{filteredProducts.length}</div>
          <div className="stat-label">Найдено</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {Math.round(filteredProducts.length / products.length * 100)}%
          </div>
          <div className="stat-label">Соответствует фильтрам</div>
        </div>
      </div>
    </div>
  );
};

export default Products;