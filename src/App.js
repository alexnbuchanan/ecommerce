import React, { useState } from 'react';
import './App.css';
import Nav from './Nav';
import Shop from './Components/Shop';
import Info from './Components/Info';
import Cart from './Components/Cart';
import Item from './Components/Item';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
      <Router>
        <div className="App">
          <Nav />

          <Route path="/" exact component={Shop} />
          <Route path="/Info" component={Info} />
          <Route path="/Cart" component={Cart} />
          <Route path="/Item" component={Item} />

        </div>
      </Router>
    )
}

export default App;
