import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';

function App() {
  // 'landing' | 'plants' | 'cart'
  const [page, setPage] = useState('landing');

  return (
    <div className="app">
      {page === 'landing' && (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button
              className="get-started-button"
              onClick={() => setPage('plants')}
            >
              Get Started
            </button>
          </div>
          <div className="about-us-container">
            <AboutUs />
          </div>
        </div>
      )}

      {page === 'plants' && (
        <ProductList
          onHomeClick={() => setPage('landing')}
          onPlantsClick={() => setPage('plants')}
          onCartClick={() => setPage('cart')}
        />
      )}

      {page === 'cart' && (
        <CartItem
          onHomeClick={() => setPage('landing')}
          onPlantsClick={() => setPage('plants')}
          onCartClick={() => setPage('cart')}
          onContinueShopping={() => setPage('plants')}
        />
      )}
    </div>
  );
}

export default App;
