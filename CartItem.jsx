import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onHomeClick, onPlantsClick, onCartClick, onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of items, shown on the cart icon
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost for one plant type (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for everything in the cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Going below 1 removes the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div>
      {/* Navbar: Home, Plants, Cart (same as the product page) */}
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

      <div className="cart-page">
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button className="continue-button" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <p className="cart-total">
              Total Cart Amount: ${calculateTotalAmount()}
            </p>

            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                {/* Thumbnail */}
                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  {/* Name and unit price */}
                  <h3>{item.name}</h3>
                  <p>Unit price: ${item.cost}</p>

                  {/* Quantity controls */}
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  {/* Total cost for this plant */}
                  <p>
                    <strong>Total: ${calculateTotalCost(item)}</strong>
                  </p>
                </div>

                {/* Delete */}
                <button
                  className="delete-button"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="cart-actions">
              <button className="continue-button" onClick={onContinueShopping}>
                Continue Shopping
              </button>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
