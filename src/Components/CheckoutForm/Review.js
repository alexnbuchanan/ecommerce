import React, { useState, useEffect } from 'react';
import {Typography, List, ListItem, ListItemText} from '@material-ui/core';
// import getTotal from './../../helpers/getTotal';
import { getTotal } from './../../helpers/helperTools';

function Review(){

  const [products, setProducts] = useState([]);

  useEffect(function() {
    const storageItems = JSON.parse(localStorage.getItem('product'));
    setProducts(storageItems || []);
  }, []);


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
              <p>${getTotal(products)}</p>
            </Typography>
          </ListItem>

      </List>
    </div>
  );
}

export default Review;
