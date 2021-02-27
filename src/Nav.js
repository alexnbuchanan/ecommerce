import React, { useState, useEffect } from 'react';
import './App.css';
import {Link} from 'react-router-dom'

function Nav({ qty }) {

    // useEffect(function() {
    //   function getQty() {
    //     const storageItems = JSON.parse(localStorage.getItem('quantity'));
    //     console.log(storageItems)
    //     setQty(storageItems.quantity);
    //   }
    //   getQty();
    // }, []);

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
            <li>Cart {qty}</li>
          </Link>
        </ul>
      </nav>
  )
}

export default Nav;
