import React, { useState } from "react";
import './_burgerMenu.scss'; // Import the CSS file for styling

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);  // Toggle between open and closed state
  };

  return (
    <div className="burger-menu-container">
      {/* Burger Icon */}
      <div className={`burger-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      {/* Menu Items */}
      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#home">Create new character</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;
