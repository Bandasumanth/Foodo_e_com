import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './styles/Nav.css';

import {
  FaHome,
  FaTags,
  FaQuestionCircle,
  FaInfoCircle,
  FaShoppingCart,
  FaUserPlus,
  FaShoppingBasket,
  FaWifi
} from 'react-icons/fa';

import './styles/Nav.css';


const Nav = () => {
    const { getCartCount } = useCart();
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>🍽️ Foodo</h2>
      </div>
      
      <ul className="nav-center">
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/offers"><FaTags /> Offers</Link></li>
        <li><Link to="/help"><FaQuestionCircle /> Help</Link></li>
        <li><Link to="/about"><FaInfoCircle /> About</Link></li>
        <li><Link to="/status"><FaWifi /> Online Status</Link></li>
        <li><Link to="/grocery"><FaShoppingBasket /> Grocery</Link></li>
      </ul>
      
      <ul className="nav-right">
        <li>
          <Link to="/Register" className="register-button">
            <FaUserPlus /> Register
          </Link>
        </li>
        <li>
        <Link to="/cart" className="cart-icon-wrapper">
          🛒
          {getCartCount() > 0 && (
            <span className="cart-badge">{getCartCount()}</span>
          )}
        </Link>
        </li>
      </ul>
     
    </nav>
  );
};

export default Nav;
