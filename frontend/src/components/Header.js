import React from 'react';
import './Header.css'; // Make sure to create and link your CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Shop</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="/shop" className="nav-link">Shop</a></li>
            <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
            <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
            <li className='nav-item'><a href="/testing" className='nav-link'> Testing</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
