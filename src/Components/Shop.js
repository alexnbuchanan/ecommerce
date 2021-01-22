import React, { useState, useEffect } from 'react';
import './../App.css';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Shop() {

const [products, setProducts] = useState([]);
const [filterProducts, setFilteredProducts] = useState([]);
const [item, setItem] = useState('');
const [currentSort, setCurrentSort] = useState('');
const [loading, setLoading] = useState(false);
console.log(products)
useEffect(async () => {
  fetchItems();
}, [])

const fetchItems = async () => {
  const data = await fetch('https://fakestoreapi.com/products');
  const items = await data.json();
  setProducts(items)
  setLoading(true)
}
function priceUSD(change){
  return change.toFixed(2)
}

useEffect(() => {
  const filteredItems = products.filter((a) => {
    if (item === '') {return a} else {return a.category === item}
  });
  setFilteredProducts(filteredItems);
}, [item, products])

 useEffect(() => {
  if (currentSort === '') {
    return
  }
  const sortedItems = filterProducts.sort((a, b) => {
    return currentSort === 'ASE' ? a.price - b.price : b.price - a.price
  });
  setFilteredProducts([...sortedItems]);
}, [currentSort])

console.log(products)
    return (
        <div>
          <div className="itemSort">
            <p onClick={() => setItem("")}>All items</p>
            <p onClick={() => setItem("men clothing")}>Men clothing</p>
            <p onClick={() => setItem("women clothing")}>Women clothing</p>
            <p onClick={() => setItem("jewelery")}>Jewelery</p>
            <p onClick={() => setItem("electronics")}>Electronics</p>
          </div>

          <div className="itemSort">
            <p>Order by price</p>
            <p onClick={() => setCurrentSort('DESC')}>Highest</p>
            <p onClick={() => setCurrentSort('ASE')}>Lowest</p>
          </div>

            <div className="gridContainer">
              {loading ?
                          (filterProducts.map((a, index) => (
                            <Link to={`/Item/${a.id}`}>
                              <div key={index} className="productStyle">
                                <img src={a.image} className="productImage"></img>
                                <p>{a.title}</p>
                                <p>${priceUSD(a.price)}</p>
                              </div>
                            </Link>
                        )))  : (<ReactBootStrap.Spinner className="spinner" animation="border" />)
                        }
            </div>
        </div>
    )
}

export default Shop;
