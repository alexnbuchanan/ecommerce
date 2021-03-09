import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav';
import Shop from './Components/Shop';
import Info from './Components/Info';
import Cart from './Components/Cart';
import Item from './Components/Item';
import Checkout from './Components/CheckoutForm/Checkout';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { getQuantity } from './helpers/helperTools';

function App() {
    const storageItems = JSON.parse(localStorage.getItem('product'));
    const [qty, setQty] = useState({quantity: getQuantity(storageItems || [])});
    console.log("Apppp", qty)

    // useEffect(function() {
    //   setQty(storageItems.quantity);
    // }, []);

    // console.log(qty.quantity);
    // useContext oinstead of passing props!

    return (
      <Router>
        <div className="App">
          <Nav qty={qty.quantity} />

          <Route path="/" exact component={Shop} />
          <Route path="/Info" component={Info} />
          <Route path="/Cart/" render={(props) => <Cart {...props} setQty={setQty} />} />
          <Route path="/Item/:item" component={Item} />
          <Route path="/Checkout" render={(props) => <Checkout {...props} setQty={setQty} />} />

        </div>
      </Router>
    )
}

export default App;
