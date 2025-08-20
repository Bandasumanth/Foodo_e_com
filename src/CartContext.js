import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  
    const addToCart = (item) => setCart((prev) => [...prev, item]);
    const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
    const getTotalPrice = () => cart.reduce((total, item) => total + item.price, 0);
    const getCartCount = () => cart.length;
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, getCartCount }}>
        {children}
      </CartContext.Provider>
    );
  };
  

export const useCart = () => useContext(CartContext);
