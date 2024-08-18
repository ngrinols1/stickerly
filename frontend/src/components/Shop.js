import React, { useState, useEffect } from "react";
import "./Shop.css";

/*
Page will list all items in the shop, and have a clickable 
*/
const Shop = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <div className="shop-container">
      {items.length === 0 ? (
        <>
          <p> loading... </p>
        </>
      ) : (
        items.map((item) => (
          <div className="shop-item" key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Shop;
