import React, { useState } from 'react';
import './App.css';
import {Link} from 'react-router-dom'

function Nav() {
    return (
      <nav className="Nav">
        <h3>Logo</h3>
        <ul className="nav-links">
          <Link to="/">
            <li>Shop</li>
          </Link>
          <Link to="/info">
            <li>Info</li>
          </Link>
          <Link to="/cart">
            <li>Cart</li>
          </Link>
        </ul>
      </nav>
  )
}

export default Nav;
