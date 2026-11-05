import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

// Thumbnails use Unsplash photo URLs. Swap in your own images if you prefer.
const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('photo-1593482892290-f54927ae1bb6'), cost: 15 },
      { name: 'Spider Plant', image: img('photo-1572688484438-313a6e50c333'), cost: 12 },
      { name: 'Peace Lily', image: img('photo-1593691509543-c55fb32d8de5'), cost: 18 },
      { name: 'Boston Fern', image: img('photo-1616690248297-f6e3e7a4ef76'), cost: 14 },
      { name: 'Rubber Plant', image: img('photo-1602923668104-8f9e03e77e62'), cost: 20 },
      { name: 'Aloe Vera', image: img('photo-1596547609652-9cf5d8d76921'), cost: 10 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('photo-1499002238440-d264edd596ec'), cost: 16 },
      { name: 'Jasmine', image: img('photo-1592150621744-aca64f48394a'), cost: 17 },
      { name: 'Rosemary', image: img('photo-1515586000433-45406d8e6662'), cost: 11 },
      { name: 'Mint', image: img('photo-1628556270448-4d4e4148e1b1'), cost: 8 },
      { name: 'Lemon Balm', image: img('photo-1618164436241-4473940d1f5c'), cost: 9 },
      { name: 'Basil', image: img('photo-1618375569909-3c8616cf7733'), cost: 7 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: img('photo-1459156212016-c812468e2115'), cost: 9 },
      { name: 'Jade Plant', image: img('photo-1509423350716-97f9360b4e09'), cost: 13 },
      { name: 'Barrel Cactus', image: img('photo-1485955900006-10f4d324d411'), cost: 15 },
      { name: 'Haworthia', image: img('photo-1520412099551-62b6bafeb5bb'), cost: 10 },
      { name: 'Bunny Ear Cactus', image: img('photo-1459411552884-841db9b3cc2a'), cost: 12 },
      { name: 'String of Pearls', image: img('photo-1446071103084-c257b5f70672'), cost: 16 },
    ],
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Local record of which plants were added, so their buttons stay disabled.
  const [addedToCart, setAddedToCart] = useState({});

  // Total number of items in the cart, shown on the cart icon.
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  // A plant counts as added if it was added here or is already in the cart.
  // This also re-enables the button after the item is deleted from the cart.
  const isInCart = (name) =>
    cartItems.some((item) => item.name === name) && addedToCart[name] !== false;

  return (
    <div>
      {/* Navbar: Home, Plants, Cart */}
      <nav className="navbar">
        <span className="brand">Paradise Nursery</span>
        <div className="nav-links">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={onPlantsClick}>Plants</button>
          <button
            className="nav-link cart-icon"
            onClick={onCartClick}
            aria-label="Cart"
          >
            🛒
            <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      <div className="product-page">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => {
                const added = isInCart(plant.name);
                return (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={added}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
