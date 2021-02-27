import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
/// import getQuantity from '../helpers/getQuantity';
/// import getTotal from '../helpers/getTotal';
import { getQuantity, getTotal } from '../helpers/helperTools';


function Cart({ setQty: setParentQty }) {
    const [products, setProducts] = useState([]);
    // const [qty, setQty] = useState(localQuantity);
    // const localQuantity = JSON.parse(localStorage.getItem('quantity'));

    console.log("SSSSS", products)

    function updateQty(products){
        /* var holder = 0;
        products.forEach((a, b) => {
          holder = holder + a.quantity
        })*/
        // setQty({quantity: holder})
        // localStorage.setItem('quantity', JSON.stringify({ quantity: newQty }))
        setParentQty({ quantity: getQuantity(products) });
      }

    useEffect(function() {
      const storageItems = JSON.parse(localStorage.getItem('product'));
      const products = storageItems || [];
      setProducts(products);
      updateQty(products);
    }, []);

    // useEffect(function() {
    //   // updateQty(products);
    // }, [products]);

    function decreaseQuantity(index) {
      if (products[index]){
        const newProducts = products.map((a, b) => {
          if (b === index) return {...a, quantity: a.quantity - 1}
          else return a
        });

        setProducts(newProducts);
        localStorage.setItem('product', JSON.stringify(newProducts))
        updateQty(newProducts)
      }
    }

    // Try to reduce the amount of code by creating more specific functions
    // that could take some argumnents to do slightly different things
    // make reusable functions/code! d
    // function saveProducts(products) {
    //   // ...
    //   localStorage.setItem('product', JSON.stringify(products))
    // }

    function increaseQuantity(index) {
        if (!products[index]) return;

        const newProducts = products.map((a, b) => {
          if (b === index) return {...a, quantity: a.quantity + 1}
          else return a
        })

        setProducts(newProducts)
        localStorage.setItem('product', JSON.stringify(newProducts))
        updateQty(newProducts);
    }

    function removeItem(index){
      const product = products[index];

      if (!product) return;

      const newProducts = products.filter((v, z) => z !== index);
      setProducts(newProducts);

      localStorage.setItem('product', JSON.stringify(newProducts));

      updateQty(newProducts);
    }

     if (products.length === 0) {
       return (
         <div className="App">
          <p>
            Cart Empty
          </p>
          <Link to={`/`}>
          <p>Continue shopping</p>
          </Link>
         </div>)
     }

    return (
      <div className="App">
        {products.map((item, index) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <img src={item.image} className="productImage"></img>
            <p>${(item.quantity * item.price).toFixed(2)}</p>

            <div className="quantity">
              <button className="btn minus-btn" type="button"
                onClick={item.quantity > 1 ? () => decreaseQuantity(index) : null}
              >-</button>
              <input type="text" id={item.id} placeholder={item.quantity}/>
              <button className="btn plus-btn" type="button"
                onClick={() => increaseQuantity(index)}
              >+</button>
            </div>
              <button type="button"
              onClick={() => removeItem(index)}>
              Remove</button>
          </div>
        ))}

        <p>Total Price: ${getTotal(products)}</p>
        <Link to={`/Checkout`}>
          <button>Proceed to checkout</button>
        </Link>
        <Link to={`/`}>
          <p>Continue shopping</p>
        </Link>
      </div>

    );
}

export default Cart;
