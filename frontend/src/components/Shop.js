import React, {  useContext } from "react";
import "./Shop.css";
import {  Link } from "react-router-dom";
import { CartContext } from "../CartContext";

/*
Page will list all items in the shop, and have a clickable 
*/
const Shop = () => {

  const { seeItems } = useContext(CartContext);
  const items = seeItems()



  return (
    <div className="shop-container">
      {items.length === 0 ? (
        <>
          <p> loading... </p>
        </>
      ) : (
        items.map((item) => (
          <div className="item-container" key={item.id}> 
          <Link to={`/item/${item.id}`}>
            <img src={item.picture} alt={item.name} className="clickable-image" />
            <span className="itemname">{item.name}</span>
            <span className="itemprice">${item.price}</span>
          </Link>
        </div>
          
          
        ))
      )}
    </div>
  );
};

export default Shop;
