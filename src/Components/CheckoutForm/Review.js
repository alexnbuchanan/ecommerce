import React, { useState, useEffect } from 'react';
import {Typography, List, ListItem, ListItemText} from '@material-ui/core';

function Review(){

  const [products, setProducts] = useState([]);

  useEffect(function() {
    const storageItems = JSON.parse(localStorage.getItem('product'));
    setProducts(storageItems || []);
  }, []);

  function totalPrice(storageItems, stringToIntTotal){
    const totalPriceHolder = []
    storageItems.map((a, index) => {
      const totalPrice = a.price * a.quantity;
      totalPriceHolder.push(parseInt(totalPrice, 10))
    })
     return totalPriceHolder.reduce((a, b) => a + b, 0).toFixed(2)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Order summary</Typography>
      <List disablePadding>
        {products.map((product) => (
            <ListItem style={{padding: '10px 0'}} key={product.name}>
              <ListItemText primary={product.title} secondary={`Quantity: ${product.quantity}`} />
              <Typography variant="body2"><p>${(product.quantity * product.price).toFixed(2)}</p></Typography>
            </ListItem>
          ))}
          <ListItem style={{padding: '10px 0'}}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{fontWeight: 700}}>
              <p>${totalPrice(products)}</p>
            </Typography>
          </ListItem>

      </List>
    </div>
  );
}

export default Review;
