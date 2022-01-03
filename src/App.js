import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav';
import Shop from './Components/Shop';
import Info from './Components/Info';
import Cart from './Components/Cart';
import Item from './Components/Item';
import Homepage from './Components/Homepage';
import Checkout from './Components/CheckoutForm/Checkout';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { getQuantity } from './helpers/helperTools';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';

const font =  "Inter";

const theme = createMuiTheme({
  typography: {
    fontFamily: font
    }
})

function App() {
    const storageItems = JSON.parse(localStorage.getItem('product'));
    const [qty, setQty] = useState({quantity: getQuantity(storageItems || [])});


    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Nav qty={qty.quantity} />

            <Route path="/" exact component={Homepage} />         
            <Route path="/Shop" exact component={Shop} />
            <Route path="/Info" component={Info} />
            <Route path="/Cart/" render={(props) => <Cart {...props} setQty={setQty} />} />
            <Route path="/Item/:item" component={Item} />
            <Route path="/Checkout" render={(props) => <Checkout {...props} setQty={setQty} />} />
          </div>
        </Router>
      </ThemeProvider>
    )
}

export default App;
