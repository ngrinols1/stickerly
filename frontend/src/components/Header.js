import React from 'react';
import './Header.css'; // Make sure to create and link your CSS file
import logo from './logo.png'

const Header = () => {
  return (
    <>
    <img className="logo" alt="tes" src={logo}></img>


    
    <header className="header">
      <div className="header-content">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="/shop" className="nav-link">Shop</a></li>
            <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
            <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
            <li className="nav-item"><a href="/cart" className="nav-link">Cart</a></li>
          </ul>
        </nav>
      </div>
    </header>
    </>
  );
}

export default Header;