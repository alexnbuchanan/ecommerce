import React, { useState, useEffect } from 'react';
import './../App.css';

function Shop() {
useEffect(() => {
  fetchItems();
}, [])

const [products, setProducts] = useState([])

const fetchItems = async () => {
  const data = await fetch('https://fakestoreapi.com/products');

  const items = await data.json();
  setProducts(items)
}

function priceUSD(change){
  return change.toFixed(2)
}

const [item, setItem] = useState('')

const filteredItems = products.filter((a) => {
  if (item === '') {return a} else {return a.category === item}
})

console.log(filteredItems)

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
          <p>Highest</p>
          <p>Lowest</p>
        </div>

          <div className="gridContainer">
            {filteredItems.map((a, index) => (
              <div className="productStyle">
                <img key={index} src={a.image} className="productImage"></img>
                <p>{a.title}</p>
                <p>${priceUSD(a.price)}</p>
              </div>
            ))}
          </div>

      </div>
    )
}

export default Shop;
