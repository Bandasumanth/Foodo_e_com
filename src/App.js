// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import Nav from './Nav'
import Register from './Register';
import Footer from './Footer';
const App = () => (
  <CartProvider>
    <Router>
      <Nav className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Footer' element={<Footer/>}/>
      </Routes>
      <Footer />
    </Router>
  </CartProvider>
);

export default App;
