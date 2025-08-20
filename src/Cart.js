import React from 'react';
import { useCart } from './CartContext';
import './styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) return;

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your key
      amount: getTotalPrice() * 100,
      currency: "INR",
      name: "Food Delivery",
      description: "Thank you for your order",
      handler: function (response) {
        alert('Payment Success');
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#f75d34"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>⭐ {item.rating}</p>
                <p>₹{item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ₹{getTotalPrice()}</h3>
            <button onClick={handlePayment}>Pay with Razorpay</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
