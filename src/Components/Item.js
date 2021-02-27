import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
//import saveProducts from '../helpers/saveProducts';
import { saveProducts } from '../helpers/helperTools';
// import { save, get } from '../helpers/fns';


function Item(props) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState([]);

  useEffect(async () => {
    fetchItems();
  }, [])

  const itemId = props.match.params.item;
  const fetchItems = async () => {
    const data = await fetch('https://fakestoreapi.com/products/' + itemId);
    const items = await data.json();
    setProduct(items)
    setLoading(true)
    setCost(items.price.toFixed(2))
  }

  function priceUSD(change){
    return change.toFixed(2)
  }

  function saveProduct(item) {
    const itemData = JSON.parse(localStorage.getItem('product')) || [];
    var obj = item;
    var duplicate = false;
    Object.assign(obj, {quantity})

    for (let i = 0; i < itemData.length; i++){
      if (itemData[i].title === obj.title){
        itemData[i]['quantity'] = itemData[i]['quantity'] + obj['quantity'];
        duplicate = true
      }
    }

    if (!duplicate){itemData.push(obj)}
    saveProducts(itemData);
    // localStorage.setItem('product', JSON.stringify(itemData));
    duplicate = false

    // const updatedQuantity = props.qty.quantity + quantity
    // localStorage.setItem('quantity', JSON.stringify({ quantity: updatedQuantity }))
    // props.setQty({ quantity: updatedQuantity })
  }

  useEffect(() => {
    const newCost = quantity * product.price;
    setCost(priceUSD(newCost))
  }, [quantity])

    return (
      <div className="App">
        <h2>Item</h2>
        <div className="gridContainer">
          {loading ?
                      (<div key={itemId} className="productStyle">
                            <img src={product.image} className="productImage"></img>
                            <p>{product.title}</p>
                            <p>{product.description}}</p>
                            <p>${priceUSD(product.price)}</p>

                            <div className="quantity">
                              <button className="btn minus-btn" type="button"
                                onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}>-</button>
                              <input type="text" id="quantity" placeholder={quantity}/>
                              <button className="btn plus-btn" type="button"
                                onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>

                            <Link to={`/Cart/`}>
                              <button onClick={() => saveProduct(product)} type="button">
                                Add to shopping cart ${cost}
                              </button>
                            </Link>

                          </div>
                      ): (<ReactBootStrap.Spinner className="spinner" animation="border" />)
                    }
        </div>
      </div>
    );
}

export default Item;
