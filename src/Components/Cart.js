import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Cart() {
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
       const totalPriceReduce = totalPriceHolder.reduce((a, b) => a + b, 0).toFixed(2);
       return totalPriceReduce
    }

    function decreaseQuantity(index) {
      if (products[index]){
        setProducts(products.map((a, b) => {
            if (b === index) return {...a, quantity: a.quantity - 1}
            else return a
          }));
          products[index].quantity = products[index].quantity - 1;
          localStorage.setItem('product', JSON.stringify(products))
      }
    }

    function increaseQuantity(index) {
          if (products[index]){
            setProducts(
              products.map((a, b) => {
                if (b === index) return {...a, quantity: a.quantity + 1}
                else return a
              })
            )
            products[index].quantity = products[index].quantity + 1;
            localStorage.setItem('product', JSON.stringify(products))
          }
    }

    function removeItem(index){
      if (products[index]){
        setProducts(
          products.slice(0, index)
        );
        localStorage.setItem('product', JSON.stringify(products.slice(0, index)))
      }
    }

     if (products.length === 0){
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

        <p>Total Price: ${totalPrice(products)}</p>
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
