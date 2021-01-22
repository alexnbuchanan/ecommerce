import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';

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
    setCost(items.price)
  }

  function priceUSD(change){
    return change.toFixed(2)
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
                              <input type="text" id="quantity" value={quantity}/>
                              <button className="btn plus-btn" type="button"
                                onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>

                            <button type="button">Add to shopping cart ${cost}</button>

                          </div>
                      ): (<ReactBootStrap.Spinner className="spinner" animation="border" />)
                    }
        </div>
      </div>
    );
}

export default Item;
