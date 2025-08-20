import React, { useEffect, useState, useRef } from 'react';
import './styles/Home.css';
import { useCart } from './CartContext';

const ITEMS_PER_PAGE = 7;

const Home = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const sliderRef = useRef(null);
  const { addToCart, cartCount } = useCart();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes');
        const json = await res.json();
        setData(json.recipes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedData = filterRating
    ? filteredData.filter((item) => item.rating >= 4.5)
    : filteredData;

  const next = () => {
    if (currentIndex + ITEMS_PER_PAGE < displayedData.length) {
      setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const prev = () => {
    if (currentIndex - ITEMS_PER_PAGE >= 0) {
      setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setPopupMessage(`${item.name} added to cart!`);
    setTimeout(() => setPopupMessage(''), 2000);
  };

  const getTransformValue = () => {
    return `translateX(-${currentIndex * (100 / ITEMS_PER_PAGE)}%)`;
  };

  return (
    <div className="home-container">
      {/* Search */}
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search your favourite food here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* Popup Message */}
      {popupMessage && <div className="popup">{popupMessage}</div>}

      {/* What's on your mind carousel */}
      <div className="food-gallery">
        <h2>What's on your mind?</h2>
        {loading ? (
          <div className="loading">
            <div className="spinner">🍽️</div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="carousel-container">
            <span className="arrow" onClick={prev}>&#9664;</span>
            <div className="slider-window">
              <div
                className="food-items"
                ref={sliderRef}
                style={{
                  transform: getTransformValue(),
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {displayedData.map((item) => (
                  <div key={item.id} className="food-card">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <span className="arrow" onClick={next}>&#9654;</span>
          </div>
        )}
      </div>

      {/* Restaurant Filters and Add to Cart Section */}
      <div className="filters-section">
        <span className="section-title">Restaurants with online food delivery</span>
        <div className="filter-buttons">
          <button onClick={() => setFilterRating(true)}>Ratings 4.5+</button>
          <button onClick={() => setFilterRating(false)}>Reset Filter</button>
        </div>

        <div className="food-listing">
          {displayedData.map((item) => (
            <div key={item.id} className="food-card-large">
              <img src={item.image} alt={item.name} />
              <div className="info">
                <p className="food-title">{item.name}</p>
                <p className="rating">⭐ {item.rating}</p>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
